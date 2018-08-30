import { Endereco } from './endereco.model';
import { Empresa } from './empresa.model';

export class Usuario {
    constructor(
        public id: string,
        public nome: string,
        public senha: string,
        public email: string,
        public perfis: string[],
        public isAtivo: boolean,
        public endereco?: Endereco,
        public empresa?: Empresa,
        public url_perfil?: string,
    ) {}
}
