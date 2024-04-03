import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { PipesModule } from '../pipes/pipes.module';
import { LoadingComponent } from './loading/loading.component';
import { NgxLoadingModule } from 'ngx-loading';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AddressComponent } from './address/address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingImgComponent } from './loading-img/loading-img.component';
import { ModalAddressComponent } from './modals/modal-address/modal-address.component';
import { ModalInformationComponent } from './modals/modal-information/modal-information.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from '../directives/directives.module';
import { ModalConfirmationComponent } from './modals/modal-confirmation/modal-confirmation.component';
import { ErrorsServerComponent } from './errors-server/errors-server.component';
import { PaginationFooterComponent } from './pagination-footer/pagination-footer.component';
import { TitleDrawerComponent } from './title-drawer/title-drawer.component';
import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ModalContactUsComponent } from './modals/modal-contact-us/modal-contact-us.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    PaginationComponent,
    PaginationHeaderComponent,
    LoadingComponent,
    DropdownComponent,
    AddressComponent,
    ToastComponent,
    LoadingImgComponent,
    ModalAddressComponent,
    ModalInformationComponent,
    FileUploadComponent,
    CalendarComponent,
    ModalConfirmationComponent,
    ErrorsServerComponent,
    PaginationFooterComponent,
    TitleDrawerComponent,
    LateralMenuComponent,
    ModalContactUsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    PipesModule,
    NgxLoadingModule,
    FormsModule,
    NgbModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    DirectivesModule,
    MatExpansionModule,
    MatSidenavModule,
    MatProgressBarModule,
    CKEditorModule
  ],
  exports: [
    PaginationComponent,
    PaginationHeaderComponent,
    LoadingComponent,
    LoadingImgComponent,
    DropdownComponent,
    AddressComponent,
    ToastComponent,
    ModalAddressComponent,
    ModalInformationComponent,
    FileUploadComponent,
    CalendarComponent,
    ErrorsServerComponent,
    PaginationFooterComponent,
    TitleDrawerComponent,
    LateralMenuComponent,
    ModalContactUsComponent,
  ],
  entryComponents: [
    ModalAddressComponent,
    ModalInformationComponent,
    ModalContactUsComponent,
  ]
})
export class ComponentsModule { }
