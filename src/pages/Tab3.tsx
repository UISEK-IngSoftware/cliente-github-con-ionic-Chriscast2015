import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';
import { UserInfo } from '../interfaces/UserInfo';
import { getUserInfo } from '../services/GithubServices';
import { useState } from 'react';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const loadUserInfo = async () => {
    const Info = await getUserInfo();
    setUserInfo(Info);
  };
  useIonViewDidEnter(() => {
    loadUserInfo();
  });

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
          <img alt={userInfo?.name}
            src={userInfo?.avatar_url} />
          <IonCardHeader>
            <IonCardTitle>{userInfo?.name}</IonCardTitle>
            <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            {userInfo?.bio}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};


export default Tab3;