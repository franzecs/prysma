import { Endereco } from "./endereco.model";

export class Usuario{
    constructor(
        public id: string,
        public nome: string,
        public senha: string,
        public email: string,
        public perfis: string[],
        public isAtivo: boolean,
        public endereco?: Endereco,
        public empresa?: string,
        public url_perfil?: string,
    ){}
}