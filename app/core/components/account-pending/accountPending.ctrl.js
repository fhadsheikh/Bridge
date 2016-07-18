'use strict';

angular
    .module('portal')
    .controller('AccountPendingCtrl', accountPendingCtrl);

    function accountPendingCtrl(layout){
        
        // Stick footer to bottom of screen
        layout.stickyFooter(411);
    }