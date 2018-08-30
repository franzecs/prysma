import { Endereco } from './endereco.model';

export class Empresa {
    constructor(
        public id: string,
        public nome: string,
        public cnpj: string,
        public endereco: Endereco,
        public telefone: string,
        public email: string,
        public tipo: string,
        public matriz: string,
        public url_logo?: string
    ) { }
}
