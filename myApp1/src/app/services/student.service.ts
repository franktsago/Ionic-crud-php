import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Student{
  id:number;
  name:string;
  address:string;
  phone:string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'http://localhost/ionic/crud_api/api/students';

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<[Student]>(this.url);
  }

  get(id: number){
    return this.http.get<[Student]>(this.url + '/' +id);
  }

  create(student:Student){
    return this.http.post(this.url, student);
  }

  update(student:Student, id:number){
    return this.http.put(this.url + '/' + id, student);

  }
  remove(id: number){
    return this.http.delete(this.url + '/' + id);

  }
}
