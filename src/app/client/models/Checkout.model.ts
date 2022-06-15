export class Boletos{
    public _id : string;
    public nombreSeccion:string;
    public nombreEvento:string;
    public precioUnitario: number;
    public cantidad:number;
    public total:number;

    constructor(_id : string, precioUnitario: number,cantidad:number,nombreSeccion:string,nombreEvento:string) {
        this._id=_id;
        this.precioUnitario=precioUnitario;
        this.cantidad=cantidad;
        this.total=this.cantidad*this.precioUnitario;
        this.nombreSeccion=nombreSeccion;
        this.nombreEvento=nombreEvento;
    }
}