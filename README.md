# Excel to JSON

Este é um exemplo de uso da bilioteca `read-excel-file`, para ler um arquivo Excel (xlsx), e exportar para a estrutura de JSON.

## Download

```
git clone git@github.com:lidiovargas/excel-to-json.git
```

## Install Depencencies

```
npm install
```

## Run

```
node app.js
```

O resultado é exportado no arquivo `result.js`, que por enquanto deve ser inserido manualmente na base de dados.

> NOTA: Ainda não consegui automatizar a conversão de ISODate para exportar ao Mongo. Estou fazendo essa mudança manualmente através do VSCode ou Sublime Text, e depois colocando no RoboMongo 3T. 

Quando não é inserido no mongo como ISODate, fica uma string, e não é possível ordenar ascendente ou descendentemente por data.

Caso fosse a inserção fosse feito via código da aplicação, seria possível já converter a data, mas para isso é necessário conectar à base de dados (work in progress).

## Local de arquivos XLSX

O projeto consta com um arquivo de amostra, em 'files/lista louvores.xlsx'. 

Mas em 'config/urls' fica a lista de locais onde será procurado um arquivo antes de usar esta amostra. Foi feito assim para que fosse possível executar lendo direto dos arquivos que estão querendo ser rastreados, e não apenas da amostra.

Caso queira adicionar outros arquivos, edite essa lista, lembrando que aquele que for encontrado primeiro, será aberto.

## Preparação de arquivos XLSX

A constante "schema" deve ter os mesmos nomes das colunas no excel que desejam ser exportadas.

Para que uma data seja importada como data, no excel deve estar no formato de ISODate. Para isso foi criada uma coluna que converte as datas a esse formato.

> IMPORTANTE: toda vez que o arquivo é atualizado, é necessário lembrar de copiar as fórmulas que convertem as novas linhas digitadas em ISODate, senão a data não será importada, já que estará vazia.