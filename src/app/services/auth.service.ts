import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Storage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth,
    private firestore:Firestore,
    private storage:Storage) { }

  getUserProfile(){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    return docData(userDocRef);
  }

  async register(email:string,password:string){
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      const userDocRef = doc(this.firestore, `usuarios/${user.user?.uid}`);
      await setDoc(userDocRef,{
        email,
        password,
        nombre : '',
        apellido : '',
        imageUrl : '',
        genero : '',
        edad : '',
      });
      return user;
    } catch (error) {
      return null;
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

  async login(email:string,password:string){
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
}
