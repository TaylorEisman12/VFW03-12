// Taylor Eisman
// VFW 03/12
// Project 2

window.addEventListener("DOMContentLoaded", function(){

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
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio(){
		var radios = document.form[0].payBy;
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
			payByValue = radios[i].value;
			}
		}
	}
	
	
	
	function storeData(){
		var id			= Math.floor(Math.random()*100000001);
		
		var item				= ();
			item.category			= ["Category: ", $('category').value];
			item.compName			= ["Company Name: ", $('compName').value];
			item.compEmail			= ["Company Email: ", $('compEmail').value];
			item.compWeb			= ["Company Website: ", $('compWeb').value];
			item.payBy				= ["Pay By: ", payByValue];
			item.pastDue			= ["Past Due: ", pastDueValue];
			item.budgetPercent		= ["Percent of Budget: ", $('budgetPercent').value];
			item.date				= ["Date Added: ", $('date').value];
			item.notes				= ["Notes: ", $('notes').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bill Saved.");
	
	}
	
	var categories = ["-- Category --", "Cell Phone", "Car", "Rent", "Cable"],
		payByValue;
	
	makeCats();
	
	var displayLink = $('displayLink');	
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);

});
