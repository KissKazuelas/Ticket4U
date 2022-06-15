export class Evento{
    public _id: string;
    public nombreEvento : string;
    public organizador_jwt: string;
    public fecha: Date;
    public status: string;
    public listaDeSecc: Seccion[]
    constructor(_id:string,nombreEvento:string,organizador_jwt:string,fecha:Date,status:string,listaDeSecc: Seccion[]) {
        this._id=_id;
        this.nombreEvento=nombreEvento;
        this.organizador_jwt=organizador_jwt;
        this.fecha=fecha;
        this.status=status;
        this.listaDeSecc=listaDeSecc;
    }
}

export class Seccion {
    public _id: string;
    public nombre: string;
    public numAsientos: number;
    public precioUnitario: number;
    public uid_evento: string;

    constructor(_id: string,nombre: string,numAsientos: number,precioUnitario: number,uid_evento: string) {
            this._id=_id;
            this.nombre=nombre;
            this.numAsientos=numAsientos;
            this.precioUnitario=precioUnitario;
            this.uid_evento=uid_evento;
    }
}