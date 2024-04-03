import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalErrorComponent } from './components/modals/modal-error/modal-error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from './directives/directives.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { UsersService } from './services/users.service';
import { PipesModule } from './pipes/pipes.module';
import { SettingsService } from './services/settings.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginEnterpriseComponent } from './shared/login-enterprise/login-enterprise.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactUsService } from './services/contact-us.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT(Ahead-of-time) requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  providers: [
    UsersService,
    SettingsService,
    ContactUsService
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    ModalErrorComponent,
    LoginEnterpriseComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    DirectivesModule,
    BrowserAnimationsModule,
    ComponentsModule,
    PipesModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
    })
  ],
  /*providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],*/
  bootstrap: [AppComponent],
  entryComponents: [
    ModalErrorComponent
  ]
})
export class AppModule { }
