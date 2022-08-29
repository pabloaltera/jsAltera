const formIngreso = document.querySelector("#ingreso")
const formAltas = document.querySelector("#formularioAlta")
const formRegistro = document.querySelector("#formRegistro")
const formContrasenia = document.querySelector("#formContrasenia")
const divIngreso = document.querySelector(".ingreso")
const divAltas = document.querySelector(".altas")
const divPadron = document.querySelector(".padron")
const divBotonera = document.querySelector(".botonera")
const divRegistro = document.querySelector("#divRegistro")
const divContrasenia = document.querySelector("#divContrasenia")
const usuario = document.querySelector("#userId")
const contrasenia = document.querySelector("#inputPassword")
const nuevoUser = document.querySelector("#newUserId")
const nuevoDNI = document.querySelector("#newDni")
const nuevoEmail = document.querySelector("#newEmail")
const nuevaContrasenia = document.querySelector("#newInputPassword")
const recuperarUsuario = document.querySelector("#recuUserId")
const recuperarDNI = document.querySelector("#recuDni")
const recuperarContrasenia = document.querySelector("#recuPassword")
const botonRegistro = document.querySelector("#registro")
const botonContrasenia = document.querySelector("#botonContrasenia")
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

let users = []
let padron = []
const obtenerPadrondDelLS = localStorage.getItem("padron")
const padronParseado = JSON.parse(obtenerPadrondDelLS) || []
padron = [...padronParseado]


function subirUsuariosLS(){
    localStorage.setItem("users", JSON.stringify(users))
}




//Inicialar usuarios iniciales en LS
function obtenerusuarios(){ fetch("http://127.0.0.1:5500/users.json")
    .then( res => res.json())
    .then( data => {
        users = data
        subirUsuariosLS()
        })
    } 

    function bajarUsuariosLS(){
        users = JSON.parse(localStorage.getItem("users")) || obtenerusuarios()
    }

//Comenzamos por defecto cargando a los usuarios en el sistema, siempre vamos a tener por defecto los del json en caso de usar por primera vez el programa
bajarUsuariosLS()


function subirUsuariosAlJson(){
    fetch("http://127.0.0.1:5500/users.json", {
        method: "PUT",
        body: JSON.stringify(users),
        headers: {
            'Content-type' : 'application/json; charset=UTF-8',
        }})
        .then((response)=> response.json())
        .catch( () => console.log("No tenemos permiso para actualizar el Json"))
}

//LOG IN



formRegistro.onsubmit = (event) => {
    event.preventDefault()
    divRegistro.style.display = "none"
    divContrasenia.style.display = "none"
}

formContrasenia.onsubmit = (event) => {
    event.preventDefault()
    divRegistro.style.display = "none"
    divContrasenia.style.display = "none"
}

botonRegistro.onclick = () => {
    divRegistro.style.display = "flex"
    divContrasenia.style.display = "none"

}

botonContrasenia.onclick = () => {
    divContrasenia.style.display = "flex"
    divRegistro.style.display = "none"

}

//INICIO DE SESION

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

function logIn() {
    let usuarioIngresado = users.find(userU => userU.username === usuario.value)

    if (usuarioIngresado == undefined) {
        errorUsuario() 
        
    } else if (usuarioIngresado.password !== contrasenia.value) {
        errorUsuario()

    } else {
        okUsuario()
    }
}

formIngreso.onsubmit = (event) => {
    event.preventDefault()
    divRegistro.style.display = "none"
    divContrasenia.style.display = "none"
    logIn()
}

//REGISTRO


class NewUser {
    constructor(email, username, password, dni) {
        this.email = email,
        this.username = username,
        this.password = password,
        this.dni = dni
    }
}

function register() {
    const nuevoUsuario = new NewUser(nuevoEmail.value, nuevoUser.value, nuevaContrasenia.value, nuevoDNI.value)
    users.push(nuevoUsuario)
}

formRegistro.onsubmit = (e) => {
    e.preventDefault()
        let mailExiste = users.some((userA) => userA.email === nuevoEmail.value)
        let usernameExiste = users.some((userA) => userA.username === nuevoUser.value)

        function nuevoUsuario() {
            const newUser = new NewUser(nuevoEmail.value, nuevoUser.value, nuevaContrasenia.value, nuevoDNI.value)
            users.push(newUser)
            subirUsuariosLS()
            subirUsuariosAlJson()
        }

        (mailExiste || usernameExiste) ? swal("Cuenta existente!", "El mail o el usuario ingresados ya corresponden a un usuario en el sistema, por favor volver a intentarlo", "error") : nuevoUsuario()
    }




//CAMBIAR CONTRASEÑA

//APLICACION DE PADRONES

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