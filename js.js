// Taylor Eisman
// VFW 03/12
// Project 2

window.addEventListener("DOMContentLoaded", function({

  function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	var category = ["-- Category --", "Cell Phone", "Car", "Rent", "Cable"];
		
	var displayLink = $('displayLink');	
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);

});