
function Libro(titulo, autor, isbn, generos){
  this.titulo = titulo;
  this.autor = autor;
  this.isbn = isbn;
  this.generos = generos;
}

var libros = [];

$(document).ready(function(){

$("")

  //Seleccionador de la lista de disponibles

  $("#listaDisponibles").on('click', 'p', function(){
    for (var i = 0; i < libros.length; i++) {
      if ($(this).html() == libros[i].titulo) {
        var seleccion = libros[i];
        var formConsulta = document.getElementById('consulta');
        if (formConsulta.elements[0].value == seleccion.titulo) {
          alert('Has seleccionado el mismo');
        }else {
          $(this).removeClass('creado'); //esto hay que quitar luego
          $(this).addClass('seleccionado');
          formConsulta.elements[0].value = seleccion.titulo;
          formConsulta.elements[1].value = seleccion.autor;
          formConsulta.elements[2].value = seleccion.isbn;
          $('#listaGeneros').html('');
          for (var i = 0; i < seleccion.generos.length; i++) {
            $('#listaGeneros').append('<p>'+seleccion.generos[i]+'</p>');
          }
        }
      }
    }
  })

  //Seleccionador de la lista de prestados

  $("#listaPrestamos").on('click', 'p', function(){
    for (var i = 0; i < libros.length; i++) {
      if ($(this).html() == libros[i].titulo) {
        var seleccion = libros[i];
        var formConsulta = document.getElementById('consulta');
        if (formConsulta.elements[0].value == seleccion.titulo) {
          alert('Has selecionado el mismo');
        }else {
          $(this).removeClass('devuelto');
          $(this).addClass('seleccionado');
          formConsulta.elements[0].value = seleccion.titulo;
          formConsulta.elements[1].value = seleccion.autor;
          formConsulta.elements[2].value = seleccion.isbn;
          $('#listaGeneros').html('');
          for (var i = 0; i < seleccion.generos.length; i++) {
            $('#listaGeneros').append('<p>'+seleccion.generos[i]+'</p>');
          }
        }
      }
    }
  });

  //botones
  //Crear nuevo libro
  $('#crearBoton').click(function(){
    var formulario = document.getElementById('crear');
    var titulo = formulario.elements[0].value;
    var autor = formulario.elements[1].value;
    var isbn = formulario.elements[2].value;
    var generos = [];
    $('#checkbox input').each(function() {
      if ($(this).prop('checked')) {
        generos.push($(this).val());
      }
    });
    var nuevoLibro = new Libro(titulo,autor,isbn,generos);
    crearLibro(nuevoLibro);
  });

  //Prestar Libro
  $('#prestarBoton').click(function(){
    var prestamo = document.getElementById('consulta');
    var titulo = prestamo.elements[0].value;
    for (var i = 0; i < libros.length; i++) {
      if (titulo == libros[i].titulo) {
        prestarLibro(libros[i]);
      }
    }
  });

  //Devolver Libro
  $('#devolverBoton').click(function(){
    var prestamo = document.getElementById('consulta');
    var titulo = prestamo.elements[0].value;
    for (var i = 0; i < libros.length; i++) {
      if (titulo == libros[i].titulo) {
        devolverLibro(libros[i]);
      }
    }
  });

});

// Funciones

function crearLibro(nuevoLibro){
  var existe = false;
  $('#listaDisponibles p').each(function(){
    if ($(this).html() == nuevoLibro.titulo) {
      existe = true;
    }
    if ($(this).hasClass('creado')) {
      $(this).removeClass('creado');
    }
  });
  if (existe == true) {
    alert(nuevoLibro.titulo+' ya existe.');
  }else {
    $('#listaDisponibles').append('<p class="creado libro">'+ nuevoLibro.titulo +'</p>');
    libros.push(nuevoLibro);
  }
}

function prestarLibro(libro){
  var existe = false;
  $('.prestamos p').each(function(){
    if($(this).html() == libro.titulo){
      existe = true;
    }
  });
  if (existe) {
    alert('Este libro ya esta prestado Hulio');
  }else {
    $('.prestamos').append('<p class="prestado libro">'+ libro.titulo +'</p>');
    $("#listaDisponibles .seleccionado").remove();
    $("#consulta")[0].reset();
    var listado = document.getElementById("listaGeneros");
    while (listado.hasChildNodes()) {
      listado.removeChild(listado.lastChild);
    }
  }
}

function devolverLibro(libro){
  var existe = false;
  $('#listaDisponibles p').each(function(){
    if($(this).html() == libro.titulo){
      existe = true;
    }
  });
  if (existe) {
    alert('Este libro ya esta devuelto Hulio');
  }else {
    $('#listaDisponibles').append('<p class="devuelto libro">'+ libro.titulo +'</p>');
    $("#listaPrestamos .seleccionado").remove();
    $("#consulta")[0].reset();
    var listado = document.getElementById("listaGeneros");
    while (listado.hasChildNodes()) {
      listado.removeChild(listado.lastChild);
    }
  }
}

//Validacion

$(function() {
  $("form[name='crear']").validate({
    rules: {
      titulo: "required",
      autor: "required",
      isbn: {
        required: true,
        number: true
      },
      generos: "required",

    },
    messages: {
      titulo: "Inserta un titulo",
      autor: "Inserta un autor",
      isbn: {
        required: "Inserta un codigo ISBN",
        number: "Tiene que ser un numero"
      },
      generos: "Selecciona almenos un genero",
    },
    submitHandler: function(form) {
      form.submit();
    }
  });

  $("form[name='consulta']").validate({
    rules: {
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      email: "Introduce un email valido"
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});
