import { Component, OnInit } from '@angular/core';
//importar el servicio
import { EmployeService} from '../../services/employe.service';
//importar la interface employee
import { Employe } from '../../models/employe';

@Component({
  selector: 'app-nawork-list',
  templateUrl: './nawork-list.component.html',
  styleUrls: ['./nawork-list.component.css']
})
export class NaworkListComponent implements OnInit {
  //variable para almacenar los trabajadores
  employe: Employe={
    dni: '',
    cui: '',
    apellido_paterno: '',
    apellido_materno: '',
    nombres: ''
  }; 
  
  worked: any=[];

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
  }

  //obtener un empleado del servidor
  getEmploye(dni:string){
    console.log(dni);
    this.employeService.getEmploye(dni).subscribe(
      res => {
        console.log(res);
        this.employe = res;
        
      },
      err => console.error(err)
    )
  }

  //agregar un empleado al arreglo empleados
  addEmployes(pater:string, mater:string, name: string, dni: string){
    const fullName = pater +" " + mater+ " " + name;
    this.worked.push([fullName, dni]);
    console.log(this.worked);
    this.worked.sort();

    this.cleanEmployee();
  }
 
  //LIMPIAR CAMPOS DEL TRABAJADOR
  cleanEmployee(){

    this.employe.dni= '',
    this.employe.cui= '',
    this.employe.apellido_paterno= '',
    this.employe.apellido_materno= '',
    this.employe.nombres= ''

  }


}

