import {IonItem, IonLabel, IonThumbnail} from '@ionic/react'
import './RepoItem.css';
import { image } from 'ionicons/icons';

interface RepoProps {
  name: string;
  imageUrl: string;
}

const RepoItem: React.FC<RepoProps> = ({ name, imageUrl }) => {
  return (
    <IonItem>
        <IonThumbnail slot="start">
            <img src = {imageUrl} alt={name} />
        </IonThumbnail>
        <IonLabel>{name}</IonLabel>
    </IonItem>
    
  );
};

export default RepoItem;