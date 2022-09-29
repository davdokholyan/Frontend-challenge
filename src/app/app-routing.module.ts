import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './shered/components/index';

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
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
