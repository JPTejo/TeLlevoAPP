import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SesionGuard } from './sesion.guard';
import { SinSesionGuard } from './sin-sesion.guard';
import {redirectUnauthorizedTo, redirectLoggedInTo, canActivate} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToWelcome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToWelcome)
  },
  {
    path: 'amigos',
    loadChildren: () => import('./pages/amigos/amigos.module').then( m => m.AmigosPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'mis-viajes',
    loadChildren: () => import('./pages/mis-viajes/mis-viajes.module').then( m => m.MisViajesPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'user-menu',
    loadChildren: () => import('./pages/user-menu/user-menu.module').then( m => m.UserMenuPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'conversor',
    loadChildren: () => import('./pages/conversor/conversor.module').then( m => m.ConversorPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '404',
    loadChildren: () => import('./pages/page404/page404.module').then( m => m.Page404PageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '**',
    redirectTo: '404'
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
