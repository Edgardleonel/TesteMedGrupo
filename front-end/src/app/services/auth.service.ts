import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login = (data) => this.afAuth.auth.signInWithEmailAndPassword(data.email, data.senha);

  logout = () =>  this.afAuth.auth.signOut();

}
