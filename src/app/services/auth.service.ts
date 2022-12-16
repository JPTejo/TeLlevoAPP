import { Injectable } from '@angular/core';
import { Auth, deleteUser} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, addDoc, collection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth,
    private firestore:Firestore,
    private storage:StorageService,
    private fireAuth: AngularFireAuth,
    private adb: AngularFirestore) { }

  getUserProfile(){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    return docData(userDocRef);
  }

  async getId(){
    return (await this.storage.getStorage('uid')).value;
  }



  async register(formValue){
    try {
      const registeredUser = await this.fireAuth.createUserWithEmailAndPassword(formValue.email, formValue.password);

      const data = {
        uid: registeredUser.user.uid,
        email: formValue.email,
        nombre: formValue.nombre,
        apellido: formValue.apellido,
        genero: formValue.genero,
        edad: formValue.edad,
        phone: formValue.phone,
        type: 'user',
        status: 'active',
      };
      const user = await this.adb.collection('usuarios').doc(registeredUser.user.uid).set(data);
      console.log(user)
    } catch (e) {
      throw(e);
    }
  }

  async resetPassword(email: string) {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
    } catch(e) {
      throw(e);
    }
  }

async deleteUser(){
  try {
    const user = this.auth.currentUser;
    await deleteUser(user);
    return true;
  } catch (error) {
    return false;
  }
}

  setUserData(uid) {
    this.storage.setStorage('uid', uid);
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await this.fireAuth.signInWithEmailAndPassword(email, password);
      console.log(response);
      if(response.user) {
        this.setUserData(response.user.uid);
      }
    } catch(e) {
      throw(e);
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      return this.storage.removeStorage('uid');
    } catch(e) {
      throw(e);
    }
  }
}
