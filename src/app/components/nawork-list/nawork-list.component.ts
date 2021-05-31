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
    first_name: '',
    last_name: '',
    name: ''
  }; 

  disabled=true;
  
  worked: any=[];

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
  }

  //obtener un empleado del servidor
  getEmploye(dni:string){ 
    if(dni!='' && dni.length==8){ 
    this.employeService.getEmploye(dni).subscribe(
      res => {
        console.log("llego aqui")       
        this.employe = res;   
        this.disabled=false;
      },
      err => console.error(err)
      
    )
    
  }else{
    console.log("llenar campo dni")
  }

  }

  //agregar un empleado al arreglo empleados
  addEmployes(pater:string, mater:string, name: string, dni: string){

   
    let fullName1 = pater +" " + mater+ " " + name;

    let fullName="";
    if(fullName1.search("&Ntilde;")>0){
      fullName = fullName1.replace('&Ntilde;','Ñ');
      //console.log("reemplazando el &tilde por la ñ ::"+fullName);
    }
    else{
      fullName=fullName1;
    }
    //console.log("existe la frase con ñ  "+fullName);

    this.worked.push([fullName, dni]);    
    this.worked.sort();
    this.cleanEmployee();
    this.disabled=true;
  }
 
  //LIMPIAR CAMPOS DEL TRABAJADOR
  cleanEmployee(){
    /*
    this.employe.dni= '',
    this.employe.cui= '',
    this.employe.apellido_paterno= '',
    this.employe.apellido_materno= '',
    this.employe.nombres= ''*/
    this.employe.dni='',
    this.employe.name='',
    this.employe.first_name= '',
    this.employe.last_name= '',
    this.employe.cui= ''
  }


}

