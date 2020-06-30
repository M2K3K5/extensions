/* kaukugel.js */
/*
 * Inhalt einer JSON-Datei über Ajax abrufen
 *
 */

window.onload = init;

function init() {
	holeZahlen();
}

//
// Diese Funktion verwendet XMLHttpRequest Level 1.
// Wenn Sie IE oder Opera bzw. eine wirklich alte Version von Safari, Firefox oder
// Chrome nutzen, können Sie sie statt der Level 2-Version (unten) verwenden.
//

function holeZahlen_XHRv1() {
	
	// Ändern Sie die URL so, dass sie auf den Ort verweist, an dem Sie
	// die Datei verkaufszahlen.json gespeichert haben.
	
	var url = "http://localhost/verkaufszahlen.json";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			aktualisiereZahlen(request.responseText);
		}
	};
	request.send(null);
}

//
// Mit XMLHttpRequest Level 2 (in neuen Versionen von Firefox, Safari
// und Chrome) können Sie den Fortschritt überprüfen und das "load"-Event mit dem
// onload-Handler anstatt von onreadystatechange ermitteln
//
function holeZahlen() {
	
	// Ändern Sie die URL so, dass sie auf den Ort verweist, an dem Sie
	// die Datei verkaufszahlen.json gespeichert haben.

	var url = "https://raw.githubusercontent.com/M2K3K5/extensions/gh-pages/verkaufszahlen.json";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function() {
		if (request.status == 200) {
			aktualisiereZahlen(request.responseText);
		}
	};
	request.send(null);
}

function aktualisiereZahlen(responseText) {
	var zahlenDiv = document.getElementById("verkauft");
	var verkauft = JSON.parse(responseText);
	for (var i = 0; i < verkauft.length; i++) {
		var zahl = verkauft[i];
		var div = document.createElement("div");
		div.setAttribute("class", "verkaufsZahl");
		div.innerHTML = zahl.name + " hat " + zahl.verkauft + " Kaugummis verkauft";
		zahlenDiv.appendChild(div);
	}
}