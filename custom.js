(function () {
    "use strict";
    'use strict';

    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

/* Begin ShelfMap Integration */	
  // array of sub-locations for which ShelfMap link should be displayed
  var sublocs = ["XXX","YYY"];
  
  window.shelfmap={
	  sublocstodisplay: sublocs,
	  SourceSystem: "",
	  SMsyspath: "fp",
	  SMcustcode: "44XXX",
	  DelCategory: "",
  };
  
  shelfmap.script = document.createElement("script");
  shelfmap.script.src = "https://cdn.jsdelivr.net/gh/shelfmap/primo@master/sm.js";
  document.head.appendChild(shelfmap.script);
/* End ShelfMap Integration */	  

app.controller('prmSearchResultAvailabilityLineAfterController', function($scope){    
     window.shelfmap.primo.primoResult($scope);	
});

app.controller('prmOpacAfterController', [function($scope){
	window.shelfmap.primo.primoResult($scope);	
}]);

app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
});	

})();

   
	



	 
