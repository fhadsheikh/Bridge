'use strict';

angular
    .module('portal')
    .controller('LoginCtrl', loginCtrl)

    function loginCtrl(layout,authSrv, user, SweetAlert){

    var vm = this;

    vm.logIn = logIn;
    vm.signup = signup;
    vm.startSignUp = startSignUp;
    vm.busy = false;

    load();

    function load(){
        height();
        stickyFooter();
    }

    function height(){
        vm.height = $(window).height();

        $(window).resize(function(){
            vm.height = $(window).height();
        })
    }

    function stickyFooter(){
        // Stick footer to bottom of screen
        layout.stickyFooter(544);
    }

    function logIn(userForm){

       

        // If field is prestine upon submission, make it invalid and inpristine
        layout.validateEmptyFields([userForm.username, userForm.password]);

        // Only continue with log in if form is valid (fields are filled out)
        if(userForm.$valid){

             vm.busy = true;

            // Log them in
            authSrv.login(vm.credentials.username, vm.credentials.password)
            .catch(function(err){

                // check if log in failed because they're not registered
                if(err.data == 'User not registered'){

                    //Display message to client
                    vm.message = 'First time logging in?';

                    //Erase all previous alerts
                    vm.alert = null;

                    //Toggle sign up form since they're not registered already
                    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");

                    vm.busy = false;

                } else {

                    // Display error message returned from API
                    vm.alert = err.data;

                    vm.busy = false;
                    

                };
            })
        }
    };
        
    function startSignUp(){
        
         //Toggle sign up form since they're not registered already
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        
        $('#firstname').focus();
        
    }

    function signup(){

        // Sign up user
        user.signUp(
            vm.firstname,
            vm.lastname,
            vm.email,
            vm.password,
            vm.jobtitle,
            vm.department,
            vm.institution
        ).then(function(res){

            SweetAlert.swal('Account Created!', 'You will receive an email once your account has been verified', 'success');

        });
    };

}
