import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
    /*headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
    }*/
});

githubApi.interceptors.request.use((config) => { 
    const AuthHeader = AuthService.getAuthHeaders(); 
    if (AuthHeader) { 
        config.headers.Authorization = AuthHeader; 
    } 
    return config; 
}, (error) => {
    return Promise.reject(error);
});     


export const fetchRepositories = async (): Promise<RepositoryItem[]> => { //obtiene repositorios de github
    try {
        const response = await githubApi.get(`/user/repos`,{
        
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation: "owner",
                t: Date.now()
            }
        });
        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({ //transforma datos - mapea

            name: repo.name,
            description: repo.description ? repo.description : null,
            imageUrl: repo.owner ? repo.owner.avatar_url : null,
            owner: repo.owner ? repo.owner.login : null,
            language: repo.language ? repo.language : null,

        }));
        return repositories;
        
    } catch (error) {
        console.error("Ocurrió un error al obtener repositorios:", error);
        return [];
    }
}

export const createRepository = async (repo: RepositoryItem): Promise<void> => { //crea repositorio con datos recibidos
    try {
        const response = await githubApi.post(`/user/repos`, repo);
        
        console.log("Repositorio ingresado", response.data);
    } catch (error) {
        console.error("Error al crear el repositorio:", error);
    }
};

export const getUserInfo = async (): Promise<UserInfo | null> => { //obtiene info usuario github autenticado
    try {
        const response = await githubApi.get(`/user`,);
        return response.data as UserInfo;

    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
        const userNotFound: UserInfo = {
            login: "undefined",
            name: "Usuario no encontrado",
            bio: "No se pudo obtener la información del usuario",
            avatar_url: "https://static.vecteezy.com/system/resources/previews/038/010/638/non_2x/account-name-not-found-concept-illustration-flat-design-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg",
        };
        return userNotFound;
    }
};

//new

export const updateRepositoryPUT = async ( //actualiza repositorio con metodo PUT 
  owner: string,
  repoName: string,
  data: {
    name: string;
    description?: string | null;
    private?: boolean;
  }
): Promise<void> => {
  try {
    await githubApi.patch(`/repos/${owner}/${repoName}`, data); //axios envia la peticion PATCH
    console.log("Repositorio actualizado correctamente (PUT académico)");
  } catch (error) {
    console.error("Error al actualizar el repositorio:", error);
  }
};


export const deleteRepository = async ( //elimina repositorio
    owner: string,
    repoName: string
): Promise<void> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repoName}`);
        console.log("Repositorio eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar el repositorio:", error);
    }
};
