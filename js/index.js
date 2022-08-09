const formIngreso = document.querySelector("#ingreso")
const formAltas = document.querySelector("#formularioAlta")
const divIngreso = document.querySelector(".ingreso")
const divAltas = document.querySelector(".altas")
const divPadron = document.querySelector(".padron")
const divBotonera = document.querySelector(".botonera")
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
const logOut = document.querySelector("#logOut")
const borrar = document.querySelector("#borrar")


let padron = []
const obtenerPadrondDelLS = localStorage.getItem("padron")
const padronParseado = JSON.parse(obtenerPadrondDelLS) || []
console.log(padronParseado)
padron = [...padronParseado]
console.log(padron)


function errorUsuario() {alert("Usted ha ingresado credenciales incorrectas, por favor, vuelva a intentarlo")}

function okUsuario () {
    divIngreso.style.display = "none"
    divAltas.style.display = "flex"
    divPadron.style.display = "flex"
    divPadron.style.flexDirection = "column"
    divBotonera.style.display = "flex"
}

function revisarIngreso(usuario, contrasenia) {
    (usuario !== "admin" || contrasenia !== "1234") ?  errorUsuario() : okUsuario()
}

formIngreso.onsubmit = (event) => {
    event.preventDefault()
    revisarIngreso(usuario.value, contrasenia.value)
}

function subirPadronLS() {
    padronJSON = JSON.stringify(padron)
    localStorage.setItem("padron", padronJSON)
}


function nuevoAfiliado(fdni, fnombre, fapellido, fdireccion, fcodPostal, fciudad, fprovincia) {
    dni = fdni
    nombre = fnombre
    apellido = fapellido
    domicilio = fdireccion
    codPostal = fcodPostal
    ciudad = fciudad
    provincia = fprovincia

    padron.some((Afiliado) => { return Afiliado.dni === dni }) ? (alert(`El DNI  ${dni} ingresado ya figura en la base de datos!!`)) : (padron.push({ dni, nombre, apellido, domicilio, codPostal, ciudad, provincia }))

    subirPadronLS()

    console.log(padronParseado)
    console.log(padron)

}

function mostrarPadron() {
    const tarjetasHtml = padron.reduce((acc, elemento, i) => {

        return acc = acc + `    
            <tr class="tabla"> 
                <td>${elemento.apellido} ${elemento.nombre}</td>
                <td>DNI: ${elemento.dni}</td>
                <td>Domicilio: ${elemento.domicilio}</td>
                <td>Cod. Postal: ${elemento.codPostal}</td>
                <td>Ciudad: ${elemento.ciudad}</td>
                <td>Privincia: ${elemento.provincia}</td>
            </tr>
        `
    }, "<table> <tr> <th>APELLIDO Y NOMBRE</th>  <th>DNI</th> <th>DOMICILIO</th> <th>COD POSTAL</th> <th>CIUDAD</th> <th>PROVINCIA</th>  </tr>")

    const contenedorAfiliados = document.querySelector(".contenedorAfiliados")

    contenedorAfiliados.innerHTML = (tarjetasHtml + "</table>")
}

mostrarPadron()

formAltas.onsubmit = (event) => {
    event.preventDefault()
    nuevoAfiliado(fdni.value, fnombre.value, fapellido.value, fdireccion.value, fcodPostal.value, fciudad.value, fprovincia.value)

    mostrarPadron()
    formAltas.reset()

}

borrar.onclick = () => {
    padron.pop();
    alert("El registro ha sido borrado!")
    subirPadronLS()
    mostrarPadron()
}


logOut.onclick = () => {
    location.reload()
}

