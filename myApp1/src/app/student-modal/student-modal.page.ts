import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Student, StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.page.html',
  styleUrls: ['./student-modal.page.scss'],
})
export class StudentModalPage implements OnInit {
  @Input() student: Student;
  isUpdate = false;

  data = {
    name: '', 
    address: '',
    phone: ''
  };

  constructor(private modalCtrl: ModalController, private service: StudentService) { }

  ngOnInit() {
    if(this.student){
      this.isUpdate =true; 
      this.data = this.student;
    }
  }

  closeModal(){
    this.modalCtrl.dismiss(null, 'closed');
  }

  onSubmit(form: NgForm){
    const student = form.value;
    if(this.isUpdate){
this.service.update(student, this.student.id).subscribe(() =>{
  student.id=this.student.id;
  this.modalCtrl.dismiss(student, 'updated');

});
    }else{
    this.service.create(student).subscribe(response => {
      this.modalCtrl.dismiss(response, 'created');
    });
    }
  }

}
