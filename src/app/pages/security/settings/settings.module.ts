import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingListComponent } from './setting-list/setting-list.component';
import { SettingsService } from '../../../services/settings.service';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../../pipes/pipes.module';
import { ComponentsModule } from '../../../components/components.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  providers: [
   SettingsService
  ],
  declarations: [
    SettingListComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PipesModule,
    FormsModule,
    ComponentsModule,
    ColorPickerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  exports: [
    SettingListComponent
  ]
})
export class SettingsModule { }
