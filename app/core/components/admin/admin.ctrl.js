'use strict';

angular
    .module('portal')
    .controller('AdminCtrl', adminCtrl);

    function adminCtrl(layout){
        
        
        
        var vm = this;
        
        vm.selectTab = selectTab;
        
        load();
        
        function selectTab(tab){
            vm.active = tab;
        }

        function load(){
            stickyFooter();
        }

        function stickyFooter(){
            // Stick footer to bottom of screen
            layout.stickyFooter(411);
        }
        
    }