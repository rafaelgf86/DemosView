import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PermissionGuard } from '../../security/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'logs',
        loadChildren: () => import('./logs/logs.module').then(mod => mod.LogsModule),
        canActivate: [PermissionGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule),
        canActivate: [PermissionGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule),
        canActivate: [PermissionGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
