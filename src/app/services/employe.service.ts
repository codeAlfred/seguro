import { Injectable } from '@angular/core';
//http client para hacer las peticiones
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  //https://api.reniec.cloud/dni/47395510
  
  //API_URI = 'https://api.reniec.cloud';
  API_URI = 'https://dni.optimizeperu.com/api/persons';

  PROXI_URI = 'https://cors-anywhere.herokuapp.com';

  

  constructor( private http: HttpClient) { }

  //obtener solo un empleado almacenado
  getEmploye(dni: string){
    //return this.http.get(`${this.PROXI_URI}/${this.API_URI}/dni/${dni}`)
    
    if(dni!=''){
      return this.http.get(`${this.API_URI}/${dni}`)
    }      
    else{
      alert("llenar campo");
    }
  }
}
