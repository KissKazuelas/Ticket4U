export class DatoFacturacion{
    public _id?: string;
    public nombre?: string;
    public regimenFiscal?: string;
    public calle?: string;
    public codigoPostal?: string;
    public colonia?: string;
    public ciudad?: string;
    public estado?: string;
    public RFC?: string;
    public razonSocial?: string;
    public owner_uid?: string;
    /**
     *
     */
    constructor(_id?: string,nombre?: string,regimenFiscal?: string,calle?: string,codigoPostal?: string,colonia?: string,ciudad?: string,estado?: string,RFC?: string,
                razonSocial?: string,owner_uid?: string) {
        this._id=_id;
        this.nombre=nombre;
        this.regimenFiscal=regimenFiscal;
        this.calle=calle;
        this.codigoPostal=codigoPostal;
        this.colonia=colonia;
        this.ciudad=ciudad;
        this.estado=estado;
        this.RFC=RFC;
        this.razonSocial=razonSocial;
        this.owner_uid=owner_uid;
    }
}