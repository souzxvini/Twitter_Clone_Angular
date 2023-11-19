import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MyProfileModel } from '../models/my-profile-model';
import { AnotherProfileModel } from '../models/another-profile-model';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  private loggedUser = new BehaviorSubject<MyProfileModel>(null);
  // Observable for components to subscribe
  public loggedUser$ = this.loggedUser.asObservable();

  constructor() { }

  // Method to update logged user infos
  updateMyProfileInfos(myProfile: MyProfileModel): void {
    this.loggedUser.next(myProfile);
  }

  getCurrentLoggedUser(): MyProfileModel {
    return this.loggedUser.value;
  }

  //CLICAR EM UM PERFIL E REDIRECIONAR PARA O PERFIL DESSA PESSOA PASSANDO OS DADOS, SEM PRECISAR CHAMAR UM ENDPOINT PARA CARREGAR OS DADOS
  private anotherUser: AnotherProfileModel;
  setAnotherUser(anotherUser) {
    this.anotherUser = anotherUser;
  }

  getAnotherUser() {
    return this.anotherUser;
  }

  clearAnotherUser() {
    this.anotherUser = null;
  }

  /*Se eu seguir alguém do card de 'sugestões para seguir' enquanto estou na tela de seguidores/seguindo, vou 'notificar' esse cara,
   e ele vai verificar se o perfil que eu segui, está presente na lista de seguidores/seguindo mostrado na tela */
   private followedSuggestedUserWhileOnFollowingAndFollowersListening = new BehaviorSubject<boolean>(false);
   followedSuggestedUserWhileOnFollowingAndFollowersChange$ = this.followedSuggestedUserWhileOnFollowingAndFollowersListening.asObservable();
 
   followedSuggestedUserWhileOnFollowingAndFollowersScreen(userData) {
     this.setAnotherUser(userData);
     this.followedSuggestedUserWhileOnFollowingAndFollowersListening.next(true);
   }
 
   /*Se eu seguir alguém da lista perfis da tela de seguidores/seguindo, vou 'notificar' o card who-to-follow,
    e ele vai verificar se o perfil que eu segui, está presente na lista de perfis sugeridos*/
   private followedUserWhileOnFollowingAndFollowersListening = new BehaviorSubject<boolean>(false);
   followedUserWhileOnFollowingAndFollowersChange$ = this.followedUserWhileOnFollowingAndFollowersListening.asObservable();
 
   followedUserWhileOnFollowingAndFollowersScreen(userData) {
     this.setAnotherUser(userData);
     this.followedUserWhileOnFollowingAndFollowersListening.next(true);
   }
 
   /*Quando eu editar o meu perfil, eu atualizo as mnhas informacoes no menu component*/
   private updateMyProfileInfosOnMenuComponentListening = new BehaviorSubject<boolean>(false);
   updateMyProfileInfosOnMenuComponenChange$ = this.updateMyProfileInfosOnMenuComponentListening.asObservable();
 
   updateMyProfileInfosOnMenuComponent(userData) {
     //this.setUserData(userData);
     this.updateMyProfileInfosOnMenuComponentListening.next(true);
   }
}
