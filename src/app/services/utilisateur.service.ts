import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur';
import { Observable, Subject, BehaviorSubject,  } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private entityUrl = environment.REST_API_URL +'utilisateurs';
  private loginUrl = environment.REST_API_URL +'login';
  isAuth = false;

  currentUser: Observable<Utilisateur>;

  currentUserSubject: BehaviorSubject<Utilisateur>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<Utilisateur>(JSON.parse(localStorage.getItem('currentUSer')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Utilisateur{
    return this.currentUserSubject.value;
  }
 /* setCurrentUser(user: Utilisateur){
    this.currentUser = user;
    //this.userIsLogin = true;
    this.emitUser();
  }
 emitUser() {
        this.currentUserSubject.next( this.currentUser);
        this.isAuth = true;
  }*/
  isLogin(): boolean{
    return this.isAuth;
  }
  userHaslog(){
    this.isAuth = true;
  }
  logOut(){
    this.isAuth = false;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  login(cin:string, password:string){
    return this.http.get<Utilisateur>(this.loginUrl+'/'+cin+'/'+password).pipe(
     map( (user: Utilisateur) =>{
      if(user){
        localStorage.setItem('currentUSer', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  add(utilisateur: Utilisateur) : Observable<Utilisateur>{    
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',"Access-Control-Allow-Origin":"*"}); 
    return this.http.post<Utilisateur>(this.entityUrl, utilisateur,{headers:headers});

  }
  update(id: string, utilsateur: Utilisateur): Observable<Utilisateur> {
    let headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8',"Access-Control-Allow-Origin":"*"}); 

    return this.http.put<Utilisateur>(this.entityUrl + '/' + id, utilsateur,{headers:headers});     
  }
  getUtilisateur(){
    return this.http.get<Utilisateur[]>(this.entityUrl);
  }
}
