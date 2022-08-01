const formIngreso = document.querySelector("#ingreso")
const formAltas = document.querySelector("#formularioAlta")
const divIngreso = document.querySelector(".ingreso")
const divAltas = document.querySelector(".altas")
const divPadron = document.querySelector(".padron")
const usuario = document.querySelector("#userId")
const contrasenia = document.querySelector("#inputPassword")
const fdni = document.querySelector("#inputDni")
const fapellido = document.querySelector("#inputApellido")
const fnombre = document.querySelector("#inputNombres")
const femail = document.querySelector("#inputEmail")
const fdireccion = document.querySelector("#inputDireccion")
const fciudad = document.querySelector("#inputCiudad")
const fprovincia = document.querySelector("#inputProvincia")
const fcodPostal = document.querySelector("#inputCodPostal")


function revisarIngreso(usuario, contrasenia) {
    if (usuario !== "admin" || contrasenia !== "1234"){
        alert ("Usted ha ingresado credenciales incorrectas, por favor, vuelva a intentarlo")
    }
    else {
        divIngreso.style.display = "none"
        divAltas.style.display = "flex"
        divPadron.style.display = "flex"
        divPadron.style.flexDirection = "column"
        console.log(divPadron)
    }
}

formIngreso.onsubmit = (event) => {
    event.preventDefault()
    revisarIngreso(usuario.value,contrasenia.value)
}

class Afiliado {
    constructor(dni, nombre, apellido, domicilio, codPostal, ciudad, provincia,){
        this.dni = dni
        this.nombre = nombre
        this.apellido = apellido
        this.domicilio = domicilio
        this.codPostal = codPostal
        this.ciudad = ciudad
        this.provincia = provincia
    }
}

const padron = [] 

function nuevoAfiliado(fdni,fnombre,fapellido,fdireccion,fcodPostal,fciudad,fprovincia){
    dni = fdni
    nombre = fnombre
    apellido = fapellido
    domicilio = fdireccion
    codPostal = fcodPostal
    ciudad = fciudad
    provincia = fprovincia
    
    if (padron.some((Afiliado) => {
        return Afiliado.dni === dni
    })) {
        alert(`El DNI  ${dni} ingresado ya figura en la base de datos!!`)
    } else {
        afiliado = new Afiliado (dni, nombre, apellido, domicilio, codPostal, ciudad, provincia)

        padron.push(afiliado)
    }

    console.log(padron)

    
}

formAltas.onsubmit = (event) => {
    event.preventDefault()
    console.log(fdni.value,fnombre.value,fapellido.value,fdireccion.value,fcodPostal.value,fciudad.value,fprovincia.value)
    nuevoAfiliado(fdni.value,fnombre.value,fapellido.value,fdireccion.value,fcodPostal.value,fciudad.value,fprovincia.value)

    const tarjetasHtml = padron.reduce((acc, elemento, i) => {   

        return acc = acc + `    
            <div class="tarjeta"> 
                <h3>${elemento.apellido} ${elemento.nombre}</h3>
                <p>
                    DNI: ${elemento.dni} <br>
                    Domicilio: ${elemento.domicilio}<br>
                    Cod. Postal: ${elemento.codPostal}<br>
                    Ciudad: ${elemento.ciudad}<br>
                    Privincia: ${elemento.provincia}<br>
                </p> 
            </div>
        `       
    },"")
    
    const contenedorAfiliados = document.querySelector(".contenedorAfiliados")
    
    contenedorAfiliados.innerHTML = tarjetasHtml

}
