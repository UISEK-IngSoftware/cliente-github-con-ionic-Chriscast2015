import { IonButton, IonContent, IonHeader, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository } from '../services/GithubServices';

const Tab2: React.FC = () => {

   const history = useHistory();

  const repoFormData : RepositoryItem = {
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  };

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepository = () => {
    if (repoFormData.name.trim() === '') {
      alert('El nombre del repositorio es obligatorio.');
      return;
    }

    createRepository(repoFormData)
    .then(() => { history.push('/tab1'); })
    .catch(() => {
      alert('error al crear el repositorio.');
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-project"
            className="form-field"
            value={repoFormData.name}
            onIonChange={(e) => setRepoName(e.detail.value!)}
          ></IonInput>
          <IonTextarea
            label="Descripción del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Este es mi repositorio de Android"
            className="form-field"
            value={repoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value!)}
            rows={6}
          ></IonTextarea>

          <IonButton expand= "block" className="form-field" onClick={saveRepository}>
            Guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};


export default Tab2;