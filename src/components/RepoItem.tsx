import {
  IonItem,
  IonLabel,
  IonAvatar,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react';

import { RepositoryItem } from '../interfaces/RepositoryItem';

interface RepoItemProps {
  repo: RepositoryItem;
  onEdit: () => void;
  onDelete: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onEdit, onDelete }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonAvatar slot="start">
          <img
            src={repo.imageUrl || 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png'}
            alt="avatar"
          />
        </IonAvatar>

        <IonLabel>
          <h2>{repo.name}</h2>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="warning" onClick={onEdit}>
          EDITAR
        </IonItemOption>
        <IonItemOption color="danger" onClick={onDelete}>
          ELIMINAR
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
