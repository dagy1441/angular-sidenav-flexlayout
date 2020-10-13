import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartementService } from 'src/app/service/departement.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {


  constructor(
    public employeeService: EmployeeService,
    public departmentService: DepartementService,
    // public employeeForm: FormGroup,
    public fb: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees();
  }

  onSubmit(){
    if (this.employeeService.form.valid) {
      if (!this.employeeService.form.get('$key').value)
        this.employeeService.insertEmployee(this.employeeService.form.value);
      else
        this.employeeService.editEmployee(this.employeeService.form.value);
        this.employeeService.form.reset();
        this.employeeService.initializeFormGroup();
        this.notificationService.success(':: Submitted successfully');
        this.onClose();

    }
  }

  onClose() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear(){
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
  }

}
