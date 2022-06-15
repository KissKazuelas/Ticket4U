export class MetodoPago{
    public _id?: string;
    public numeroTarjeta?: string;
    public banco?:string;
    public fechaVencimiento?:string;
    public owner?: string;
    /**
     *
     */
    public constructor(_id?: string,numeroTarjeta?: string,banco?:string,fechaVencimiento?:string,owner?: string) {
        this._id=_id;
        this.numeroTarjeta=numeroTarjeta;
        this.banco=banco;
        this.fechaVencimiento=fechaVencimiento;
        this.owner=owner;
    }
}