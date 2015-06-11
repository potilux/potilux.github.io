/*
$(document).ready(function() {
	$("#sendEmail").click(function() {
		console.log("Clicou!");
		$.get("http://45.55.212.54/messages/sendmessage.php", { text:"tibuurcio@gmail.com" }, 
			function(data, status, xhr) {
				console.log(data);
				console.log(status);
				console.log(xhr);
			});
	});
});
*/

function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if("withCredentials" in xhr) {
		// Check if the XMLHttpRequest object has a "withCredentials" property.
    	// "withCredentials" only exists on XMLHTTPRequest2 objects.
    	xhr.open(method, url, true);
	}
	else if(typeof XDomainRequest != "undefined") {
		// Otherwise, check if XDomainRequest.
	    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
	    xhr = new XDomainRequest();
	    xhr.open(method, url);
	}
	else {
		// Otherwise, CORS is not supported by the browser.
    	xhr = null;
	}
	return xhr;
}

document.getElementById("sendEmail").onclick = function() {
	console.log("Clicou!");
	var xhr = createCORSRequest('GET', 'http://45.55.212.54/messages/sendmessage.php?text=tibuurcio@gmail.com');
	if(!xhr) {
		throw new Error('CORS not supported');
	}

	xhr.onload = function() {
		var responseText = xhr.responseText;
		console.log(responseText);
	}

	xhr.onerror = function() {
		console.log('There was an error!');
	}

	xhr.withCredentials = true;

	xhr.send();
}
