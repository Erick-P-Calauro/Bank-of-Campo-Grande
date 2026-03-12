## Bank Of Campo Grande

A aplicação Bank Of Campo Grande é uma API REST com propósitos educacionais que simula o funcionamento de um banco. Este serviço foi desenvolvido visando a integração facilitada com outras aplicações digitais, capacidade de extensão de suas funcionalidades e para contemplar as operações básicas de saque, depósito, transferência, pix e cartões.

## Tecnologias

Para materialização dos objetivos, foi escolhida a utilização do framework Nest.JS devido ao tamanho de seu ecossistema combinado com arquitetura modular, versatilidade e suporte à extensão, junto com o gerenciador de pacotes pnpm, conhecido por ser eficiente em relação a tempo e espaço em disco. Ambas as tecnologias se alinham com o objetivo de desenvolver um serviço facilmente integrável e extensível.

## Como rodar este projeto ? 

Para rodar este projeto localmente : 

### Instale o gerenciador de pacotes : 

Caso tenha o gerenciador de pacotes npm instalado : 

```bash

npm install -g pnpm@latest-10

```

Caso não tenha o gerenciador de pacotes npm instalado seguir as instruções da documentação original do pnpm : https://pnpm.io/installation

### Baixe a dependência global do framework :  

Caso queira trabalhar no projeto, é recomendado baixar a interface de linha de comando do Nest.JS : 

```bash

pnpm add -g @nestjs/cli

```

ou 


```bash

npm install -g @nestjs/cli

```

### Baixe as dependências do projeto : 

```bash

pnpm install

```

### Rode a aplicação em modo de desenvolvimento : 

```bash

pnpm start:dev

```