import { Component, Input, OnInit } from '@angular/core';

import { Utils } from 'src/app/utils/Utils';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Component({
  selector: 'app-generar-pdf',
  templateUrl: './generar-pdf.component.html',
  styleUrls: ['./generar-pdf.component.css']
})
export class GenerarPdfComponent implements OnInit {
//obteniendo 
  @Input() work: any;

  body: any = [];

  logoDataUrl: string;
  firmaUrl: string;

  hoy = new Date();
  
  aumentarCorrelativo: number;
 

  constructor() { }

  ngOnInit(): void {
    // C:\Users\CLERQUE CONSTRUCTORA\Desktop\proyecto sctr\client\src\assets\logo.jpg
    Utils.getImageDataUrlFromLocalPath1('assets/logo.jpg').then(
    result => this.logoDataUrl = result
    )

    Utils.getImageDataUrlFromLocalPath1('assets/firma2.png').then(
      result => this.firmaUrl = result
      )

  }

  obtenerFecha(){   

    // var dia: string[] = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    // const day = dia[this.hoy.getDay()];

    var mesok: string[]=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];  
    const mes = mesok[this.hoy.getMonth()]

    let day="";
    if (this.hoy.getDate()<10){
      day = "0"+this.hoy.getDate();
   }
   else{
     day=""+this.hoy.getDate();
   }

    let fecha: string = "Miraflores, "+ day+ " de "+ mes+ " del " + this.hoy.getFullYear();
  
    return fecha;
  }

  obtenerHora(){
    
    let hora="";
    let minute="";
    let temp="";
    if(this.hoy.getHours()<12){
      temp=" AM";
    }else{
      temp=" PM";  
    }
    
    //agregando un 0 delante del minuto
    if (this.hoy.getMinutes()<10){
       minute = "0"+this.hoy.getMinutes();
    }
    else{
      minute = ""+this.hoy.getMinutes();
    }

    //agregando un cero delante de la hora
    if (this.hoy.getHours() < 10){
      hora = "0"+this.hoy.getHours();
   }
   else{
     hora = ""+this.hoy.getHours();
   }


    let horaCompleta: string = hora+ ":" + minute + temp;

    return horaCompleta;
  }

  obtenerFechaVencimiento(){   

    var mesok: string[]=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    var mes31: string[]=["Enero","Marzo","Mayo","Julio","Agosto","Octubre","Diciembre"];
    var mes30: string[]=["Abril","Junio","Septiembre","Noviembre"];
    var mes28: string[]=["Febrero"];

    var mesObjetivo = mesok[this.hoy.getMonth()];
    console.log(this.hoy.getMonth());
    console.log(mesObjetivo);

    let day="";

    if (mes31.includes(mesObjetivo)){
      day="31";
    }
    if(mes30.includes(mesObjetivo)){
      day="30";
    }if(mes28.includes(mesObjetivo)){
      day="28";
    }

    console.log(day);
    
    //agregando 0 al mes
    let mes="";
    if (this.hoy.getMonth()<10){
      mes = "0"+(this.hoy.getMonth()+1);
   }
   else{
     mes=""+(this.hoy.getMonth()+1);
   }

    

    let fechaVencimiento: string =  day+ "."+ mes+ "." + this.hoy.getFullYear()+".";
  
    return fechaVencimiento;
  }

  correlativoMes: number = 5361933;
  

  
  obteniendoCorrelativo(){
    //'SCTR5361933-S0237129-SALUD'
    // const correlativo = "5361933";
    let correlativo="";
    console.log(this.correlativoMes);
    console.log(this.aumentarCorrelativo);

    correlativo=""+(this.correlativoMes+this.aumentarCorrelativo);

    return correlativo;
  }


  //metodo para generar pdf, se activara al presionar sobre el boton generate pdf
  generatePdf(){

    //const "&Ntilde;" = "Ñ";

    const title = [ 
      {text: 'N°', alignment: 'center', fontSize: 10}, 
      {text: 'APELLIDOS Y NOMBRES',alignment: 'center', fontSize: 10},
      {text: 'C.E/DNI/PAS/RUC', colSpan: 2, alignment: 'center', fontSize: 10}, 
      {}
    ]
    const subhead= [{text: 'SEDE : CONSTRUCCIÓN', colSpan: 4, alignment: 'left', fontSize: 12}, {}, {},{}]

    this.body.push(title, subhead);
    let val = 0;
    for (let i=val; i<this.work.length; i++){
    
        this.body.push([i+1, this.work[i][0],'DNI',this.work[i][1]]);        
        
    }

    const documentDefinition = {

       content:[

        //margin:[30 , 0 , 30 , 0],
        { margin:[30 , 0 , 30 , 0],





          
        
        
        },
       
        {image: this.logoDataUrl, width: 200, height: 35, margin: [ 10 , 2 , 0 , 0 ] },
        
        { text: 'SCTR5361933-S0237129-SALUD', fontSize: 9, alignment: 'left', margin: [ 0 , 15 , 10 , 10 ]},
        { text: 'Miraflores, 18 de Diciembre del 2020', fontSize: 9,alignment: 'right', margin: [ 0 , 2 , 0 , 10 ]},
        { text: '07:43 AM', fontSize: 9, decoration:'underline', alignment: 'right', margin: [ 0 , 2 , 0 , 10 ]},

        { text: 'CONSTANCIA', fontSize: 11, decoration:'underline', alignment: 'center', margin: [ 5 , 2 , 10 , 20 ]},
        { text:'Por medio de la presente, dejamos constancia que los Señores:', fontSize:9, alignment: 'left', margin: [ 0 , 4 , 0 , 5 ]},
        { text:'C & R CLERQUE CONSTRUCTORA PERU SOCIEDAD ANONIMA CERRADA', fontSize:12, alignment: 'center', margin: [ 0 , 5 , 0 , 5 ]},
        { text:'De acuerdo a lo establecido en el Decreto Supremo 003-98-SA – Normas Técnicas del Seguro Complementario de Trabajo de Riesgo, a la fecha han contratado con Rimac S.A. Entidad Prestadora de Salud la(s) póliza(s) de Seguro Complementario de Trabajo de Riesgo siguiente(s):', fontSize:9, alignment: 'justify'},
        { text: 'SCTR SALUD  N° S0237129', fontSize: 11, alignment: 'center', margin: [ 0 , 5 , 0 , 3 ]},
        { text: 'La constancia es de vigencia mensual y es renovable', fontSize: 9,alignment: 'center', margin: [ 0 , 1 , 0 , 6 ]},
        { text: 'La presente constancia tiene vigencia hasta el 31.12.2020. A solicitud de la empresa contratante se emite la presente Constancia detallando a continuación el personal que se encuentra afiliado a la(s) póliza(s) antes mencionada(s).', fontSize: 9, alignment: 'justify'},

        { text: 'RELACION DE PERSONAL:', fontSize: 11, alignment: 'left', margin: [ 0 , 20 , 0 , 0 ]},

		    {
          
          table: {
            widths: [30, 270, 70 ,70],            
            body: this.body           
            
          }
        },
        { text: 'Se expide la presente a solicitud del Asegurado/Contratante para los fines que estime convenientes.', fontSize: 9,alignment: 'left', margin: [ 2 , 10 , 0 , 6 ]},
        
        {image: this.firmaUrl, margin: [ 10 , 7 , 0 , 0 ], alignment: 'right'},
        { text: 'Mark Andrés Reyes Ploog', fontSize: 10, alignment: 'right', margin: [ 0 , 0 , 25 , 0]},
        { text: 'Rimac EPS S.A. Entidad Prestadora ', fontSize: 10, alignment: 'right', margin: [ 0 , 0 , 10 , 0]},
        { text: 'Usuario :  CR1RZAMUDM', fontSize: 8, alignment: 'left', margin: [ 0 , 0 , 0 , 0]},
        { text: 'de Salud', fontSize: 10, alignment: 'right', margin: [ 0 , -10 , 70 , 0]},
        


      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },

      images: {
        mySuperImage: 'data:image/jpeg;base64,...content...'
      }

    };

    pdfMake.createPdf(documentDefinition).open();

    console.log("generado del pdf", this.work);
    //limpiando el array de empleados agregados
    this.work= [];
  }

  


  probandoPdf(){
  
    const title = [ 
      {text: 'N°', alignment: 'center', fontSize: 10}, 
      {text: 'APELLIDOS Y NOMBRES',alignment: 'center', fontSize: 10},
      {text: 'C.E/DNI/PAS/RUC', colSpan: 2, alignment: 'center', fontSize: 10}, 
      {}
    ]
    const subhead= [{text: 'SEDE : CONSTRUCCIÓN', colSpan: 4, alignment: 'left', fontSize: 12}, {}, {},{}]

    this.body.push(title, subhead);
    let val = 0;
    for (let i=val; i<this.work.length; i++){
    
        this.body.push([i+1, this.work[i][0],'DNI',this.work[i][1]]);       
        
    }


    const documentDefinition = {

      info: {
        title: 'aqui va el nombre del pdf - nombredelpdf',
        
        },

  content: [
	
    
		{
			stack: [
          {            
            image: this.logoDataUrl, width:190, height: 35, margin: [ 10 , 2 , 0 , 0 ] ,     
          },
          { text: 'SCTR'+this.obteniendoCorrelativo()+'-S0237129-SALUD', fontSize: 9, alignment: 'left', margin: [ 0 , 15 , 10 , 10 ]},
          { text: this.obtenerFecha() , fontSize: 9,alignment: 'right', margin: [ 0 , 2 , 0 , 10 ]},
          { text: this.obtenerHora(), fontSize: 9, decoration:'underline', alignment: 'right', margin: [ 0 , 2 , 0 , 10 ]},

          { text: 'CONSTANCIA', fontSize: 11, decoration:'underline', alignment: 'center', margin: [ 5 , 2 , 10 , 20 ]},
          { text:'Por medio de la presente, dejamos constancia que los Señores:', fontSize:9, alignment: 'left', margin: [ 0 , 4 , 0 , 5 ]},
          { text:'C & R CLERQUE CONSTRUCTORA PERU SOCIEDAD ANONIMA CERRADA', fontSize:12, alignment: 'center', margin: [ 0 , 5 , 0 , 5 ]},
          { text:'De acuerdo a lo establecido en el Decreto Supremo 003-98-SA – Normas Técnicas del Seguro Complementario de Trabajo de Riesgo, a la fecha han contratado con Rimac S.A. Entidad Prestadora de Salud la(s) póliza(s) de Seguro Complementario de Trabajo de Riesgo siguiente(s):', fontSize:9, alignment: 'justify'},
          { text: 'SCTR SALUD  N° S0237129', fontSize: 11, alignment: 'center', margin: [ 0 , 5 , 0 , 3 ]},
          { text: 'La constancia es de vigencia mensual y es renovable', fontSize: 9,alignment: 'center', margin: [ 0 , 1 , 0 , 6 ]},
          { text: 'La presente constancia tiene vigencia hasta el '+this.obtenerFechaVencimiento() +' A solicitud de la empresa contratante se emite la presente Constancia detallando a continuación el personal que se encuentra afiliado a la(s) póliza(s) antes mencionada(s).', fontSize: 9, alignment: 'justify'},

          { text: 'RELACION DE PERSONAL:', fontSize: 11, alignment: 'left', margin: [ 0 , 20 , 0 , 0 ]},

          {
            margin: [-5, 0, 0, 0],
            table: {
              widths: [30, 260, 65 ,65],                       
              body: this.body           
              
            }
          },
          { text: 'Se expide la presente a solicitud del Asegurado/Contratante para los fines que estime convenientes.', fontSize: 9,alignment: 'left', margin: [ 2 , 10 , 0 , 6 ]},
          
          {image: this.firmaUrl, margin: [ 10 , 7 , -10 , 0 ], alignment: 'right', width: 120, height: 60},
          { text: 'Mark Andrés Reyes Ploog', fontSize: 10, alignment: 'right', margin: [ 0 , 0 , -4 , 0]},
          { text: 'Rimac EPS S.A. Entidad Prestadora ', fontSize: 10, alignment: 'right', margin: [ 0 , 0 , -24 , 0]},
          { text: 'Usuario :  CR1RZAMUDM', fontSize: 8, alignment: 'left', margin: [ 0 , 0 , 0 , 0]},
          { text: 'de Salud', fontSize: 10, alignment: 'right', margin: [ 0 , -10 , 35 , 0]},
          
          
      ],
      margin: [33, 0, 33, 0],
			
    },

	],
	



  

    };
    pdfMake.createPdf(documentDefinition).open();

  }
}