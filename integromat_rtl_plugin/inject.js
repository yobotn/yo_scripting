// this is the code which will be injected into a given page...

function rtl() {
	//for testing
	//console.log('executed rtl');
	
	let text_fields = document.querySelectorAll(".i-coder-root.form-control");
	for (var x = 0; x < text_fields.length; x++){
		text_fields[x].setAttribute('style',"direction: rtl; text-align: right;");
	}
	
	let dropdowns = document.querySelectorAll(".form-control.custom-select");
	for (var x = 0; x < dropdowns.length; x++){
		dropdowns[x].setAttribute('dir',"rtl");
	}
	return false;
}


window.addEventListener('DOMNodeInserted',rtl);
		

