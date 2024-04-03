import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UsersService } from '../../../services/users.service';
import { ComponentsModule } from '../../../components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../../pipes/pipes.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserComponent } from './user/user.component';
import { SepomexService } from '../../../services/sepomex.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  providers: [
    UsersService,
    ProfilesService,
    SepomexService
  ],
  declarations: [
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ComponentsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    PipesModule,
    MatCheckboxModule,
    TranslateModule
  ]
})
export class UsersModule { }
