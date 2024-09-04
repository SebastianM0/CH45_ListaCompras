/**
 * Los objetivos son:
 * 1. [*]Agregar elementos en una tabla
 * 2. [*]Validar la información de los campos
 * 3. [*]Crear un precio por producto al azar
 * 4. [*]Realizar las operaciones para conocer el total de elementos
 * 5. [*]Realizar las operaciones para conocer el total en costo
 * 6. [ ]Almacenar la información en el almacenamiento local del navegador
 * 7. [ ]Mostrar la información almacenada cuando se abra la página
 */

const btnAgregar = document.getElementById('btnAgregar');
const btnLimpiar = document.getElementById('btnClear');
const txtNombre = document.getElementById('Name');
const txtNumber = document.getElementById('Number');
const alertValidaciones = document.getElementById('alertValidaciones');
const alertValidacionesTexto = document.getElementById('alertValidacionesTexto');
//meto toda la tabla en una constante
const tablaListaCompras = document.getElementById('tablaListaCompras')
//tomo solamente la parte del body de la tabla y en item(0) para el primer body por si tenemos varias, creo :(
const cuerpoTabla = tablaListaCompras.getElementsByTagName('tbody').item(0);
const contadorProductos = document.getElementById('contadorProductos');
const productosTotal = document.getElementById('productosTotal');
const precioTotal = document.getElementById('precioTotal');
const fecha = document.getElementById('fecha')

//Bandera, al ser true permite agregar los datos a la table 
let isValid = true;
let contador = 0;
let precio =0;
let costoTotal =0;
let productoCantidadTotal =0;

//Aqui guaradremos los datos de la tabla yippi
let datos = [];


function validarCantidad(){
    if(txtNumber.value.length == 0){
        return false ;
    }

    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN

    if(Number(txtNumber.value)<=0){
        return false;
    }
    return true;
}//Validar Cantidad

function getPrice (){
    return Math.round((Math.random()*10000))/100;
}//getPrice

// function getPrice (){
//     let price = Math.random()*100
//     price = price.toFixed(2)
//     price=Number(price)
//     console.log(typeof(price));
// }


btnAgregar.addEventListener('click', function(event){
    event.preventDefault();
    txtNombre.style.border='';
    txtNumber.style.border='';
    alertValidacionesTexto.innerHTML='';
    alertValidaciones.style.display='none';
    isValid = true

//Validar el nombre del producto
    if (txtNombre.value.trim().length<3) {
        txtNombre.style.border='solid red medium';
        alertValidacionesTexto.innerHTML='El <strong>Nombre</strong> es invalido aiuraaa. <br/>'
        alertValidaciones.style.display='block'
        isValid = false
    }
//Validar cantidad
    if(! validarCantidad()){
        txtNumber.style.border='solid red medium';
        alertValidacionesTexto.innerHTML+='La <strong>Cantidad</strong> es invalida kheee. <br/>'
        alertValidaciones.style.display='block'
        isValid= false
    }//Validar cantidad

    if(isValid){
        contador++;
        precio = getPrice();
        let row = `<tr>
                    <td>${contador}</td>
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>$${precio}</td>
                    <tr>`;


        let elemento = {'contador': contador, "nombre": txtNombre.value, 'cantidad': txtNumber.value, 'precio':precio};
        datos.push(elemento);
        localStorage.setItem('datos',JSON.stringify(datos));




        cuerpoTabla.insertAdjacentHTML('beforeend',row);
        //Se pone el += para que se vaya sumando cada vez 
        costoTotal += precio * Number(txtNumber.value)
        productoCantidadTotal += Number(txtNumber.value)
        contadorProductos.innerText = contador;
        productosTotal.innerText = productoCantidadTotal;
        precioTotal.innerText = `$${costoTotal.toFixed(2)}`;
        localStorage.setItem('contador', contador);
        localStorage.setItem('productoCantidadTotal',productoCantidadTotal);
        localStorage.setItem('costoTotal', costoTotal );



        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
    }//isValid
}); //btnAgregar. addEventListener

btnLimpiar.addEventListener('click', function(event){
    event.preventDefault();
    //Limpiar el valor de los campos
    txtNombre.value="";
    txtNumber.value="";
    // Limpiar el localStorage, borra todo lol 
    localStorage.clear();
    //Elimina por cada llave/clave un sólo elemento
        //localStorage.removeItem('llave')
    // Limpiar la tabla
    cuerpoTabla.innerText = "";
    // Reiniciar las variables, contador, costoTotal, totalEnProductos
    contador= 0;
    costoTotal= 0;
    productoCantidadTotal =0;
    // Asignar las variables a los divs
    contadorProductos.innerText = contador;
    productosTotal.innerText=productoCantidadTotal
    precioTotal.innerText = `$${costoTotal.toFixed(2)}`
    // Ocultar la alerta
    alertValidacionesTexto.innerHTML='';
    alertValidaciones.style.display='none';
    // Quitar los bordes 
    txtNombre.style.border='';
    txtNumber.style.border='';
    //Manda el foco al campo Nombre
    txtNombre.focus();
})


//Evento blur es cuando un campo pierde el foco (focus), se sale del campo 
txtNombre.addEventListener('blur',function(event){
    txtNombre.value = txtNombre.value.trim();
});//Sirve para quitar los espacios y que se valide bien el valor del nombre
txtNumber.addEventListener('blur',function(event){
    txtNumber.value = txtNumber.value.trim();
});

window.addEventListener('load',function(){
    if (this.localStorage.getItem('contador')!=null){
        contador = Number(this.localStorage.getItem('contador'))
    }//!null
    if (this.localStorage.getItem('productoCantidadTotal')!=null){
        productoCantidadTotal = Number(this.localStorage.getItem('productoCantidadTotal'))
    }//!null
    if(this.localStorage.getItem('costoTotal')!=null){
        costoTotal = Number(this.localStorage.getItem('costoTotal'))
    }//!null

    contadorProductos.innerText = contador;
    productosTotal.innerText=productoCantidadTotal
    precioTotal.innerText = `$${costoTotal.toFixed(2)}`

    if(this.localStorage.getItem('datos')!=null){
        datos = JSON.parse(this.localStorage.getItem('datos'))
    }//!null
    datos.forEach(r =>{
        let row =   `<tr>
                        <td>${r.contador}</td>
                        <td>${r.nombre}</td>
                        <td>${r.cantidad}</td>
                        <td>${r.precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML('beforeend',row)
    });
    let now = new Date();
    fecha.innerText = now.getFullYear();
})//window load

