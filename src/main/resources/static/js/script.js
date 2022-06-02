$(document).ready(function () {
    listar();
});

function listar() {
    $.ajax({
        url: "/bib/all",
        type: 'GET',
        success: function (x) {
            $("#tablita tbody tr").remove();
            for (var i = 0; i < x.length; i++) {
                $("#tablita").append(
                        "<tr><td>" + (i + 1) + "</td><td>" + x[i].id + "</td><td>" + x[i].nombres+ "</td><td>" + x[i].apellidos
                        + "</td><td>" + x[i].dni + "</td><td><a href='#' onclick='editar("
                        + x[i].id + ")'><i class='fa-solid fa-pen-to-square yelow'></i></a></td><td><a href='#' onclick='eliminar(" + x[i].id + ")'><i class='fa-solid fa-trash-can red'></i></a></td></tr>");
            }
        }
    });
}

function editar(id) {
    $.ajax({
        url: "/bib/" + id,
        type: 'GET',
        success: function (w) {
            $("#editar_titulo").val(w.nombres);
            $("#editar_descripcion").val(w.apellidos);
            $("#editar_dni").val(w.dni);
            $("#idpost").val(w.id);
        }
    });
    $("#modalEditar").modal('show');
}

function eliminar(id) {

    bootbox.confirm({
        message: "Realmente desea Eliminar?",
        buttons: {
            confirm: {
                label: 'SI',
                className: 'btn-success'
            },
            cancel: {
                label: 'NO',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/bib/" + id,
                    type: 'DELETE',
                    success: function (w) {
                        bootbox.alert({
                            message: "Registro eliminado correctamente...!",
                            callback: function () {
                                console.log('This was logged in the callback!');
                            }
                        });
                        listar();
                    }
                });
            } else {
                bootbox.alert({
                    message: "Registro no eliminado!",
                    size: 'small'
                });
            }
        }
    });
}

$("#guardar").click(function () {
    var titulo = $("#titulo").val();
    var desc = $("#descripcion").val();
    var dni= $("#dni").val();
    $.ajax({
        url: "/bib/add",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({'nombres': titulo, 'apellidos': desc, 'dni': dni}),
        cache: false,
        success: function (w) {
            bootbox.alert({
                message: "Registro guardado correctamente...!",
                
                callback: function () {
                    console.log('This was logged in the callback!');
                }
            });
           listar();   
        }
    });
    $("#modalGuardar").modal('hide');
});

$("#modificar").click(function () {
    var titulo = $("#editar_titulo").val();
    var desc = $("#editar_descripcion").val();
    var dn = $("#editar_dni").val();
    var id = $("#idpost").val();
    alert("id"+ id );
    bootbox.confirm({
        message: "Realmente desea Modificar?",
        buttons: {
            confirm: {
                label: 'SI',
                className: 'btn-success'
            },
            cancel: {
                label: 'NO',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "/bib/edit",
                    type: 'PUT',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({'id': id, 'nombres': titulo, 'apellidos': desc, 'dni': dn}),
                    cache: false,
                    success: function (w) {
                        bootbox.alert({
                            message: "Registro Modificado correctamente...!",
                            callback: function () {
                                console.log('This was logged in the callback!');
                            }
                        });
                        listar();
                    }
                });
                $("#modalEditar").modal('hide');
            } else {
                bootbox.alert({
                    message: "Registro no Modificado!",
                    size: 'small'
                });
            }
        }
    });
});