/**
 * Los objetivos son:
 * 1. Agregar elementos en una tabla
 * 2. Validar la información de los campos
 * 3. Crear un precio por producto al azar
 * 4.Realizar las operaciones para conocer el total de elementos
 * 5. Realizar las operaciones para conocer el total en costo
 * 6. Almacenar la información en el almacenamiento local del navegador
 * 7.Mostrar la información almacenada cuando se abra la página
 */

const btnAgregar = document.getElementById('btnAgregar');
const txtNombre = document.getElementById('Name');
const txtNumber = document.getElementById('Number');
const alertValidaciones = document.getElementById('alertValidaciones');
const alertValidacionesTexto = document.getElementById('alertValidacionesTexto');

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



btnAgregar.addEventListener('click', function(event){
    event.preventDefault();
    txtNombre.style.border='';
    txtNumber.style.border='';
    alertValidacionesTexto.innerHTML='';
    alertValidaciones.style.display='none';

//Validar el nombre del producto
    if (txtNombre.value.trim().length<3) {
        txtNombre.style.border='solid red medium';
        alertValidacionesTexto.innerHTML='El <strong>Nombre</strong> es invalido aiuraaa. <br/>'
        alertValidaciones.style.display='block'
    }
//Validar cantidad
    if(! validarCantidad()){
        txtNumber.style.border='solid red medium';
        alertValidacionesTexto.innerHTML+='La <strong>Cantidad</strong> es invalida kheee. <br/>'
        alertValidaciones.style.display='block'
    }//Validar cantidad

}); //btnAgregar. addEventListener


//Evento blur es cuando un campo pierde el foco (focus), se sale del campo 
txtNombre.addEventListener('blur',function(event){
    txtNombre.value = txtNombre.value.trim();
});//Sirve para quitar los espacios y que se valide bien el valor del nombre
txtNumber.addEventListener('blur',function(event){
    txtNumber.value = txtNumber.value.trim();
});



