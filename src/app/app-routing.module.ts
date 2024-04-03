import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from './security/permission.guard';
import { LoginEnterpriseComponent } from './shared/login-enterprise/login-enterprise.component';
import { AboutComponent } from './pages/about/about.component';

const APP_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginEnterpriseComponent,
    canActivate: [PermissionGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(mod => mod.WelcomeModule),
    canActivate: [PermissionGuard]
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then(mod => mod.ChangePasswordModule),
    canActivate: [PermissionGuard]
  },
  {
    path: 'security',
    loadChildren: () => import('./pages/security/security.module').then(mod => mod.SecurityModule)
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    canActivate: [PermissionGuard]
  }
];

@NgModule({
    imports: [
      RouterModule.forRoot(APP_ROUTES, { useHash: true} )
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
