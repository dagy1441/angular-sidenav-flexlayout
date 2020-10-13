import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import * as _ from 'lodash';
import { EmployeeComponent } from '../employees/employee/employee.component';

import { Employee } from '../models/employee'
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private dbPath = "/employees";

  employeesRef : AngularFireList<Employee> = null;
  employeeList : AngularFireList<any>;

  public employeeForm: FormGroup;

  constructor(
    private db: AngularFireDatabase,
    public fb: FormBuilder,
    private datePipe: DatePipe,) {
    this.employeeList = db.list(this.dbPath);
  }

  getEmployeeForm(): FormGroup{
    return this.employeeForm = this.fb.group(this.form);
  }

  form : FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }

  closeForm(){
    this.form.reset();
    this.initializeFormGroup();
    // this.dialogRef.close();
  }

  clearForm(){
    this.form.reset();
    this.initializeFormGroup();
  }

  getEmployees(){
    this.employeeList = this.db.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee) {
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
      isPermanent: employee.isPermanent
    });
  }

  editEmployee(employee) {
    this.employeeList.update(employee.$key,
      {
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        city: employee.city,
        gender: employee.gender,
        department: employee.department,
        hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
        isPermanent: employee.isPermanent
      });
  }

  removeEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {
    this.form.setValue(_.omit(employee, 'departmentName'));
  }

  getAllEmployees() : AngularFireList<Employee>{
    return this.employeesRef = this.db.list('employees');
    // return this.employeesList = this.db.list('employees').snapshotChanges();
  }

  getOneEmployee(key : string){
    return this.db.object(this.dbPath+"/"+ key);
  }

  createEmployee(employee : Employee){
      this.employeesRef.push(employee);
  }

  updateEmployee(key: string, value: any) : Promise<void> {
    return this.employeesRef.update(key, value);
  }

  deleteOneEmployee( key: string ) : Promise<void> {
    return this.employeesRef.remove(key);
  }

  deleteAllEmployee(): Promise<void> {
    return this.employeesRef.remove();
  }

}
