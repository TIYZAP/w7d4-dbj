$.getJSON('https://damp-depths-50705.herokuapp.com/api/notes/')
.then(function(r){
  return r.notes.forEach(function(note){
    var display = note_template(note)
    $('#notes').prepend(display)
  })
})


$('#note').on('submit', function(ev){
  ev.preventDefault()
  $.post('https://damp-depths-50705.herokuapp.com/api/notes/',
  $(this).serialize())
  .then(function(r){
    var display = note_template(r.note)
    $('#notes').prepend(display)
    clear_form('#note')
    })
  }) 


$('#notes').on('click', '.tag', function(ev){
  ev.preventDefault()
  $('#notes').html('')
  $.getJSON('https://damp-depths-50705.herokuapp.com/api/notes/tag/' +
  encodeURIComponent($(this).html()))
  .then(function(r){
    $('#header').html('')
    $('#header').append('Notemeister 5000:' + r.tag.name)
    r.tag.notes.forEach(function(note){
      var display = note_template(note)
      $('#notes').prepend(display)

    })
  })
})

$(document).ready(function(){
  if(window.location.hash.match(/#\d+/).length > 0) {
    id = window.location.hash.substring(1)
    $.getJSON('https://damp-depths-50705.herokuapp.com/api/notes/' + id)
    .then(function(r){
      console.log(r.note)
      var display = modal_template(r.note)
      $('#note_modal').append(display)
      $('#note_show').modal('show')
    })
  }
})

var modal_source = $("#modal-template").html();
var modal_template = Handlebars.compile(modal_source);

var notes_source = $("#note_template").html();
var note_template = Handlebars.compile(notes_source)

function clear_form(selector){
  $(selector)[0].reset()
}
