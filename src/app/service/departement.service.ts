import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  departmentList: AngularFireList<any>;
  departments = [];

  constructor(private firebase: AngularFireDatabase,) {
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.departments = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
   }

  getDepartmentName($key) {
    let name=''
    if ($key == "0")
      return "";
    else{

      _.find(this.departments, (obj) => {

        if(obj.$key == $key){
          name=obj.name
          return false
        }
        //console.log(this.arrays.length);
        //return obj.$key == $key;
      })

    }
    return name;
  }

}
