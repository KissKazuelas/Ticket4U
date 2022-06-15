export class MetodoPago{
    public numeroTarjeta?: string;
    public banco?:string;
    public fechaVencimiento?:string;
    public owner?: string;
    /**
     *
     */
    public constructor(numeroTarjeta?: string,banco?:string,fechaVencimiento?:string,owner?: string) {
        this.numeroTarjeta=numeroTarjeta;
        this.banco=banco;
        this.fechaVencimiento=fechaVencimiento;
        this.owner=owner;
    }
}