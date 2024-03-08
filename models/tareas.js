import { Tarea } from "./tarea.js";


class Tareas {
    // listado variable initialized to empty object
    _listado = {};


    get listadoArr(){
        const listado = [];
        // iterates over the  listado object and push the key to the listado array
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    }
    constructor(){
        this._listado = {};
    }

    // loads the list of tasks from _listado array
    cargarTareasFromArray(tareas = []){
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
    };

    // creates a task, adding the description
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    // renders the full list of tasks
    listadoCompleto(){
        this.listadoArr.forEach((tarea,i) => {
            const idx = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
            ? 'Complete'.green
            : 'Pending'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        })
    }

    // Displays the list of Pending/completed tasks based on argument
    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
            ? 'Complete'.green
            : 'Pending'.red;
            if(completadas){
                if (completadoEn) {
                    
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${completadoEn.green}`);
                }
                
            }else{
                if (!completadoEn) {
                    
                    contador += 1;
                    console.log(`${contador.toString().red}. ${desc} :: ${estado}`);
                }

            }
        })
    }

    // deletes a task based on id
    borrarTarea(id = ''){
        console.log("borrar: ", this._listado[id]);
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    
    toggleCompletadas(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

export{Tareas};