import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Student, StudentService } from '../services/student.service';
import { StudentModalPage } from '../student-modal/student-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  students: Student[];

  constructor(private service: StudentService, private alertCtrl: AlertController, private modalCtrl:ModalController) {}

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      this.students = response;
    });
  }

  updateStudent(student:Student){
  
    this.modalCtrl.create({
      component: StudentModalPage,
      componentProps: { student }
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=> {
      this.students = this.students.filter(std =>{
        if(data.id ===std.id){
          return data;
        }
        return std; 
      }); 
    });
  }

  addStudent(){
    this.modalCtrl.create({
      component:StudentModalPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data,role}) => {
      if(role === 'created'){
        this.students.push(data); 
      }
    });
  }

  removeStudent(id: number) {
    this.alertCtrl.create({
      header: "Supprimer",
      message: "Etes vous sure de vouloir supprimer?",
      buttons: [{
        text: 'Oui', handler: () => {
          this.service.remove(id).subscribe(() => {
            this.students = this.students.filter(std => std.id !== id);
          })
        }
      }, { text: 'Non' }
      ]
    }).then(alertEl => alertEl.present())
  }
}
