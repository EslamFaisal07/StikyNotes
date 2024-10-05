import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken : BehaviorSubject<any> = new BehaviorSubject(null)
  // constructor() { }

private readonly _HttpClient = inject(HttpClient)
private readonly _Router = inject(Router)

signUp(userData:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}signUp`,
  userData
  )
}
signIn(userData:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}signIn`,
  userData
  )
}


setUserToken():void{
  let token = localStorage.getItem('token')
  if(token ! == null){

     this.userToken.next(token)

  }
}

logOut():void{
  localStorage.removeItem('token')
  this._Router.navigate(['/signin'])
  
}

}
