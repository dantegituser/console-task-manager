import inquirer from 'inquirer';
import colors from 'colors';

// creating the menu (questions)
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Options \n',
        choices: [
        {
            value: '1',
            name: `${'1.'.blue} Create task`
        },
        {
            value: '2',
            name: `${'2.'.blue} List task`
        },
        {
            value: '3',
            name: `${'3.'.blue} List completed tasks`
        },
        {
            value: '4',
            name: `${'4.'.blue} List pending tasks`
        },
        {
            value: '5',
            name: `${'5.'.blue} Complete task(s)`
        },
        {
            value: '6',
            name: `${'6.'.blue} Delete task`
        },
        {
            value: '0',
            name: `${'0.'.blue} Quit`
        },
        ]
    }
]

const inquirerMenu = async() => {
 console.clear();
console.log('===================='.green);
console.log(' Select an option'.green);
console.log('===================='.green);
console.log('\n');
// awaits for the user response
const {opcion} = await inquirer.prompt(preguntas);
console.log('\n');
return opcion;
}

// shows the message and waits for the user to respond
const pausa = async() => {
    const question = {
        type: 'input',
        name: 'enter',
        message: `Press ${'enter'.green} to continue`
    }
    console.log('\n');

    await inquirer.prompt(question)
    console.clear();

}

// reads the user input
const leerInput = async(message) => {
const question = {
    type: 'input',
    name: 'desc',
    message,
    validate(value){
        if(value.length === 0){
            return 'Please enter a value'
        }
        return true
    }
}
console.log('\n');
const {desc} = await inquirer.prompt(question);
console.clear()
return desc;
}

// renders the list so the user can delete any taks
const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    choices.unshift({
        value:0,
        name: '0.'.green + ' Cancel'
    });
    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Delete',
        choices
    }]
    const {id} = await inquirer.prompt(preguntas);
    return id;

}

// Provides the confirm option to the user
const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
        name: 'ok',
        message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

// renders all the tasks, so the user can edit them
const mostrarListadoChecklist = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}`.green;

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });
    
    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select',
        choices
    }]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;

}

export{   inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar , mostrarListadoChecklist}