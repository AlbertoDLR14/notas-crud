const nota = document.querySelector(".crear");
const miNotaOculta = document.querySelector(".miNota");

//h2 del formulario
let notaTitulo = document.querySelector("#notaTitulo");
//Texto del formulario
let notaTexto = document.querySelector("#notaTexto");
//boton para crear el formulario
const botonCrear = document.querySelector("#notaCrear")
//mostrar notas
let mostrarNotas = document.querySelector("#mostrarNotas");

let arrayNotas = [];

const abrirNota = document.querySelector("#todaNota");
const cerrarNota = document.querySelector("#cerrarNota");
let tituloEditar = document.querySelector("#tituloEditar");
let textoEditar = document.querySelector("#textoEditar");
const guardarTexto = document.querySelector("#guardarNota")

//Mostrar y ocultar "Aádir nota"
document.addEventListener("click", function(e){
    if(!nota.contains(e.target)){
        $(".miNota").slideUp(200);
        notaTitulo.value = "";
        notaTexto.value = "";

    }else{
        $(".miNota").slideDown(200);
    }
});

cerrarNota.addEventListener("click", function(){
    abrirNota.style.display = "none";
})
//=================================================================
//Funciones

const crearItem = (titulo, texto) =>{
    let item = {
        titulo: titulo,
        texto: texto
    }
    arrayNotas.push(item);
}

const guardarNota = () => {
    localStorage.setItem("misNotas", JSON.stringify(arrayNotas));
    leerNotas();
}

const leerNotas = () => {
    mostrarNotas.innerHTML = '';
    arrayNotas = JSON.parse(localStorage.getItem("misNotas"));
    if(arrayNotas === null){
        arrayNotas = [];
    }else{
        arrayNotas.forEach(element => {
            mostrarNotas.innerHTML += `
                <div class="mostrarNotas_miNota">
                    <h2 class="miNota_titulo">${element.titulo}</h2>
                    <p class="miNota_texto">${element.texto}</p>
                    <div class="borrarNota">
                        <span class="material-icons iconoBorrar ocultarIcono">edit</span>
                        <span class="material-icons iconoBorrar ocultarIcono">delete</span>
                    </div>
                </div>
            `;
        });
    }
}

const eliminarNotas = (tituloE, textoE) => {
    let miIndex;
    arrayNotas.forEach((elemento, index) => {
        if(elemento.titulo === tituloE && elemento.texto === textoE){
            miIndex = index;
        }
    })
    arrayNotas.splice(miIndex, 1);
    guardarNota();
    leerNotas();
}

const editarNotas = (tituloEdit, textoEdit) => {
    let miIndex;
    arrayNotas.forEach((elemento, index) => {
        if(elemento.titulo === tituloEdit && elemento.texto === textoEdit){
            miIndex = index;
        }
    })
    abrirNota.style.display = "flex";
    tituloEditar.value = arrayNotas[miIndex].titulo;
    textoEditar.value = arrayNotas[miIndex].texto;

    guardarTexto.addEventListener("click", function(){
        arrayNotas[miIndex].titulo = tituloEditar.value;
        arrayNotas[miIndex].texto = textoEditar.value;
        guardarNota();
        leerNotas();
        abrirNota.style.display = "none";
    })
}

//============================================================
//Eventos

botonCrear.addEventListener("click", (e) => {
    e.preventDefault();
    crearItem(notaTitulo.value, notaTexto.value);
    guardarNota();

    notaTitulo.value = "";
    notaTexto.value = "";
})


document.addEventListener('DOMContentLoaded', leerNotas)

mostrarNotas.addEventListener("click", (e) => {
    e.preventDefault();

    if(e.target.classList.contains('material-icons') && e.target.innerHTML === 'delete'){
        const tituloEliminar = e.target.parentElement.parentElement.childNodes[1].innerHTML;
        const textoEliminar = e.target.parentElement.parentElement.childNodes[3].innerHTML;
        eliminarNotas(tituloEliminar, textoEliminar);
    }
    if(e.target.classList.contains('material-icons') && e.target.innerHTML === 'edit'){
        const tituloEditar = e.target.parentElement.parentElement.childNodes[1].innerHTML;
        const textoEditar = e.target.parentElement.parentElement.childNodes[3].innerHTML;
        editarNotas(tituloEditar, textoEditar);
    }
});