import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { SchoolCreateComponent } from './school-create/school-create.component';

import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { GuardService } from './services/guard.service';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { config } from '../config/firebase';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    SchoolDetailsComponent,
    SchoolCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    HttpService,
    GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
