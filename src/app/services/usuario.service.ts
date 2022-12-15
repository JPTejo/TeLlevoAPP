import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, updateDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore:Firestore,
    private auth:Auth) { }


  getUsuarioById(id:string): Observable<Usuario>{
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    return docData(userDocRef, {idField:'id'}) as Observable<Usuario>;
  }


  updateUsuario(usuario:Usuario){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    return updateDoc(userDocRef,{
      nombre:usuario.nombre,
      apellido:usuario.apellido,
      genero:usuario.genero,
      edad:usuario.edad,

    });
  }
  addUsuario(usuario:Usuario){
    const usuariosRef = collection(this.firestore,'usuarios');
    return addDoc(usuariosRef, usuario);
  }

  deleteUsuario(usuario:Usuario){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `usuarios/${user?.uid}`);
    return deleteDoc(userDocRef);
  }
}
