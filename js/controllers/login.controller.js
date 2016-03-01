/**
 * Created by DuardoSantiago on 25/02/16.
 */
app.controller('LoginController', ['$scope', '$cookies', '$state', function($scope, $cookies, $state ) {

    $scope.error= {
        message:null
    };

    $scope.isValid = function(email){
        if(email === null || email === undefined) {
            $scope.error.message = "Preencha o email";
        }else {
            var ed = email.split('@');
            if(ed.pop() === 'ciandt.com'){
                //validado o campo do formulario pelo angular
                $scope.form.login.$valid = true;
                $scope.error.message = null;
                $cookies.put('emailCit', email);
            }else {
                $scope.form.login.$setValidity('required', false);
                $scope.error.message = "Informe um email com dominio @ciandt.com"
            }
        }
    }

    $scope.salvar = function(form){
        if(form == null || form == undefined){
        return null;
        }else{
            if(form.password.length >= 6){
                $scope.loading = true;
                $cookies.put('emailCit', form.email);
                $state.go('eventos.listar');
            }else{
                $scope.error.message = "Sua senha deve conter no minimo 6 caracteres"
                $scope.loading = false;
            }
        }
    }
}
]);