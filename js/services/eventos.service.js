/**
 * Created by DuardoSantiago on 25/02/16.
 */
/*persistência de informação, codigo que se usa se em outros lugares*/

//$q = criar promisses *procurar sobre*/

app.service('EventosServices', ['$q','$http',
    function($q, $http){
        'use scrict';

        var eventos = {};
        var editEvento = null;

        eventos.getEventos = function(){
          var deffered = $q.defer();

            $http.get('http://endpoint.amoremcartas.com.br/list/')
                .success(function(data, config, headers, status){
                    deffered.resolve(data);
                }).error(function(data,config, headers, status){
                    deffered.reject(data);
            });
            return deffered.promise;
        };

        eventos.deleteEventos = function(id) {
          var deffered = $q.defer();

            $http.post('http://endpoint.amoremcartas.com.br/delete/',JSON.stringify(id))
                .success(function(data, config, headers, status){
                    deffered.resolve(data);
                }).error(function(data,config, headers, status){
                deffered.reject(data);
            });
            return deffered.promise;
        };

        eventos.cadastrarEventos = function(evento) {
            var deffered = $q.defer();

            $http.post('http://endpoint.amoremcartas.com.br/insert/',JSON.stringify(evento))
                .success(function(data, config, headers, status){
                    deffered.resolve(data);
                }).error(function(data,config, headers, status){
                deffered.reject(data);
            });
            return deffered.promise;
        };

        eventos.editarEventos = function(evento) {
            var deffered = $q.defer();

            $http.post('http://endpoint.amoremcartas.com.br/update/',JSON.stringify(evento))
                .success(function(data, config, headers, status){
                    deffered.resolve(data);
                }).error(function(data,config, headers, status){
                deffered.reject(data);
            });
            return deffered.promise;
        };


        //para pegar os valores
        eventos.setEventoEdit = function(evento){
            editEvento = evento;
        };

        eventos.getEventoEdit = function () {
            return editEvento;
        };

        eventos.clear = function() {
            editEvento = null;
            return editEvento;
        };

        //fazer uma func que valida email que retorna true ou false
        eventos.isValidEmail = function(email) {
            if(email === null || email === undefined) {
                return false;
            }else {
                var ed = email.split('@');
                if(ed.pop() === 'ciandt.com'){
                    return true;
                }else {
                    return false;
                }
            }
        };

    return eventos;
    }
]);