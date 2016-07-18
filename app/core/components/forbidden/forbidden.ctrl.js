'use strict';

angular
    .module('portal')
    .controller('ForbiddenCtrl',forbiddenCtrl);

    function forbiddenCtrl(layout){

        var vm = this;

        // Stick footer to bottom of screen
        layout.stickyFooter(460);

    }
