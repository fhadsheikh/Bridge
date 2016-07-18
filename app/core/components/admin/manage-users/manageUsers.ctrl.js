'use strict';

angular
    .module('portal')
    .controller('ManageUsersCtrl', manageUsersCtrl);

    function manageUsersCtrl(user, manageUsers){

        var vm = this;

        vm.deleteUser = deleteUser;

        load();

        function load(){
            getUsers();
        }

        function deleteUser(pid){
            user.deleteUser(pid)
            .then(function(res){
                console.log(res);
            })
        }

        function getUsers(){

            manageUsers.getUsers()
            .then(function(res){
                vm.users = res;
                console.log(res);
            });

        }

    }
