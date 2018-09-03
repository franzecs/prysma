import { EmpresaDTO } from '../dto/empresa.dto';

export class Produto {
    constructor(
        public id: string,
        public descricao: string,
        public fabricante: string,
        public estoque: number,
        public valor: number,
        public empresa: EmpresaDTO
    ) {}
}
