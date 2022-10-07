import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SesionGuard } from './sesion.guard';
import { SinSesionGuard } from './sin-sesion.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./pages/folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [SesionGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [SinSesionGuard]
  },
  {
    path: 'amigos',
    loadChildren: () => import('./pages/amigos/amigos.module').then( m => m.AmigosPageModule),
    canActivate: [SesionGuard]
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule),
    canActivate: [SesionGuard]
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule),
    canActivate: [SesionGuard]
  },
  {
    path: 'mis-viajes',
    loadChildren: () => import('./pages/mis-viajes/mis-viajes.module').then( m => m.MisViajesPageModule),
    canActivate: [SesionGuard]
  },
  {
    path: 'user-menu',
    loadChildren: () => import('./pages/user-menu/user-menu.module').then( m => m.UserMenuPageModule),
    canActivate: [SesionGuard]
  },
  {
    path: '404',
    loadChildren: () => import('./pages/page404/page404.module').then( m => m.Page404PageModule)
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
