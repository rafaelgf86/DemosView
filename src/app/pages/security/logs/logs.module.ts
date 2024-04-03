import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsRoutingModule } from './logs-routing.module';
import { LogListComponent } from './log-list/log-list.component';
import { LogsService } from '../../../services/logs.service';
import { ComponentsModule } from '../../../components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../../pipes/pipes.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  providers: [
    LogsService,
  ],
  declarations: [
    LogListComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    ComponentsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    PipesModule,
    MatCheckboxModule
  ]
})
export class LogsModule { }
