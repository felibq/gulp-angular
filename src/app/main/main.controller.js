(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr) {
    var vm = this;
    vm.toastrHtml = 'this is a angular seed widthout test';
    toastr.success(vm.toastrHtml);
  }
})();
