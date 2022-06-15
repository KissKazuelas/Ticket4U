import { Lugar} from '../models/lugares.models';

export interface ResultLugares {
    ok:        boolean;
    lugaresList: LugaresList[];


}

export interface LugaresList {
    _id?:           string;
    nombre?:        string;
    ciudad?:      string;
    calle?:          string;
    estado?:           string;
}
