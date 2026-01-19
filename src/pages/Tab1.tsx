import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  IonModal,
  IonButton,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/react';

import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { useState } from 'react';
import {
  fetchRepositories,
  updateRepositoryPUT,
  deleteRepository
} from '../services/GithubServices';

const Tab1: React.FC = () => {

  const [repos, setRepos] = useState<RepositoryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryItem | null>(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState<string | null>('');

  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  useIonViewDidEnter(() => {
    loadRepos();
  });

  // 👉 ABRIR MODAL
  const handleEdit = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
    setNewName(repo.name);
    setNewDescription(repo.description ?? '');
    setShowModal(true);
  };

  // 👉 GUARDAR CAMBIOS (PUT)
  const handleSave = async () => {
    if (!selectedRepo) return;

    await updateRepositoryPUT(
      selectedRepo.owner!,
      selectedRepo.name,
      {
        name: newName,
        description: newDescription ?? undefined
      }
    );

    setShowModal(false);
    loadRepos();
  };

  // 👉 ELIMINAR (DELETE)
  const handleDelete = async (repo: RepositoryItem) => {
    await deleteRepository(
      repo.owner!,
      repo.name
    );
    loadRepos();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {repos.map((repo, index) => (
            <RepoItem
              key={index}
              repo={repo}
              onEdit={() => handleEdit(repo)}
              onDelete={() => handleDelete(repo)}
            />
          ))}
        </IonList>

        {/* MODAL DE EDICIÓN */}
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar repositorio</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">

            <IonItem>
              <IonLabel position="stacked">Nuevo nombre</IonLabel>
              <IonInput
                value={newName}
                onIonChange={(e) => setNewName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Nueva descripción</IonLabel>
              <IonInput
                value={newDescription ?? ''}
                onIonChange={(e) => setNewDescription(e.detail.value ?? '')}
              />
            </IonItem>

            <IonButton expand="block" onClick={handleSave}>
              Guardar cambios
            </IonButton>

            <IonButton
              expand="block"
              color="medium"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </IonButton>

          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
