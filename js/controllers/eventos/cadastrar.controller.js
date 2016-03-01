/**
 * Created by DuardoSantiago on 29/02/16.
 */
    app.controller('EventosCadastrarController', ['$scope', 'EventosServices', 'toastr','$state', '$rootScope', function($scope, EventosServices, toastr, $state, $rootScope) {

        var editEventoObj = EventosServices.getEventoEdit();

        if(editEventoObj === undefined || editEventoObj === null) {
            $scope.evento = {};
            $scope.edit = false;

        }else {
            $scope.evento = editEventoObj;
            $scope.edit = true;
        }

        $scope.cadastrarEventos = function(evento) {
            EventosServices.cadastrarEventos(evento)
                .then(function(response){
                    toastr.success('Evento salvo com sucesso!', 'Eventos', {
                        closeButton: true,
                        onShown: function () {
                            $state.go('eventos.listar')
                            .catch(function (error) {
                                toastr.error('Erro ao listar Eventos', 'Eventos', {closeButton: true});
                            });
                        }
                    });
                }).catch(function(error){
                toastr.error('Erro ao salvar Evento', 'Eventos', {closeButton: true});
            });
        };

        $scope.editarEventos = function(evento) {
            EventosServices.editarEventos(evento)
                .then(function(response){
                    toastr.success('Evento editado com sucesso!', 'Eventos', {
                        closeButton: true,
                        onShown: function () {
                            $state.go('eventos.listar')
                                .catch(function (error) {
                                    toastr.error('Erro ao listar Eventos', 'Eventos', {closeButton: true});
                                });
                        }
                    });
                }).catch(function(error){
                toastr.error('Erro ao editar Evento', 'Eventos', {closeButton: true});
            });
        };


        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
           if(fromState.name === 'eventos.editar') {
               if(EventosServices.getEventoEdit() !== null) {
                   EventosServices.clear();
               }
           }
        });



}]);

