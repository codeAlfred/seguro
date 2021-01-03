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

  constructor() { }

  ngOnInit(): void {
    // C:\Users\CLERQUE CONSTRUCTORA\Desktop\proyecto sctr\client\src\assets\logo.jpg
    Utils.getImageDataUrlFromLocalPath1('assets/logo.jpg').then(
    result => this.logoDataUrl = result
    )

    Utils.getImageDataUrlFromLocalPath1('assets/firma.png').then(
      result => this.firmaUrl = result
      )

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

  
  

}
