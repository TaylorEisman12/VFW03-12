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
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no Local Storage.");
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "display";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Bill";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Bill";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		toggleControls("off");
		
		$('category').value = item.category[1];
		$('compName').value = item.compName[1];
		$('compEmail').value = item.compEmail[1];
		$('compWeb').value = item.compWeb[1];
		var radios = document.forms[0].payBy;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Internet" && item.payBy[1] == "Internet"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Mail" && item.payBy[1] == "Mail"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.pastDue[1] == "Yes"){
			$('pastDue').setAttribute("checked", "checked");
		}
		$('budgetPercent').value = item.budgetPercent[1];
		$('date').value = item.date[1];
		$('notes').value = item.notes[1];
		
		save.removeEventListener("click", storeData);
		$('submit').value = "Edit Bill";
		var editSubmit = $('submit');
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("No data to clear.");
		}else{
			localStorage.clear();
			alert("All Bills are deleted");
			window.location.reload();
			return false;
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
