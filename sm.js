shelfmap.primo = (function () {

function getElement(scope) {
    return scope.$element;
};

function getValidDelcategory(scope, dc) {
		var delcats = scope;		
		var numdelcats = delcats.length;						
		for (i = 0; i < numdelcats; i++) {			
			if (delcats[i].match(dc)) {				
				this.availableindex = i;
				break;
			}
		}        
	    return this.availableindex;
}

function getSysNumber(scope) {
	    var sn = scope.match(/[0-9]+/)
		return sn[0]
}

function getSourceSys(scope, ss) {
	    var syssource = scope.match(ss);
		return syssource[0]
		
}

function checkValidSubLocation(displayablesublocs, subloc, custcode) {
	        var sublocrep = custcode + "_";
	        // remove custcode prefix added by Primo pipe
	        subloc = subloc.replace(sublocrep, "");
		for (var i = 0; i < displayablesublocs.length; i++)
		{
				if (subloc == displayablesublocs[i])
				{
					return "MapMe_container";
					continue;
				}	
		}				
	        return "MapMe_container_hide";
	
}

function getprimovid() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    // replace any : with - due to bug which means these differ in the url from the local folder name
    var vid = vars['vid'].replace(":","-");
    return vid;

}

function primoResult($scope) {	
    var scope = $scope.$parent.$ctrl;
  	/* hide all by default and then open up if appropriate */
	this.MapMe_showhide = "MapMe_container_hide";
   
    try {	
        this.availableindex = getValidDelcategory(scope.result.pnx.delivery.delcategory, shelfmap.DelCategory)    	
        } catch(e) {
        this.availableindex = "";
    }
	try {        
	    this.sysNumber = getSysNumber(scope.result.pnx.control.sourcerecordid[this.availableindex])	
        } catch(e) {
        this.sysNumber = "";
    }
  	try {
        this.SourceSys = getSourceSys(scope.result.pnx.control.sourcesystem[this.availableindex], shelfmap.SourceSystem);		
        } catch(e) {
		this.SourceSys = "";
    }
  	try {
		this.sublocation = scope.result.delivery.bestlocation.subLocation;
		} catch(e) {
		this.sublocation = "";
	}	
	
	if (this.SourceSys == shelfmap.SourceSystem && 		
		typeof this.availableindex == 'number')
	{
        this.MapMe_showhide = checkValidSubLocation(shelfmap.sublocstodisplay, this.sublocation, shelfmap.SMcustcode)		 
	}
	else
	{
		this.MapMe_showhide = "MapMe_container_hide"
	}
	primovid = getprimovid();
	
  // create some defaults if they are undefined by specific customers
  if(typeof shelfmap.SMtitle == 'undefined') {
    shelfmap.SMtitle = "Show location on ShelfMap."
  }
  if(typeof shelfmap.SMlogo == 'undefined') {
    shelfmap.SMlogo = "sm_logo.png"
  }
	  
  var SMtemplate=`<span class='${this.MapMe_showhide}'><a href='https://app.shelfmap.co.uk/${shelfmap.SMsyspath}/fp.php?icode=${shelfmap.SMcustcode}&id=${this.sysNumber}' target='_blank' class='MapMe_anchor' title='${shelfmap.SMtitle}'><img src='custom/${primovid}/img/${shelfmap.SMlogo}' alt=' ShelfMap icon ' /></a></span>`
  var PMelement = scope.$element;
  PMelement.append(SMtemplate);  
}

return {
    primoResult: primoResult,
	getElement: getElement,
};
}());


	



	 
