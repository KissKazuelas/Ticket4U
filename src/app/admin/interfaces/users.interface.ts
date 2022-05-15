export interface ResultUsers {
    ok:        boolean;
    usersList: UsersList[];
}

export interface UsersList {
    _id:           string;
    nombre:        string;
    apellido:      string;
    mail:          string;
    rol:           string;
    userName:      string;
    status:        boolean;
    calle?:        string;
    codigoPostal?: string;
    colonia?:      string;
    ciudad?:       string;
    estado?:       string;
    RFC?:          string;
}
