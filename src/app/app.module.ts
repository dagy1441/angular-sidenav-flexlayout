import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './service/employee.service';
import { DepartementService } from './service/departement.service';
import { NotificationService } from './service/notification.service';
import { ConfirmDialogService } from './service/confirm-dialog.service';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavListComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
  ],
  providers: [
    EmployeeService,
    DepartementService,
    NotificationService,
    ConfirmDialogService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents:[EmployeeComponent,MatConfirmDialogComponent]
})
export class AppModule { }
