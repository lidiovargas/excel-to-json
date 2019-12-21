const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const { urls } = require('./urls.js');

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
  'Vocal': {
    prop: 'vocal',
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

// check which file exists in urls
let urlChecked = "";
let urlErrors = [];
for (const url of urls) {
  try {
    if (fs.existsSync(url)) {
      urlChecked = url;
      break;
    } else {
      urlErrors.push(url);
    }
  } catch(err) {
    console.error(err);
  }
}

if (urlChecked !== "") {
  readXlsxFile(urlChecked, { 
    schema,
    sheet: "playlist OASIS"
  })
  .then((data)=>{
    data.rows.forEach( (elem) => {
      elem.date = "ISODate('" + elem.date + "')";
      //remember to manually remove the " " from JSON 
      //before import to mongo
    })
    return data;
  })
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
} else {
  console.log("Nenhum arquivo foi encontrado em `urls.js`: "
   + "\n%s \nPor favor insira algum url válido.", urlErrors);
}