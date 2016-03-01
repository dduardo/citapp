/**
 * Created by DuardoSantiago on 25/02/16.
 */
app.controller('eventosListarController', ['eventosList', '$scope', 'EventosServices', 'toastr', '$state', function(eventosList, $scope, EventosServices, toastr, $state) {

    //$scope.listEventos = function () {
    //    return eventosList.eventos;
    //}

    $scope.listEventos = eventosList.eventos;

    $scope.deleteEventos = function(id) {
        EventosServices.deleteEventos(id)
            .then(function (response) {
                toastr.success('Evento deleteado com sucesso!', 'Eventos', {
                    closeButton: true,
                    onShown: function () {
                        EventosServices.getEventos().then(function (response) {
                            $scope.listEventos = response.eventos;
                        }).catch(function (error) {
                            toastr.error('Erro ao listar Evento', 'Eventos', {closeButton: true});
                        });
                    }
                });
            }).catch(function (error) {
            toastr.error('Erro ao listar Evento', 'Eventos', {closeButton: true});
        });
    };

    $scope.editarEvento = function(evento) {
        EventosServices.setEventoEdit(evento);
        $state.go('eventos.editar');
    };

    //$scope.eventos = eventosList;
    //console.log($scope.eventos);
}]);