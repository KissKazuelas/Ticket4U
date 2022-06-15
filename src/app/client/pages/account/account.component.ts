import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '../../services/client-service.service';
import { MetodoPago } from '../../models/Pago.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DatoFacturacion } from '../../models/Facturacion.model';
import { AsientoData } from '../../models/Asiento.model';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService]
})
export class AccountComponent implements OnInit {
  nombre: string = "";
  apellido: string = "";
  mail: string = "";
  username: string = "";
  displayPago: boolean = false;
  displayFac: boolean = false;
  cols: any[] = [];
  exportColumns: any[] = [];

  $metodos?: Observable<any>;
  $metodosRefresh = new BehaviorSubject('');
  metodoPago: MetodoPago = new MetodoPago();
  metodosPago: MetodoPago[] = [];

  $metodosFac?: Observable<any>;
  $metodosRefreshFac = new BehaviorSubject('');
  datoFacturacion: DatoFacturacion = new DatoFacturacion();
  datosFacturacion: DatoFacturacion[] = [];

  boletos: AsientoData[] = [];

  constructor(private clientService: ClientServiceService,
    private messageService: MessageService) { }

  addSingleSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Listo!', detail: msg, life: 3000 });
  }
  showDialog() {
    this.displayPago = true;
  }
  showDialogFac() {
    this.displayFac = true;
  }
  ngOnInit(): void {
    this.clientService.getDataUser().subscribe(resp => {
      const { nombre, apellido, mail, userName } = resp.user;
      this.nombre = nombre;
      this.apellido = apellido;
      this.mail = mail;
      this.username = userName;
    })
    this.GetMetodosPago();
    this.GetDatosFac();
    this.GetBoletos();
  }
  VistaActualizaNombre() {
    (<HTMLInputElement>document.getElementById(`txtNombre`)).classList.add('d-none');
    (<HTMLInputElement>document.getElementById(`inputNombre`)).classList.remove('d-none');
    (<HTMLInputElement>document.getElementById(`btnEditar`)).classList.add('d-none');
    (<HTMLInputElement>document.getElementById(`btnActualizar`)).classList.remove('d-none');
  }
  GetMetodosPago() {
    this.$metodos = this.$metodosRefresh.pipe(
      switchMap(() => this.clientService.getMetodosPago()
      ));
  }
  GetBoletos() {
    this.clientService.getAsientos().subscribe(resp => {
      this.boletos = resp.asientos;
    })
  }
  CrearMetodoPago() {
    this.metodoPago.owner = localStorage.getItem("uid_ust")!;
    this.clientService.createMetodoPago(this.metodoPago).subscribe(resp => {
      this.displayPago = false;
      this.$metodosRefresh.next('');
      this.addSingleSuccess('Se ha agregado con exito el metodo de pago');
    })
  }
  DeleteMetodoPago(id: string) {
    this.clientService.deleteMetodoPago(id).subscribe(resp => {
      this.$metodosRefresh.next('');
      this.addSingleSuccess('Se ha eliminado con exito el metodo de pago');
    })
  }
  DeleteDatoFac(id: string) {
    this.clientService.deleteDatoFac(id).subscribe(resp => {
      this.$metodosRefreshFac.next('');
      this.addSingleSuccess('Se ha eliminado con exito el dato de facturación');
    })
  }
  GetDatosFac() {
    this.$metodosFac = this.$metodosRefreshFac.pipe(
      switchMap(() => this.clientService.getDatosFacturacion()
      ));
  }
  CrearDatoFac() {
    this.datoFacturacion.owner_uid = localStorage.getItem("uid_ust")!;
    this.clientService.creteDatoFacturacion(this.datoFacturacion).subscribe(resp => {
      this.displayFac = false;
      this.$metodosRefreshFac.next('');
      this.addSingleSuccess('Se ha agregado con exito el dato de facturación');
    })
  }
  ReportePDF(id: string) {
    this.clientService.getPDFReport(id).subscribe(resp => {
      const doc = new jsPDF();
      const columns = [['N° Asiento', 'Seccion', 'Precio Boleto','Banco de pago','Tarjeta de pago']];
      const data = [
        [resp.asiento.num_asiento, resp.seccionAsiento.nombre, resp.seccionAsiento.precioUnitario, resp.metodoPagoAsiento.banco,resp.metodoPagoAsiento.numeroTarjeta]
      ];
      autoTable(doc, {
        head: columns,
        body: data,
        didDrawPage: (dataArg) => {
          doc.text('DATOS DEL BOLETO', dataArg.settings.margin.left, 10);
        }
      });
      doc.save(`Boleto-${resp.asiento._id}.pdf`);
    })

  }

}
