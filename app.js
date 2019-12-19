const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

// Date, ISODate, Music, #, Resp, Band, Notes, Where
const schema = {
  'ISODateValue': {
    prop: 'date',
    type: String
  },
  'Music': {
    prop: 'music',
    type: String
  },
  'Sequence': {
    prop: 'sequence',
    type: Number
  },
  'Resp': {
    prop: 'resp',
    type: String
  },
  'Band': {
    prop: 'band',
    type: String
  },
  'Notes': {
    prop: 'notes',
    type: String
  },
  'Where': {
    prop: 'where',
    type: {
      'WhereName': {
        prop: "name",
        type: String
      },
      'WhereDescription': {
        prop: 'desc',
        type: String
      } 
    }
  }
}

readXlsxFile('d:/Lidio/Google\ Drive/docs/IASD\ Oasis/música/lista\ louvores.xlsx', { 
  schema,
  sheet: "playlist OASIS"
})
// .then((data)=>{
//   data.rows.forEach( (elem) => {
//     elem.date = "ISODate('" + elem.date + "')";
//     //remember to manually remove the " " from JSON 
//     //before import to mongo
//   })
//   return data;
// })
.then((data)=>{
  let ws = fs.createWriteStream('results.js');
  ws.write(JSON.stringify(data, null, 2), 'utf8');
  ws.on('finish', ()=> { 
    console.log('All data exported to \'results.js\'');
  });
  ws.end();
})
.catch( (data) =>{
  console.log(data);
})