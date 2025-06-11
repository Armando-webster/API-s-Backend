import { Controller, Dependencies, Get } from '@nestjs/common';
import { Servico } from './app.service';
import { Post, Body, Bind, Param, Patch } from '@nestjs/common';

@Controller()
@Dependencies(Servico)
export class AppController {
  constructor(dadosProdutos) {
    this.dadosProdutos = dadosProdutos;
  }

  @Get('gerenciaplanos/clientes')
  async getClientes() {
    return await this.dadosProdutos.buscarClientes();
  }

  @Get('gerenciaplanos/planos')
  async getPlanos() {
    return await this.dadosProdutos.buscarPlanos();
  }

  @Post('gerenciaplanos/assinaturas')
  @Bind(Body())
  async postAssinaturas(assinatura) {
    return await this.dadosProdutos.cadastrarAssinatura(assinatura);
  }
 
  @Patch('gerenciaplanos/planos/:planoId')
  @Bind(Param('planoId'), Body())
  async patchAtualizaPreco(planoId, preco) {
    return await this.dadosProdutos.atualizaPlanosId(planoId, preco);
  }

  @Get('gerenciaplanos/assinaturas/:Tipo')
  @Bind(Param('Tipo'))
  async getAssinaturasTipo(tipo) {
    return await this.dadosProdutos.buscarAssinaturas(tipo);
  }

  @Get('gerenciaplanos/asscli/:idCli')
  @Bind(Param('idCli'))
  async getAssinaturasPorCliente(idCli) {
    return await this.dadosProdutos.buscarAssinaturasPorCliente(idCli);
  }

  /*@Post('registrarpagamento')
  @Bind(Body())
  async postRegistrarPagamento(info) {
    return await this.dadosProdutos.registrarPagamento(info);
  }*/

}