import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { NotFoundComponent } from './shared/components/index';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'about-me',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/about-me/about-me.module').then(m => m.AboutMeModule)
  },
  {
    path: 'about-task',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/about-task/about-task.module').then(m => m.AboutTaskModule)
  },
  {
    path: 'todo',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
