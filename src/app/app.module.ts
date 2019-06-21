import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import {AccordionModule} from 'primeng/accordion';
import {InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {PasswordModule} from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import {MessageModule,
  Message,DataTableModule} from 'primeng/primeng';
  import {TableModule} from 'primeng/table';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { JwtInterceptor } from './_helper/jwt.interceptor';
import { ErrorInterceptor} from './_helper/error.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DispTextPipe } from './disp-text.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    DispTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    DialogModule,
    DropdownModule,
    ChartModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,MenuModule, PasswordModule,
    ReactiveFormsModule,
    MessageModule,
    DataTableModule,
    TableModule,
    NgbModule
  ],
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
