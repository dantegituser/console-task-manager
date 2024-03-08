import fs from 'fs';
const archivo = './db/data.json';

// writes the data into the data.json file
const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
};

// retrieves the data from DB (file)
const leerDB = () => {
    if(!fs.existsSync(archivo)){
        return null;
    }
    // storing the data in the info variable
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    // parsing the data so we can edit it
    const data = JSON.parse(info);
    // console.log(data);
    return data;
};

export{guardarDB, leerDB};