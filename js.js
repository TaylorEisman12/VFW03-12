// Taylor Eisman
// VFW 03/12
// Project 2

window.addEventListener("DOMContentLoaded", function({

  function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function makeCats(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "category");
			
		for (var i=0, j=categories.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = categories[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
		}
	}

	var category = ["-- Category --", "Cell Phone", "Car", "Rent", "Cable"];
		
	var displayLink = $('displayLink');	
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);

});