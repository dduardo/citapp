/**
 * Created by DuardoSantiago on 25/02/16.
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise(
        function ($injector, $location, $rootScope) {
            var $state = $injector.get('$state');
            $state.go('login');
        });

    $stateProvider
        //login
        .state('login', {
            url: '/login',
            controller: 'LoginController',
            templateUrl: 'views/login.view.html'
        })
        //rotas
        .state('eventos', {
            url: '/eventos',
            templateUrl: 'views/eventos/index.view.html'
        })
        //Listar
        .state('eventos.listar', {
            url: '/listar',
            controller: 'eventosListarController',
            templateUrl: 'views/eventos/listar.view.html',
            //serve para carregar a pagina com um medodo inincial
            resolve: {
                eventosList: function (EventosServices) {
                    return EventosServices.getEventos();
                }
            }
        })
        //Cadastrar
        .state('eventos.editar', {
            url: '/cadastrar',
            controller: 'EventosCadastrarController',
            templateUrl: 'views/eventos/cadastrar.view.html',
            //serve para carregar a pagina com um medodo inincial
        })
        //Editar
        .state('eventos.cadastrar', {
            url: '/cadastrar',
            controller: 'EventosCadastrarController',
            templateUrl: 'views/eventos/cadastrar.view.html',
            //serve para carregar a pagina com um medodo inincial
        })
    }
    //tudo o que estiver aqui vai ser executado quando houver mudança na app
    //verifica se existe cookie na sessão
]).run(['$cookies', 'EventosServices', '$state', '$rootScope', function($cookies, EventosServices, $state, $rootScope) {
    //se for false retorna para log in
    //com rootScoop na appRoute

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        //event.preventDefault();
        //resgatar valor do cookie get+chave
        var email = $cookies.get('emailCit');
        var retorno = EventosServices.isValidEmail(email);
        //console.log(retorno);
        //console.log(email);
        if(!retorno) {
            console.log('Sem cookie');
            $state.go('login');
        }
    });
}]);