import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img alt="Silhouette of mountains" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRocZytrsTqZWw3-MsGWWFKZO571qMW5RE5DA&s" />
          <IonCardHeader>
            <IonCardTitle>Christian Castro</IonCardTitle>
            <IonCardSubtitle>Chriscast2015</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>Soy un desarrollador de software apasionado</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;