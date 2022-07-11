const respuesta = prompt("Ingrese aprobado, si desea saber con que nota se aprueba el examen o desaprobado, en caso contrario.");

console.log(`Ha ingresado ${respuesta}`);

if (respuesta === "aprobado" || respuesta === "desaprobado") {
    for (let i = 1; i <= 10; i++){

        if ( respuesta === "aprobado" && i >= 7 ){
            console.log(`Si su nota es ${i} , aprobo el examen`);
        }
        else if ( respuesta === "desaprobado" && i < 7){
            console.log(`Si su nota es ${i} , desaprobo el examen`);
        }
    }
    
} else {
    console.log("No ingresó ninguna instrucción coherente");
    
}

