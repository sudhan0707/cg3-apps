'use strict';

angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular.element(document).ready(function () {
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
