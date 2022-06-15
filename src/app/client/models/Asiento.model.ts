export class Asiento{
    public seccion_uid?: string;
    public owner_uid?: string;
    public metodoPago_uid?: string;
    public datoFacturacion_uid?: string;
    /**
     *
     */
    constructor(seccion_uid?: string,owner_uid?: string,metodoPago_uid?: string,datoFacturacion_uid?: string) {
        this.seccion_uid=seccion_uid;
        this.owner_uid=owner_uid;
        this.metodoPago_uid=metodoPago_uid;
        this.datoFacturacion_uid=datoFacturacion_uid;
    }
}
export class AsientoData{
    public _id?: string;
    public seccion_uid?: string;
    public owner_uid?: string;
    public metodoPago_uid?: string;
    public datoFacturacion_uid?: string;
    public num_asiento?: number;
    /**
     *
     */
    constructor(_id:string ,seccion_uid?: string,owner_uid?: string,metodoPago_uid?: string,datoFacturacion_uid?: string,num_asiento?:number) {
        this._id=_id;
        this.seccion_uid=seccion_uid;
        this.owner_uid=owner_uid;
        this.metodoPago_uid=metodoPago_uid;
        this.datoFacturacion_uid=datoFacturacion_uid;
        this.num_asiento=num_asiento;
    }
}