'use strict';

angular
    .module('portal')
    .controller('ManageTechsCtrl', manageTechsCtrl);

    function manageTechsCtrl(manageTechs){


        var vm = this;
        
        load();

        function load(){
            getTechs();
        }

        function getTechs(){
            
            manageTechs.getTechs()
            .then(function(res){
                vm.techs = res.data;
                console.log(res.data);
            }, function(err){
                
            })

        }
        
    }
