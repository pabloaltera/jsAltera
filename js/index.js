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
padron = [...padronParseado]


function errorUsuario() { swal("ACCESO INVALIDO!!!", "Usted ha ingresado credenciales incorrectas, por favor, vuelva a intentarlo.", "error")}

function okUsuario () {
    divIngreso.style.display = "none"
    divAltas.style.display = "flex"
    divPadron.style.display = "flex"
    divPadron.style.flexDirection = "column"
    divBotonera.style.display = "flex"
    Toastify({
        text: "BIENVENIDO!!!",
        close: true,
        duration: 5000,
        close: true,
        gravity: "top", 
        position: "right",
        stopOnFocus: true,
    }).showToast()
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


function agregaPadron(arrayPadron){
    padron.push(arrayPadron)
    Toastify({
        text: "Alta generada correctamente",
        close: true,
        duration: 5000,
        close: true,
        gravity: "top", 
        position: "right",
        stopOnFocus: true,
    }).showToast()
}

function datoRepetido(dni) {
    swal("ERROR!!!", `El DNI  ${dni} ingresado ya figura en la base de datos!!`, "error");
}

function nuevoAfiliado(fdni, fnombre, fapellido, fdireccion, fcodPostal, fciudad, fprovincia) {
    dni = fdni
    nombre = fnombre
    apellido = fapellido
    domicilio = fdireccion
    codPostal = fcodPostal
    ciudad = fciudad
    provincia = fprovincia

    padron.some((Afiliado) => { return Afiliado.dni === dni }) ? datoRepetido(dni) : (agregaPadron({ dni, nombre, apellido, domicilio, codPostal, ciudad, provincia }))

    subirPadronLS()
}

function mostrarPadron() {
    const tarjetasHtml = padron.reduce((acc, elemento, i) => {

        return acc = acc + `    
            <tr class="tabla"> 
                <td>${elemento.apellido} ${elemento.nombre}</td>
                <td>${elemento.dni}</td>
                <td>${elemento.domicilio}</td>
                <td>${elemento.codPostal}</td>
                <td>${elemento.ciudad}</td>
                <td>${elemento.provincia}</td>
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
}

borrar.onclick = () => {
    swal({
        title: "¿Estas seguro?",
        text: "Estas por eliminar el último registro ingresado",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            padron.pop();
            subirPadronLS()
            mostrarPadron()
            swal("El registro fue eliminado!!", {
            icon: "success",
        });
        } 
    });
}


logOut.onclick = () => {
    location.reload()
}

