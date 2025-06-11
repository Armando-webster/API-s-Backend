import { Injectable } from '@nestjs/common';
import { query } from './db';

@Injectable()
export class Servico {

    async buscarClientes() {
        const clientes = await query({
            query: 'SELECT * FROM Cliente',
            values: []
        });
        return clientes;
    }

    async buscarPlanos() {
        const planos = await query({
            query: 'SELECT * FROM Plano',
            values: []
        });
        return planos;
    }

    async buscarAssinaturas() {
        const assinaturas = await query({
            query: 'SELECT * FROM Assinatura',
            values: []
        });
        return assinaturas;
    }

    async cadastrarAssinatura(assinatura) {
        this.dataAtual = new Date();
        this.dataFimFidelidade = new Date(this.dataAtual);
        this.dataFimFidelidade.setMonth(this.dataFimFidelidade.getMonth() + 6); // Adiciona 6 meses 
        const resultado = await query({
            query: 'INSERT INTO Assinatura (codPlano, codCli , inicioFidelidade, fimFidelidade, dataUtimoPagamento, custoFinal, descricao ) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [assinatura.codPlano, assinatura.codCli, this.dataAtual, this.dataFimFidelidade, this.dataAtual, assinatura.custoFinal, assinatura.descricao]
        });
        return this.buscarAssinaturas();
    }

    async atualizaPlanosId(planoId, preco) {
        const resultado = await query({
            query: 'UPDATE Plano SET custoMensal = ? WHERE codigo = ?',
            values: [preco.custoMensal, planoId]
        });
        return this.buscarPlanos();
    }

    async validaAtividade(tipo) {
        this.assinaturas = await this.buscarAssinaturas();
        this.dataAtual = new Date();
        if (tipo == 'ATIVOS') {
            for (let i = 0; i < this.assinaturas.length; i++) {
                if (this.assinaturas[i].dataUltimoPagamento >= this.dataAtual) {
                    return console.log(this.assinaturas[i],'ATIVO');
                }
            }
        } else if (tipo == 'TODOS') {
            return console.log(this.assinaturas);
        } else if( tipo == 'CANCELADOS'){
            for (let i = 0; i < this.assinaturas.length; i++) {
                if (this.assinaturas[i].dataUltimoPagamento < this.dataAtual) {
                    return console.log(this.assinaturas[i],'CANCELADO');
                }
            }
        }
    }

    async buscarAssinaturasPorCliente(idCli) {
        this.assinaturas = await this.buscarAssinaturas();
        this.assinaturasPorCliente = [];
        for (let i = 0; i < this.assinaturas.length; i++) {
            if (this.assinaturas[i].codCli == idCli) {
                this.assinaturasPorCliente.push(this.assinaturas[i]);
            }
        }
        if (this.assinaturasPorCliente.length > 0) {
            return this.assinaturasPorCliente;
        } else {
            return 'Nenhuma assinatura encontrada para o cliente com ID: ' + idCli;
        }
    }
}