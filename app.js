import colors from 'colors';
import {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
import { guardarDB, leerDB } from './db/guardarArchivo.js';
//const {mostrarMenu, pausa} = require('./helpers/mensajes');

// console.clear();

const main = async () => {
    // initialize the options variable to empty string
let opt = '';

// creating new Tareas Object
const tareas = new Tareas();

// reading the database
const tareasDB = leerDB();
if(tareasDB){
    //establecer tareas
    // adding the tasks from db to Tareas Object
    tareas.cargarTareasFromArray(tareasDB);
}
do{

    // opt = await mostrarMenu();
    // esta funcion imporime el menu
    // prints the menu on screen and gets the user response
    opt = await inquirerMenu();
    switch (opt) {
        case '1':
            const desc = await leerInput('Description: ');
            // creates a task with the corresponding description
            tareas.crearTarea(desc);
            break;
        case '2':
            //console.log(tareas.listadoArr);
            // renders all tasks
            tareas.listadoCompleto();
            break;
        case '3':
            // renders pending tasks
            tareas.listarPendientesCompletadas(true);
            break;
        case '4':
            // renders completed tasks
            tareas.listarPendientesCompletadas(false);
            break;
        case '5':
            // shows tasks so the user can edit them
            const ids = await mostrarListadoChecklist(tareas.listadoArr);
            tareas.toggleCompletadas(ids);
            break;
        case '6':
            // renders a list of tasks so the user can delete them
            const id = await listadoTareasBorrar(tareas.listadoArr);
            if(id !== 0){

                const ok = await confirmar('¿Are you sure?');
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('Task removed succesfully');
                }
            }
            // console.log({ok});
            break;
    }
    //console.log({opt});
    // save the edited tasks in the DB
    guardarDB(tareas.listadoArr);
    await pausa();
    
}while(opt !== '0')
// pausa();
}

main();