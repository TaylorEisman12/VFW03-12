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
			makeSelect.setAttribute("id", "categories");
			
		for(var i=0, j=billCategories.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = billCategories[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	function getSelectedRadio(){
		var radios = document.forms[0].payBy;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			payByValue = radios[i].value;
			}
		}
	}
	
	function getCheckboxValue(){
		if($('pastDue').checked){
			pastDueValue = $('pastDue').value;
		}else{
			pastDueValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on";
				$('billDetails').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				
				break;
			case "off";
				$('billDetails').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(){
		var id			= Math.floor(Math.random()*100000001);
		
		getSelecetedRadio();
		getCheckboxValue();
		
		var item					= {};
			item.category			= ["Category: ", $('categories').value];
			item.compName			= ["Company Name: ", $('compName').value];
			item.compEmail			= ["Company Email: ", $('compEmail').value];
			item.compWeb			= ["Company Website: ", $('compWeb').value];
			item.payBy				= ["Pay By: ", payByValue];
			item.pastDue			= ["Past Due: ", pastDueValue];
			item.budgetPercent		= ["Percent of Budget: ", $('budgetPercent').value];
			item.date				= ["Date Added: ", $('date').value];
			item.notes				= ["Notes: ", $('notes').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Bill Saved!");
	
	}
	
	function getData(){
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').stlye.display = "display";
		for(var i=0, len=localStoarge.length; i<len;i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	
	var billCategories = ["-- Category --", "Cell Phone", "Car", "Rent", "Cable"],
		payByValue,
		pastDueValue = "No";
	
	makeCats();
	
	var displayLink = $('displayLink');	
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);

});
