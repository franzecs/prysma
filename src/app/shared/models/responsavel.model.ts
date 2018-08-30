import { Usuario } from './usuario.model';
import { Endereco } from './endereco.model';

export class Responsavel extends Usuario {
    constructor(
        public id: string,
        public nome: string,
        public cpf: string,
        public endereco: Endereco,
        public telefone: string,
        public email: string,
        public senha: string,
        public perfis: string[],
        public isAtivo: boolean,
        public url_perfil?: string
    ) {
        super(id, nome, senha, email, perfis, isAtivo);
    }
}
