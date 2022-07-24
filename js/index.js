let usuario = "a"
let contrasenia  = "0"


alert("Comenzando autentificacion de credenciales")

function pedirCredenciales() {
    usuario = prompt("Ingrese su nombre de usuario")
    contrasenia = prompt("Ingrese su contraseña")
}

pedirCredenciales()

let intento = 0

while (usuario !== "admin" || contrasenia !== "1234") {
        
    if (intento < 3){
        alert ("Usted ha ingresado credenciales incorrectas, por favor, vuelva a intentarlo")
        intento++
        console.log("Intento fallido " + intento)
    }
    else {
        alert ("Usted ha ingresado credenciales incorrectas, por favor, vuelva a intentarlo... UNA PISTA: Usuario: admin Contraseña: 1234")
        intento++
        console.log("Intento fallido " + intento)
    }
    pedirCredenciales()

}

alert("HA INGRESADO SATISFACTORIAMENTE")

alert("COMENZANDO SISTEMA DE GESTION")

let respuesta

function accion () {
    respuesta = prompt("Ingrese NUEVO para ingresar afiliado / SALIR para terminar la ejecución / CANTIDAD para mostrar la cantidad actual de afiliados / BUSCAR para buscar un socio dentro del padron / BORRAR para borrar el último registro ingresado")
}


class Afiliado {
    constructor(dni, nombre, apellido, anioNacimiento, domicilio, codPostal, ciudad, provincia, pais, categoria){
        this.dni = dni
        this.nombre = nombre
        this.apellido = apellido
        this.anioNacimiento = anioNacimiento
        this.domicilio = domicilio
        this.codPostal = codPostal
        this.ciudad = ciudad
        this.provincia = provincia
        this.pais = pais
        this.categoria = categoria
    }
}

const padron = [] 


function nuevoAfiliado(){
    dni = prompt("Ingrese el DNI")
    nombre = prompt("Ingrese el nombre")
    apellido = prompt("Ingrese el apellido")
    anioNacimiento = prompt("Ingrese el año de nacimiento")
    domicilio = prompt("Ingrese el domicilio")
    codPostal = prompt("Ingrese el Código Postal")
    ciudad = prompt ("Ingrese la ciudad")
    provincia = prompt("Ingrese la Provincia")
    pais = prompt("Ingrese el país")
    categoria = prompt("Ingrese si es SOCIO o si es EMPLEADO")
    
    if (padron.some((Afiliado) => {
        return Afiliado.dni === dni
    })) {
        alert(`El DNI  ${dni} ingresado ya figura en la base de datos!!`)
    } else {
        afiliado = new Afiliado (dni, nombre, apellido, anioNacimiento, domicilio, codPostal, ciudad, provincia, pais, categoria)

        padron.push(afiliado)
    }

    
}


function buscarDni(buscar){
    const padronFiltrado = padron.filter((Afiliado)=>{
        return Afiliado.dni === buscar
    })
    console.log(padronFiltrado)
}

accion()

while (respuesta !== "salir" && respuesta !=="SALIR"){
    if (respuesta === "NUEVO" || respuesta === "nuevo"){
        nuevoAfiliado()
        accion()
    }
    else if(respuesta === "CANTIDAD" || respuesta === "cantidad"){
        console.log("La cantidad de afiliados es de: " + padron.length)
        accion()
    }
    else if(respuesta === "BORRAR" || respuesta === "borrar"){
        padron.pop()
        console.log("REGISTRO BORRADO!!!")
        accion()
    }
    else if(respuesta === "BUSCAR" || respuesta === "buscar"){
        buscar = prompt("Ingrese DNI a buscar")
        buscarDni(buscar)
        accion()
    }
    else{
        alert("INGRESE UNA RESPUESTA VALIDA!!")
        accion()
    }
}

console.log(padron)