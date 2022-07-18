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
    respuesta = prompt("Ingrese NUEVO para ingresar afiliado o SALIR para terminar la ejecución")
    return respuesta
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
    
    afiliado = new Afiliado (dni, nombre, apellido, anioNacimiento, domicilio, codPostal, ciudad, provincia, pais, categoria)
    
    console.log(afiliado)
}

respuesta = accion()


while (respuesta !== "salir" && respuesta !=="SALIR"){
    if (respuesta === "NUEVO" || respuesta === "nuevo"){
        nuevoAfiliado()
        accion()
    }
    else{
        alert("INGRESE UNA RESPUESTA VALIDA!!")
        respuesta = accion()
    }
}