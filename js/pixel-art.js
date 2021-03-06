//Funciones a aplicar a futuro?:
// ?? Grosor de pincel (convertir grilla en matriz)
// ??? Cargar cualquier imagen y pixelizarla

$(document).ready(function(){
  // Generamos la paleta de colores
  var nombreColores = ['White', 'LightYellow',
    'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
    'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
    'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
    'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
    'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
    'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
    'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
    'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
    'LightGreen', 'PaleGreen', 'PaleTurquoise',
    'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
    'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
    'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
    'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
    'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
    'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
    'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
    'BlueViolet', 'DarkViolet', 'DarkOrchid',
    'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
    'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
  ];
  
  var $paleta = $('#paleta');
  
  function generarPaleta () {
    for (var i=0; i < nombreColores.length; i++) {
      var $color = $('<div>', {'class':'color-paleta'});
      $color.css('background-color', nombreColores[i]);
      $paleta.append($color);
    } 
  }
  generarPaleta();

  function cambiarColorFondo($colorDestino, colorOrigen) {
    $colorDestino.css('background-color', colorOrigen);
  }

  var $colorSeleccionado = $('#indicador-de-color');
  $('.color-paleta').click(function(){
    cambiarColorFondo($colorSeleccionado, $(this).css('background-color'));
  });
  
  // Generamos la grilla
  var $grilla = $('#grilla-pixeles');
  
  function generarGrilla () {
    for (var i=0; i < 1750; i++) {
      var $pixel = $('<div>',{'class':'pixel'});
      $grilla.append($pixel);
    }
  }
  generarGrilla();
  
  var $pixeles = $grilla.children();

  // Función para chequear que el indicador de color no este vacío
  function selectorNoVacio() {
    return $colorSeleccionado.css('background-color') !== 'rgba(0, 0, 0, 0)';
  }

  // Event listener para pintar un pixel de la grilla con el color seleccionado
  $pixeles.click(function(){
    if(selectorNoVacio()) {
      if(!gomaActiva && !goteroActivo && !baldeActivo) {
        cambiarColorFondo($(this), $colorSeleccionado.css('background-color'));
      }else if (gomaActiva){
        cambiarColorFondo($(this), 'white');
      }
    }
  });

  // Variable que guarda el estado del mouse
  var mouseApretado = false;
  // Funciones para pintar en movimiento
  $pixeles.mousedown(function() {
    mouseApretado = true;
    $('body').mouseup(function() {
      mouseApretado = false;
    });
    $pixeles.hover(function(){
      if(mouseApretado && selectorNoVacio()){
        if(!gomaActiva && !baldeActivo && !goteroActivo) {
          cambiarColorFondo($(this), $colorSeleccionado.css('background-color'));
        }else if(gomaActiva){
          cambiarColorFondo($(this), 'white');
        }
      }
    });
  });

  // Variable para guardar el elemento 'color-personalizado' que se elige con la rueda de color.
  var $colorPersonalizado = $('#color-personalizado');

  $colorPersonalizado.change(function(){
      // Se guarda el color de la rueda en colorActual
      $colorActual = $colorPersonalizado.val();
      // Completar para que cambie el indicador-de-color al colorActual
      cambiarColorFondo($colorSeleccionado, $colorActual);
  });

  // Botón 'Borrar todo'
  $('#borrar').click(function(){
    $pixeles.animate({'background-color':'white'}, 1000);
  });

  // Asigna la función cargarSuperheroes a cada imagen
  $('.imgs li img').click(function(){
    // La funcion eval recibe un string y lo transforma en código js
    cargarSuperheroe(eval(this.id));
  });

  // Botón 'Guardar'
  $('#guardar').click(guardarPixelArt);



  //Funciones especiales:
  //--------------------

  // Función para cambiar de cursor
  function cambiarCursor(claseCursor) {
    $('body').toggleClass(claseCursor);
    $grilla.toggleClass('cursor-personalizado');
  }

  // Herramienta goma 'Borrar'
  var gomaActiva = false;
  $('#goma-borrar').click(function(){
    if(!baldeActivo && !goteroActivo) {
      gomaActiva = !gomaActiva;
      cambiarCursor('cursor-borrar');
      $pixeles.click(function(){
        if(gomaActiva && selectorNoVacio()) {
          cambiarColorFondo($(this), 'white');
        }
      });
    }
  });

  // Herramienta 'Balde'
  var baldeActivo = false;
  $('#balde').click(function(){
    if(!gomaActiva && !goteroActivo) {
      baldeActivo = !baldeActivo;
      cambiarCursor('cursor-balde');
      $grilla.click(function(){
        if(selectorNoVacio()){
          if(baldeActivo){
            baldeActivo = false;
            cambiarColorFondo($pixeles,$colorSeleccionado.css('background-color'));
            cambiarCursor('cursor-balde');
          }
        }
      });
    }
  });

  // Herramienta 'Gotero'
  var goteroActivo = false;
  $('#gotero').click(function(){
    if(!gomaActiva && !baldeActivo) {
      goteroActivo = !goteroActivo;
      cambiarCursor('cursor-gotero');
      $pixeles.click(function(){
        if(goteroActivo){
          goteroActivo = false;
          cambiarColorFondo($colorSeleccionado,$(this).css('background-color'));
          cambiarCursor('cursor-gotero');
        }
      });
    }
  });

  // Herramienta 'Reemplazar color': 
  // Reemplaza todos los pixeles del color seleccionado por el color personalizado
  $('#reemplazar').click(function(){
    if(selectorNoVacio()){
      $pixeles.filter(function(){
        if ($(this).css('background-color') === $colorSeleccionado.css('background-color')) {
          $(this).animate({'background-color' : $colorPersonalizado.val()}, 1000);
        }
      });
    }
  });
});

