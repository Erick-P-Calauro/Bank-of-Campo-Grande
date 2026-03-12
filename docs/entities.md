## Entidades : 

Este documento busca estruturar os dados manipulados pelo sistema em entidades.

### Usuário : 
    - id : uuid
    - nome_completo : string
    - cpf : string
    - telefone : string
    - data_cadastro : date
    - papel : int | PapelUsuário

### Conta : 
    - id : uuid
    - dono : Usuário
    - saldo : double
    - data_cadastro: date
    - status : int | StatusConta

### Transação
    - id : uuid
    - tipo : int | TipoTransção
    - data : date
    - conta_origem : Conta
    - conta_destino : Conta
    - valor : double

### Cartão : 
    - id : uuid
    - dono : Conta
    - status : int | StatusCartão
