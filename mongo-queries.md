# Readme
Antes de importar, entre no arquivo "lista louvores.xlsx"
e copie as formulas à direita (que transforma a data para ISO), e depois copie os resultados como valores. Só assim será possível exportar corretamente.

Execute `node app.js` para que seja gerado o arquivo `results.js`.

No arquivo gerado, selecione todos os campos `"date": "...` com seu editor de preferência, e insira o prefixo `"date" : ISODate("...")` para que o campo seja importado como Data pelo Mongo.

NOTA:fica a sugestão para automatizar este processo no próprio app.js

## basic shell commands
```javascript
show dbs
use <db>
show collections
db.help()
db.<collection>.help()
```

## delete collections
- Syntax: `db.<collection>.drop()`
- Example: `db.oasis.drop()`

## Insert Many
- Syntax: `db.<collection>.insertMany([])`
- Example:
```javascript
db.oasis.insertMany([
    {
      "date": "2018-04-14T10:00-0300",
      "music": "Tua palavra é luz",
      "sequence": 1,
      "resp": "Lidio",
      "band": "Lidio, Raphael, Diego",
      "where": {
        "name": "Oásis",
        "desc": "casa marcelo"
      }
    },
    {
      "date": "2018-04-14T10:00-0300",
      "music": "Restaura",
      "sequence": 2,
      "resp": "Lidio",
      "band": "Lidio, Raphael, Diego",
      "where": {
        "name": "Oásis",
        "desc": "casa marcelo"
      }
    }
])
```

### find all
- Syntax: `db.inventory.find( {} )`
- Example: `db.oasis.find()`

### Sort by date
```javascript
db.oasis.find().sort( {date: -1} )
```

### Search by partial title case insensitive, sorted by date 
```javascript
db.oasis.find({music:/perto de/i}).sort({date: -1})
```

## Quais músicas foram mais tocadas
```javascript
db.oasis.aggregate([
    { $group: { _id: "$music", total: { $sum: 1 } } },
    { $sort: { total: -1, _id: 1 } },
]).toArray()
```

ou
```javascript
DBQuery.shellBatchSize = 500;
db.oasis.aggregate([
    { $group: { _id: "$music", total: { $sum: 1 } } },
    { $sort: { total: -1, _id: 1 } },
])
```
Apenas de 2019

```javascript
db.oasis.aggregate([
    { $match: { date : {
            $gte: ISODate("2019-01-01T00:00:00.000-0300"),
            $lt: ISODate("2020-01-01T00:00:00.000-0300")
            }}
    },
    { $group: { _id: "$music", total: { $sum: 1 } } },
    { $sort: { total: -1, _id: 1 } },
]).toArray()
```

Contando o resultado

```javascript
db.oasis.aggregate([
    { $match: { date : {
            $gte: "2019-01-01T00:00:00.000-0300",
            $lt: "2020-01-01T00:00:00.000-0300"
            }}
    },
    { $group: { _id: "$music", total: { $sum: 1 } } },
    { $sort: { total: -1, _id: 1 } },
    { $count: "music" }
]).toArray()
```

## Quantos encontros houveram?
Em 2019 houveram 39 encontros.

```javascript
db.oasis.aggregate([
    { $match: { date : {
            $gte: ISODate("2019-01-01T00:00:00.000-0300"),
            $lt: ISODate("2020-01-01T00:00:00.000-0300")
            }}
    },
    { $group: { _id : "$date" } },
    { $sort : { _id: -1 } },
    { $count : "date" }
]).toArray()
```

## Quantas músicas cantamos ao todo?
(inclusive as repetidas)

```javascript
db.oasis.aggregate([
    { $match: { date : {
            $gte: ISODate("2019-01-01T00:00:00.000-0300"),
            $lt: ISODate("2020-01-01T00:00:00.000-0300")
            }}
    },
    { $sort : { _id: -1 } },
    { $count : "music" }
]).toArray()
```

## Quantas músicas não repeditas cantamos?
```javascript
db.oasis.aggregate([
    { $match: { date : {
            $gte: ISODate("2019-01-01T00:00:00.000-0300"),
            $lt: ISODate("2020-01-01T00:00:00.000-0300")
            }}
    },
    { $group: { _id : "$music" } },
    { $sort : { _id: -1 } },
    { $count : "music" }
]).toArray()
```

## Retrospectiva 2019

Em 2019 foram realizados 39 encontros no Oásis.

Cantamos 119 músicas ao todo, o que dá 10 horas cantando. Se tirarmos as músicas repetidas, cantamos 62 músicas diferentes.

As músicas mais cantadas que ocuparam o pódio são: 
- 9 vezes = Maranata
- 6 vezes = [Eu só quero estar, Mais perto quero estar, Vim para adorarte]
- 5 vezes = Horas benditas

Pessoas que participaram tocando: 
- André (violão)
- Raphael (cajón)
- Lidio (piano e violão)

Pessoas que participaram cantando (no momento de louvor):
- Juliana,
- Raphael,
- Davi,
- Sarah Vargas,
- Sarah Rached 
- André 
- Lidio

>Muito obrigado a você que participou conosco, dedicando seu tempo, energia e talento. Esperamos fazer mais ainda em 2020, desejando que a sua vontade de fazer música juntos seja ainda maior no ano que entra. 

> NOTA: Se sabe de alguma pessoa que participou mas não está aqui, por favor nos avise. Se sabe de alguém que quer participar, é só chamar, sem burocracias.

Pessoas que ajudaram passando os slides:
- Davi
- Eduardo
- Carlos
- Juliana
- Sarah

A seguir, a relação completa de músicas, agrupadas pelas mais cantadas:

```javascript
[
    "Maranata (9)",
    "Eu só quero estar (6)",
    "Mais perto quero estar (6)",
    "Vim para adorar-te (6)",
    "Horas benditas (5)",
    "Descansarei (Still) (4)",
    "Renovame (4)",
    "Santo somente é o Senhor (4)",
    "Vinde às águas (4)",
    null (3),
    "Esconderijo (3)",
    "Falar com Deus (3)",
    "Nasce em mim (3)",
    "Quero te amar (3)",
    "Descansar (Tonasso) (2)",
    "Dez mil razões (2)",
    "Eu me rendo (Leonardo Gonçalves) (2)",
    "Maravilhas (2)",
    "Perto de Jesus (2)",
    "Porque ele vive (2)",
    "Toma meu coração (2)",
    "Vencendo Vem Jesus (2)",
    "Achei um grande amigo (1)",
    "Alvo mais que a neve (1)",
    "Além do rio (1)",
    "Ao olhar pra cruz (1)",
    "Até então (1)",
    "Bem junto a Cristo (1)",
    "Brilhar por ti (1)",
    "Canção da vida (1)",
    "Cristo ó Cristo (1)",
    "Em tuas mãos (1)",
    "Eu sou teu (onde me mandares ir eu sigo) (1)",
    "Eu só quero estar onde estás (1)",
    "Eu te amo, Ó Deus (1)",
    "Grande Alegria (1)",
    "Grande Deus (1)",
    "Hoje não (Pedro Valença) (1)",
    "Inteiramente fiel (1)",
    "Jesus quer entrar (1)",
    "Jesus sempre te amo (1)",
    "Lar feliz (1)",
    "Mansão sobre o monte (1)",
    "Mensageiro (1)",
    "Não há o que temer (1)",
    "Não há razão (1)",
    "O melhor lugar do mundo (1)",
    "O que penso do meu mestre (1)",
    "Paz, paz, quão doce paz (1)",
    "Poder do amor (1)",
    "Que prazer é ser de Cristo (1)",
    "Quão grande é o meu Deus (1)",
    "Saudade (1)",
    "Se meu povo orar (1)",
    "Senhor te quero (Vineyard) (1)",
    "Seu maravilhoso Olhar (1)",
    "Shekina (1)",
    "Sonda-me (1)",
    "Sorria (1)",
    "Teu Santo Nome (1)",
    "Vive em mim (1)",
    "Volta (1)",
]
```
   