/*
Created by: Jamaal
Base App Module
Last Edited: November 28, 2021

 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HeaderComponent } from './partials/header/header.component';
import { FormComponent } from './partials/form/form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TableComponent } from './partials/table/table.component';
import { ModelModule } from './model/model.module';
import { BasePageComponent } from './partials/basepage/basepage.component';
import { CreateIncidentComponent } from './create-incident/create-incident.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IncidentNumberGenerator } from './model/incident-number-generator.model';
import { IncidentRepository } from './model/incident.repository';
import { RestDataSource } from './model/rest.datasource';
import { StaticDataSource } from './model/static.datasource';
import { AuthGuard } from './guards/auth.guard';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserRepository } from './model/user.repository';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './partials/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    FormComponent,
    LoginComponent,
    RegisterComponent,
    TableComponent,
    CreateIncidentComponent,
    BasePageComponent,
    AdminMainComponent,
    EditUserComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ModelModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    IncidentNumberGenerator,
    IncidentRepository,
    RestDataSource,
    StaticDataSource,
    AuthGuard,
    UserRepository,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
