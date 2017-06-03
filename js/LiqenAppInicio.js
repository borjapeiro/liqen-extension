var modificandoLiqen = 0;
var tagsInfo;
var contAnnot = 0;
var contLiqen = 1;
var annotInfo;
//Si hecho
function getTagByName(name) {
	//console.log("Entra")
	//console.log(name);
	/*	if (name == "who"){
		return "tag1";
	}
	else if (name == "where"){
		return "tag2";
	}
	else if(name == "why"){
		return "tag3";
	}
	else{
		return null;
	}
	*/
	var salida = null;
	for (var i = 0; i < tagsInfo['tagCont'].length; i++) {
		//console.log(tagsInfo[i]);
		if (tagsInfo['tagCont'][i]['title'] == name){
			//console.log("Entra if");
			salida = "tag"+tagsInfo['tagCont'][i]['id'];
		}
	}
	return salida;
}

//Si hecho
function getNameById(id) {
	console.log("Entra")
	console.log(name);
	/*	if (name == "who"){
		return "tag1";
	}
	else if (name == "where"){
		return "tag2";
	}
	else if(name == "why"){
		return "tag3";
	}
	else{
		return null;
	}
	*/
	var salida = null;
	for (var i = 0; i < tagsInfo['tagCont'].length; i++) {
		console.log(tagsInfo[i]);
		if (tagsInfo['tagCont'][i]['id'] == id){
			console.log("Entra if");
			salida = tagsInfo['tagCont'][i]['title'];
		}
	}
	return salida;
}
//Si hecho
function clicAnnotation() {
	//display: none --> desaparece
	//display: inline --> valor original
    document.getElementById("Question").style.display = "block";
    document.getElementById("CurrentLinquen").style.display = "block";
	document.getElementById("menuLiqens").className = "";
	document.getElementById("menuAnnotation").className = "active";
	document.getElementById("ListLiqens").className = "tab-pane fade";
	document.getElementById("ListAnnotation").className = "tab-pane fade in active";
   	if (document.getElementById("menu1").style.marginTop == "0px"){
		document.getElementById("menu1").style.marginTop = "-45px";
	}
}

//Si hecho			
function clicLiqens() {

    document.getElementById("Question").style.display = "none";
    document.getElementById("CurrentLinquen").style.display = "none";
   	if (document.getElementById("menu1").style.marginTop == "-45px"){
		document.getElementById("menu1").style.marginTop = "0px";
	}
	document.querySelectorAll("div[id=menu1] > ul > li")[0].className = "";
	document.querySelectorAll("div[id=menu1] > ul > li")[1].className = "active";
	document.querySelectorAll("div[id=menu1] > div > div")[0].className = "tab-pane fade";
	document.querySelectorAll("div[id=menu1] > div > div")[1].className = "tab-pane fade in active";	
}

//Si hecho
function mostrarLiqenById(id) {

	if (document.getElementById(id).style.display == "block"){
		document.getElementById(id).style.display = "none";
	}
	else{
		document.getElementById(id).style.display = "block";
	}
	var nodeAdd = document.getElementById(id).parentNode.childNodes[0].childNodes[0].childNodes[1]
	console.log(nodeAdd);
	if (nodeAdd.style.display == "inline"){
		nodeAdd.style.display = "none";
	}
	else{
		nodeAdd.style.display = "inline";
	}
}

//Si hecho (NO SE USA)
function mostrarAddById(id) {
	var node = document.getElementById(id).style.display
	if (document.getElementById(id).style.display == "inline"){
		document.getElementById(id).style.display = "none";
	}
	else{
		document.getElementById(id).style.display = "inline";

	}
}

//Si hecho
function editLiqenById(id) {
	modificandoLiqen = id.replace(/Liqen/g,"");
	var Liqen=document.getElementById(id).childNodes[0].childNodes;
	console.log(Liqen);
	var Current =document.getElementById('CurrentLinquen').childNodes[0].childNodes;
	console.log(Current);
	Current[Current.length-1].childNodes[0].data = "Add Liqen";
	Current[Current.length-2].style.display = "block";

	//Borramos el contenido actual
	for (var i = 1; i < Current.length-2; i++) {
		console.log(Current[i].id);
		removeAnnotationLiqen(Current[i].id);
	}
	//Insertamos uno por uno los elemntos del liqen
	for (var i = 0; i < Liqen.length; i++) {
		var nameTag = Liqen[i].childNodes[0].textContent;
		var text = Liqen[i].childNodes[1].innerText;
		insertCurrentLiqen(text,nameTag);
	}
	clicAnnotation();
	
}
function isRequired(id) {
	var salida = false;
	for (var i = 0; i < tagsInfo['tagQuestion'].length; i++) {
	 	if (tagsInfo['tagQuestion'][i]['tag'] == id){
	 		salida = tagsInfo['tagQuestion'][i]['required'];
	 		break;
	 	}
	 } 
	 return salida;
	//tagsInfo['tagCont'] = data['tags'];
    //tagsInfo['tagQuestion'] = data['question']['answer'];

}
//Si hecho (falta)
function insertLiqen() {
	var Current =document.getElementById('CurrentLinquen').childNodes[0].childNodes;
	console.log(Current);
	var sePuede = true;
	var LiqenList = document.getElementById('ListLiqens').childNodes[0];

	if (modificandoLiqen == 0){
	   	//tagsInfo['tagCont'] = data['tags'];
	    //tagsInfo['tagQuestion'] = data['question']['answer'];
		var idLiqen = "Liqen"+contLiqen;
		var idAdd = "add"+contLiqen;
		console.log(idLiqen);
		console.log(idAdd);
		
		var node_button = document.createElement('button');
		var node_div_0 = document.createElement('div');
		var node_h3 = document.createElement('h3');
		var node_strong_0 = document.createElement('strong');
		var node_a_0 = document.createElement('a');
		var node_span = document.createElement('span');
		var node_div_1 = document.createElement('div');
		var node_div_2 = document.createElement('div');


		node_button.setAttribute('type','button');
		node_button.setAttribute('class','list-group-item');
		// node_button => falta onClick
		node_div_0.setAttribute('class','panel-heading');
		node_h3.setAttribute('class', 'panel-title');
		node_a_0.setAttribute('id', idAdd);
		node_a_0.setAttribute('style', "display: none;float:right;");
		// node_a_0 => falta onClick
		node_span.setAttribute('aria-hidden','true');
		node_div_1.setAttribute('class','panel-body');
		node_div_1.setAttribute('id', idLiqen);
		node_div_1.setAttribute('style', "display: none;");
		node_div_2.setAttribute('class','alert alert-warning');
		node_div_2.setAttribute('role','alert');

		
		var text_node_strong_0 = document.createTextNode(idLiqen);
		var text_node_span = document.createTextNode('+');

		//Insertamos hasta la estructura del panel-heading
		node_strong_0.appendChild(text_node_strong_0);
		node_span.appendChild(text_node_span);
		node_a_0.appendChild(node_span);
		node_h3.appendChild(node_strong_0);
		node_h3.appendChild(node_a_0);
		node_div_0.appendChild(node_h3);
		node_button.appendChild(node_div_0);
		
		console.log(node_button);

		for (var i = 1; i < Current.length-2; i++) {
			console.log(Current[i].id);
			var idTag = Current[i].id;
			if(Current[i].childNodes.length < 2){
				console.log(Current[i].id+" => Sin anotaciones");
				if(isRequired(idTag.replace("tag",""))){
					console.log("NO SE PUEE CREAR EL LIQEN");
					alert("NO SE PUEE CREAR EL LIQEN");
					sePuede = false;
				}
			}
			else{

				if(Current[i].childNodes[1].childNodes[1].childNodes.length == 1){
					console.log(Current[i].id+" => Con 1 anotacion");
					
					var node_p_0 = document.createElement('p');
					var node_strong_1 = document.createElement('strong');
					var node_a_1 = document.createElement('a');

					node_a_1.setAttribute('class', 'alert alert-dismissible');
					node_a_1.setAttribute('role','alert');

					var text_node_strong_1 = document.createTextNode(Current[i].childNodes[0].textContent);
					var text_node_a_1 = document.createTextNode(Current[i].childNodes[1].childNodes[1].textContent);

					node_a_1.appendChild(text_node_a_1);
					node_strong_1.appendChild(text_node_strong_1);
					node_p_0.appendChild(node_strong_1);
					node_p_0.appendChild(node_a_1);
					node_div_2.appendChild(node_p_0);
					//node_div_1.appendChild(node_div_2);
					//node_button.appendChild(node_div_1);

					//document.getElementById('ListLiqens').childNodes[0].appendChild(node_button);				

					//document.getElementById(idLiqen).addEventListener('click', function(){mostrarLiqenById(idLiqen)});
					//document.getElementById(idAdd).addEventListener('click', function(){editLiqenById(idLiqen)});
					
				}
				else{
					console.log(Current[i].id+" => Con 2 o + anotaciones");
					
					var allAnnot = Current[1].childNodes[1].childNodes[1].childNodes[1].childNodes;
					console.log(allAnnot);
					console.log(allAnnot.length);
					
					for (var j = 0; j < allAnnot.length; j++) {
						console.log(allAnnot[j]);
						var annot = allAnnot[j].textContent;
						var len = annot.length -1;
	    				var res = annot.slice(0, len);
	    				console.log(res);
							
						var node_p_1 = document.createElement('p');
						var node_strong_2 = document.createElement('strong');
						var node_a_2 = document.createElement('a');

						node_a_2.setAttribute('class', 'alert alert-dismissible');
						node_a_2.setAttribute('role','alert');

						var text_node_strong_2 = document.createTextNode(Current[i].childNodes[0].textContent);
						var text_node_a_2 = document.createTextNode(res);

						node_a_2.appendChild(text_node_a_2);
						node_strong_2.appendChild(text_node_strong_2);
						node_p_1.appendChild(node_strong_2);
						node_p_1.appendChild(node_a_2);

						console.log(node_p_1);
						node_div_2.appendChild(node_p_1);
						
					}
					
					//node_div_1.appendChild(node_div_2);
					//node_button.appendChild(node_div_1);

					//document.getElementById('ListLiqens').childNodes[0].appendChild(node_button);				

					//document.getElementById(idLiqen).addEventListener('click', function(){mostrarLiqenById(idLiqen)});
					//document.getElementById(idAdd).addEventListener('click', function(){editLiqenById(idLiqen)});
					
				}
			}
			
		}

		if (sePuede){
			contLiqen+=1;
			if (LiqenList.firstChild.localName == "c"){
				LiqenList.removeChild(LiqenList.firstChild);	
			}
			node_div_1.appendChild(node_div_2);
			node_button.appendChild(node_div_1);
			//console.log(node_button);

			document.getElementById('ListLiqens').childNodes[0].appendChild(node_button);				

			document.getElementById(idLiqen).parentNode.addEventListener('click', function(){mostrarLiqenById(idLiqen)});
			document.getElementById(idAdd).addEventListener('click', function(){editLiqenById(idLiqen)});

			clicLiqens();
		}

	}
	else{
		//console.log("ENTRA!!!!!!!!!!!!!!!!!");
		//tagsInfo['tagCont'] = data['tags'];
	    //tagsInfo['tagQuestion'] = data['question']['answer'];
		var idLiqen = "Liqen"+modificandoLiqen;
		var idAdd = "add"+modificandoLiqen;
		modificandoLiqen=0;
		console.log(idLiqen);
		console.log(idAdd);
		
		var node_button = document.createElement('button');
		var node_div_0 = document.createElement('div');
		var node_h3 = document.createElement('h3');
		var node_strong_0 = document.createElement('strong');
		var node_a_0 = document.createElement('a');
		var node_span = document.createElement('span');
		var node_div_1 = document.createElement('div');
		var node_div_2 = document.createElement('div');


		node_button.setAttribute('type','button');
		node_button.setAttribute('class','list-group-item');
		// node_button => falta onClick
		node_div_0.setAttribute('class','panel-heading');
		node_h3.setAttribute('class', 'panel-title');
		node_a_0.setAttribute('id', idAdd);
		node_a_0.setAttribute('style', "display: none;");
		// node_a_0 => falta onClick
		node_span.setAttribute('aria-hidden','true');
		node_div_1.setAttribute('class','panel-body');
		node_div_1.setAttribute('id', idLiqen);
		node_div_1.setAttribute('style', "display: none;");
		node_div_2.setAttribute('class','alert alert-warning');
		node_div_2.setAttribute('role','alert');

		
		var text_node_strong_0 = document.createTextNode(idLiqen);
		var text_node_span = document.createTextNode('+');

		//Insertamos hasta la estructura del panel-heading
		node_strong_0.appendChild(text_node_strong_0);
		node_span.appendChild(text_node_span);
		node_a_0.appendChild(node_span);
		node_h3.appendChild(node_strong_0);
		node_h3.appendChild(node_a_0);
		node_div_0.appendChild(node_h3);
		node_button.appendChild(node_div_0);
		
		console.log(node_button);

		for (var i = 1; i < Current.length-2; i++) {
			console.log(Current[i].id);
			var idTag = Current[i].id;
			if(Current[i].childNodes.length < 2){
				console.log(Current[i].id+" => Sin anotaciones");
				if(isRequired(idTag.replace("tag",""))){
					console.log("NO SE PUEE CREAR EL LIQEN");
					alert("NO SE PUEE CREAR EL LIQEN");
					sePuede = false;
				}
			}
			else{

				if(Current[i].childNodes[1].childNodes[1].childNodes.length == 1){
					console.log(Current[i].id+" => Con 1 anotacion");
					
					var node_p_0 = document.createElement('p');
					var node_strong_1 = document.createElement('strong');
					var node_a_1 = document.createElement('a');

					node_a_1.setAttribute('class', 'alert alert-dismissible');
					node_a_1.setAttribute('role','alert');

					var text_node_strong_1 = document.createTextNode(Current[i].childNodes[0].textContent);
					var text_node_a_1 = document.createTextNode(Current[i].childNodes[1].childNodes[1].textContent);

					node_a_1.appendChild(text_node_a_1);
					node_strong_1.appendChild(text_node_strong_1);
					node_p_0.appendChild(node_strong_1);
					node_p_0.appendChild(node_a_1);
					node_div_2.appendChild(node_p_0);
					//node_div_1.appendChild(node_div_2);
					//node_button.appendChild(node_div_1);

					//document.getElementById('ListLiqens').childNodes[0].appendChild(node_button);				

					//document.getElementById(idLiqen).addEventListener('click', function(){mostrarLiqenById(idLiqen)});
					//document.getElementById(idAdd).addEventListener('click', function(){editLiqenById(idLiqen)});
					
				}
				else{
					console.log(Current[i].id+" => Con 2 o + anotaciones");
					
					var allAnnot = Current[1].childNodes[1].childNodes[1].childNodes[1].childNodes;
					console.log(allAnnot);
					console.log(allAnnot.length);
					
					for (var j = 0; j < allAnnot.length; j++) {
						console.log(allAnnot[j]);
						var annot = allAnnot[j].textContent;
						var len = annot.length -1;
	    				var res = annot.slice(0, len);
	    				console.log(res);
							
						var node_p_1 = document.createElement('p');
						var node_strong_2 = document.createElement('strong');
						var node_a_2 = document.createElement('a');

						node_a_2.setAttribute('class', 'alert alert-dismissible');
						node_a_2.setAttribute('role','alert');

						var text_node_strong_2 = document.createTextNode(Current[i].childNodes[0].textContent);
						var text_node_a_2 = document.createTextNode(res);

						node_a_2.appendChild(text_node_a_2);
						node_strong_2.appendChild(text_node_strong_2);
						node_p_1.appendChild(node_strong_2);
						node_p_1.appendChild(node_a_2);

						console.log(node_p_1);
						node_div_2.appendChild(node_p_1);
						
					}
					
					//node_div_1.appendChild(node_div_2);
					//node_button.appendChild(node_div_1);

					//document.getElementById('ListLiqens').childNodes[0].appendChild(node_button);				

					//document.getElementById(idLiqen).addEventListener('click', function(){mostrarLiqenById(idLiqen)});
					//document.getElementById(idAdd).addEventListener('click', function(){editLiqenById(idLiqen)});
					
				}
			}
			
		}

		if (sePuede){
		//node_div_1.appendChild(node_div_2);
		//node_button.appendChild(node_div_1);
		//console.log(node_button);
		var nodeInsert = document.getElementById(idLiqen);
		nodeInsert.removeChild(nodeInsert.firstChild);
		nodeInsert.appendChild(node_div_2);				

		//document.getElementById(idLiqen).parentNode.addEventListener('click', function(){mostrarLiqenById(idLiqen)});
		//document.getElementById(idAdd).addEventListener('click', function(){editLiqenById(idLiqen)});
		}
	}

	if (sePuede){
		clicLiqens();
		cancelLiqen();
	}
}

//Si hecho
function cancelLiqen() {
	var Current =document.getElementById('CurrentLinquen').childNodes[0].childNodes;
	console.log(Current);
	Current[Current.length-1].childNodes[0].data = "New Liqen";
	Current[Current.length-2].style.display = "none";

	//Borramos el contenido actual
	for (var i = 1; i < Current.length-2; i++) {
		console.log(Current[i].id);
		removeAnnotationLiqen(Current[i].id);
	}
}

//Si hecho
function removeAnnotationLiqen(id) {
	console.log("entra en removeAnnotationLiqen");
	var list = document.getElementById(id);
	//console.log(list.childNodes);
	if(list.childNodes.length > 1){
		list.removeChild(list.childNodes[1]);
	}
}

//Si hecho
function removeThisAnnotationLiqen(listId,popup) {
	console.log("entra en removeThisAnnotationLiqen");
	var list = document.getElementById(popup)
	console.log(list.childNodes);
	var change_on = false;
	var tagx = popup.replace(/PopupText/g,"");
	for (var i = 0; i < list.childNodes.length; i++) {
		if (list.childNodes[i].id && list.childNodes[i].id == listId){
			list.removeChild(list.childNodes[i]);
			change_on = true;
		}
		if (change_on && i < list.childNodes.length){
			var num = list.childNodes[i].id.replace(/tag\d*_/g, "");
			var newNum = num-1;
			var newId = tagx+"_"+newNum;
			//var newClic = "removeThisAnnotationLiqen('"+tagx+"_"+newNum+"','"+tagx+"PopupText')";
			//list.childNodes[i].childNodes[1].setAttribute("onclick", newClic);
	      	list.childNodes[i].childNodes[1].addEventListener('click',  function(){removeThisAnnotationLiqen(tagx+"_"+newNum , tagx+"PopupText");});
			list.childNodes[i].id = newId;
		}
	}
	if (list.childNodes.length == 1 ){
		list.className = "popuptext";
		//console.log(document.getElementById(popup.replace(/Text/g, "")).innerText);
		//console.log(list.childNodes[0].textContent);
		var annot =list.childNodes[0].textContent
		var len = annot.length -1;
    	var res = annot.slice(0, len);
		document.getElementById(popup.replace(/Text/g, "")).innerText = res;
	}
	multipleAnnotations(popup);
}

//Si hecho
function insertCurrentLiqen(text,nameTag) {
	var tagx = getTagByName(nameTag);
	console.log(tagx);
	/*
		<a class="alert alert-dismissible">
			<button type="button" class="close" aria-label="Close" onclick="removeAnnotationLiqen('tag3')">
				<span aria-hidden="true">x</span>
			</button>
			<pop class="popup" id="Tag3Popup" onclick="multipleAnnotations('Tag3PopupText')" style="font-size: 0.875em;">Multiple annotations
				<span class="popuptext" id="Tag3PopupText" style="font-size: 0.875em;">
					<c id="tag3_0">[ text why current 0]
					<button type="button" class="close" aria-label="Close" onclick="removeThisAnnotationLiqen('tag3_0','Tag3PopupText')">
						<c aria-hidden="true">x</c></button>
					<br><br></c><c id="tag3_1">[ text why current 1]
					<button type="button" class="close" aria-label="Close" onclick="removeThisAnnotationLiqen('tag3_1','Tag3PopupText')">
						<span aria-hidden="true">x</span></button>
					<br><br></c><c id="tag3_2">[ text why current 2]
					<button type="button" class="close" aria-label="Close" onclick="removeThisAnnotationLiqen('tag3_2','Tag3PopupText')">
						<span aria-hidden="true">x</span></button>
					<br><br></c><c id="tag3_3">[ text why current 3]
					<button type="button" class="close" aria-label="Close" onclick="removeThisAnnotationLiqen('tag3_3','Tag3PopupText')">
						<span aria-hidden="true">x</span></button>
					<br><br></c>
				</span>
			</pop>
		</a>
	*/

	console.log(document.getElementById(tagx));
	var node_tagx = document.getElementById(tagx);
	
	if (node_tagx.childNodes.length < 2){
		console.log(document.getElementById(tagx).childNodes.length);
		console.log("Entra sin nada, primera aparición");
		/*
		<a class="alert alert-dismissible">
			<button type="button" class="close" aria-label="Close" onclick="removeAnnotationLiqen('tag3')">
					<span aria-hidden="true">x</span>
				</button>
				<pop class="popup" id="Tag3Popup" onclick="multipleAnnotations('Tag3PopupText')" style="font-size: 0.875em;">
					[ text why current 3] 										
				</pop>
			</a>
		*/
		//Crear los nodos
		var node_a = document.createElement("a");
		var node_button = document.createElement("button");
		var node_span = document.createElement("span");
		var node_pop = document.createElement("pop");

		//Atributos de a
		node_a.setAttribute("class", "alert alert-dismissible");
		//node_a.setAttribute("id", tagx+"Txt");
		node_a.setAttribute("style", "font-size: 0.875em;");
		
		//Atributos de button
		node_button.setAttribute("type", "button");
		node_button.setAttribute("class", "close");
		node_button.setAttribute("aria-label", "Close");
		node_button.setAttribute("style", "right: 0px");
		//node_button.setAttribute("onclick", "removeAnnotationLiqen('"+tagx+"')");

		//Atributos de span
		node_span.setAttribute("aria-hidden", "true");

		//Atributos de pop
		node_pop.setAttribute("class", "popup");
		node_pop.setAttribute("id", tagx+"Popup");
		//node_pop.setAttribute("onclick", "multipleAnnotations('"+tagx+"PopupText')");
		node_pop.setAttribute("style", "font-size: 0.875em;");

		//Crear los textos
		var text_node_pop = document.createTextNode(text);
		var text_node_span = document.createTextNode("x");

		//Insertamos las acciones
      	node_button.addEventListener('click',  function(){removeAnnotationLiqen(tagx);});
      	node_pop.addEventListener('click',  function(){multipleAnnotations( tagx+"PopupText");});

		//creamos la estructura
		node_span.appendChild(text_node_span);
		node_button.appendChild(node_span);
		node_pop.appendChild(text_node_pop);
		node_a.appendChild(node_button);
		node_a.appendChild(node_pop);

		//insertamos la estructura
		document.getElementById(tagx).appendChild(node_a);
		console.log(document.getElementById(tagx).childNodes.length);
		
	}
	else{
		//console.log(node_tagx.childNodes[1].childNodes[1].innerText);
		console.log("Entra con anotaciones");
		var text_annot_0 = node_tagx.childNodes[1].childNodes[1].textContent; 
		console.log(text_annot_0.substr(0, 20));
		if( text_annot_0.substr(0, 20) == "Multiple annotations"){
			/*
			<a class="alert alert-dismissible">
				<button type="button" class="close" aria-label="Close" onclick="removeAnnotationLiqen('tag3')">
					<span aria-hidden="true">x</span>
				</button>
				<pop class="popup" id="Tag3Popup" onclick="multipleAnnotations('Tag3PopupText')" style="font-size: 0.875em;">
					Multiple annotations
					<span class="popuptext" id="Tag3PopupText" style="font-size: 0.875em;">
						<c id="tag3_0">[ text why current 0]
						<button type="button" class="close" aria-label="Close" onclick="removeThisAnnotationLiqen('tag3_0','Tag3PopupText')">
							<span aria-hidden="true">x</span></button>
						<br><br></c>
						<c id="tag3_1">[ text why current 1]
						<button type="button" class="close" aria-label="Close" onclick="removeThisAnnotationLiqen('tag3_1','Tag3PopupText')">
							<span aria-hidden="true">x</span></button>
						<br><br></c>
					</span>
				</pop>
			</a>
			*/
			var annot_length = node_tagx.childNodes[1].childNodes[1].childNodes[1].childNodes.length;

			var node_c = document.createElement("c");
			var node_button = document.createElement("button");
			var node_span = document.createElement("span");
			var node_br_0 = document.createElement("br");
			var node_br_1 = document.createElement("br");
			//Atributos de button
			node_button.setAttribute("type", "button");
			node_button.setAttribute("class", "close");
			node_button.setAttribute("aria-label", "Close");
			node_button.setAttribute("style", "right: 10px");
			//node_button.setAttribute("onclick", "removeThisAnnotationLiqen('"+tagx+"_"+annot_length+"','"+tagx+"PopupText')");

			//Atributos de span
			node_span.setAttribute("aria-hidden", "true");

			//Atributos de pop
			node_c.setAttribute("id", tagx+"_"+annot_length);

			//Crear los textos
			var text_node_c = document.createTextNode(text);
			var text_node_span = document.createTextNode("x");

			//Insertamos las acciones
    	  	node_button.addEventListener('click',  function(){removeThisAnnotationLiqen(tagx+"_"+annot_length , tagx+"PopupText");});

			//creamos la estructura
			node_span.appendChild(text_node_span);
			node_button.appendChild(node_span);
			node_c.appendChild(text_node_c);
			node_c.appendChild(node_button);
			node_c.appendChild(node_br_0);
			node_c.appendChild(node_br_1);

			//insertamos la estructura
			node_tagx.childNodes[1].childNodes[1].childNodes[1].appendChild(node_c);
			console.log("Entra con anotaciones 2 o mas");	
		}
		else {
			console.log("Entra con 1 anotacion");	

			//Crear los nodos
			var node_span_0 = document.createElement("span");
			var node_c_0 = document.createElement("c");
			var node_c_1 = document.createElement("c");
			var node_button_0 = document.createElement("button");
			var node_button_1 = document.createElement("button");
			var node_span_1 = document.createElement("span");
			var node_span_2 = document.createElement("span");
			var node_br_0 = document.createElement("br");
			var node_br_1 = document.createElement("br");
			var node_br_2 = document.createElement("br");
			var node_br_3 = document.createElement("br");

			//Atributos de a
			node_span_0.setAttribute("class", "popuptext");
			node_span_0.setAttribute("id", tagx+"PopupText");
			node_span_0.setAttribute("style", "font-size: 0.875em;");
			
			//Atributos de button
			node_button_0.setAttribute("type", "button");
			node_button_0.setAttribute("class", "close");
			node_button_0.setAttribute("aria-label", "Close");
			node_button_0.setAttribute("style", "right: 10px");
			//node_button_0.setAttribute("onclick", "removeThisAnnotationLiqen('"+tagx+"_0','"+tagx+"PopupText')");
			node_button_1.setAttribute("type", "button");
			node_button_1.setAttribute("class", "close");
			node_button_1.setAttribute("aria-label", "Close");
			node_button_1.setAttribute("style", "right: 10px");
			//node_button_1.setAttribute("onclick", "removeThisAnnotationLiqen('"+tagx+"_1','"+tagx+"PopupText')");

			//Insertamos las acciones
    	  	node_button_0.addEventListener('click',  function(){removeThisAnnotationLiqen(tagx+"_0", tagx+"PopupText");});
    	  	node_button_1.addEventListener('click',  function(){removeThisAnnotationLiqen(tagx+"_1", tagx+"PopupText");});

			//Atributos de span
			node_span_1.setAttribute("aria-hidden", "true");
			node_span_2.setAttribute("aria-hidden", "true");

			//Atributos de pop
			node_c_0.setAttribute("id", tagx+"_0");
			node_c_1.setAttribute("id", tagx+"_1");

			//Crear los textos
			var text_node_c_0 = document.createTextNode(text_annot_0);
			var text_node_c_1 = document.createTextNode(text);
			var text_node_span_1 = document.createTextNode("x");
			var text_node_span_2 = document.createTextNode("x");

			//creamos la estructura
			node_tagx.childNodes[1].childNodes[1].innerText = "Multiple annotations";
			node_span_1.appendChild(text_node_span_1);
			node_button_0.appendChild(node_span_1);
			node_span_2.appendChild(text_node_span_2);
			node_button_1.appendChild(node_span_2);
			node_c_0.appendChild(text_node_c_0);
			node_c_0.appendChild(node_button_0);
			node_c_0.appendChild(node_br_0);
			node_c_0.appendChild(node_br_1);
			node_c_1.appendChild(text_node_c_1);
			node_c_1.appendChild(node_button_1);
			node_c_1.appendChild(node_br_2);
			node_c_1.appendChild(node_br_3);
			node_span_0.appendChild(node_c_0);
			node_span_0.appendChild(node_c_1);

			//insertamos la estructura
			node_tagx.childNodes[1].childNodes[1].appendChild(node_span_0);
		}
	}
}

//Si hecho
function addAnotationLiqen(id) {
	console.log(document.getElementById(id).childNodes);
	var text = document.getElementById(id).childNodes[0].data
	console.log(text);
	var nameTag = document.getElementById(id).childNodes[3].innerText.split(" | ");
	console.log(nameTag);
	for (var i = 0; i < nameTag.length; i++) {
		insertCurrentLiqen(text,nameTag[i]);
	}				
}

//Si hecho
function multipleAnnotations(id) {
	console.log(id);
	pop = document.querySelectorAll("pop > span");
	for (var i = 0; i < pop.length; i++) {
		if(pop[i].id == id){
	    	pop[i].classList.toggle("show");		
		}
		else{
    		pop[i].classList.remove("show");		
		}
	}
}

//Si hecho (falta)
function insertAnnotation(data) {

	var idAnnot = "annot"+contAnnot;
	contAnnot += 1;
	var node_annot = document.createElement('div');
	var node_br_0 = document.createElement('br');
	var node_br_1 = document.createElement('br');
	var node_strong = document.createElement('strong');
	var node_button = document.createElement('button');
	var node_span = document.createElement('span');

	node_annot.setAttribute('class','alert alert-warning');
	node_annot.setAttribute('id',idAnnot);
	node_button.setAttribute('type', 'button');
	node_button.setAttribute('class', 'close');
	node_button.setAttribute('aria-label','Add');
	node_span.setAttribute('aria-hidden','true');

	var text_node_annot = document.createTextNode(data['target']['exact']);
	var text_tags = "";
	for (var i = 0; i < data['tags'].length; i++) {
		if (i==0){
			text_tags += getNameById(data['tags'][i]);
		}
		else{
			text_tags +=" | "+ getNameById(data['tags'][i]);
		}
	}
	var text_node_strong = document.createTextNode(text_tags);
	var text_node_span = document.createTextNode('+');

	node_span.appendChild(text_node_span);
	node_strong.appendChild(text_node_strong);
	node_button.appendChild(node_span);
	node_annot.appendChild(text_node_annot);
	node_annot.appendChild(node_br_0);
	node_annot.appendChild(node_br_1);
	node_annot.appendChild(node_strong);
	node_annot.appendChild(node_button);
	console.log(node_annot);
	var listAnnot = document.getElementById('ListAnnotation');
	if (listAnnot.firstChild.localName != "c"){
		listAnnot.insertBefore(node_annot,listAnnot.firstChild);
		console.log(document.getElementById('ListAnnotation').firstChild);		
	}
	else{
		listAnnot.removeChild(listAnnot.childNodes[0]);
		listAnnot.appendChild(node_annot);
	}
	document.getElementById('ListAnnotation').firstChild.lastChild.addEventListener('click',function(){addAnotationLiqen(idAnnot);});
	addAnotationLiqen(idAnnot);

}
/*******************************************************
**************** FUNCIONES CON CHROME ******************
********************************************************/

function OnInsertAppInicio() {
	document.getElementById("noAdd").addEventListener('click', cancelLiqen);
	document.getElementById("siAdd").addEventListener('click', insertLiqen);

	document.getElementById("menuAnnotation").addEventListener('click', clicAnnotation);
	document.getElementById("menuLiqens").addEventListener('click', clicLiqens);
}

window.onmessage = function(e){
	//console.log(e);
	//console.log(e.data);
	var data = JSON.parse(e.data);
	console.log(data);
    if (data["question"]) {
    	console.log('entra question');
    	annotInfo = {};
    	tagsInfo = {};
    	tagsInfo['tagCont'] = data['tags'];
    	tagsInfo['tagQuestion'] = data['question']['answer'];
    	console.log(tagsInfo);
        OnInsertAppInicio();
        crearCurrentLiqen(data);
    }
    if (data['article_id']){
    	console.log("entra article_id");
    	var existe = false;
    	var annotInfoAux = {};
    	for (var h = 0; h < data['tags'].length; h++) {
    		var target = JSON.stringify(data['target']);
    		var todo = target+data['tags'][h];
    		if (annotInfo[todo]){
    			existe = true;
    			break;
    		}
    		annotInfoAux[todo] = data['author'];
    		console.log(todo);
    	}
    	console.log('sale for');
    	if (!existe){
    		for(var key in annotInfoAux) {annotInfo[key] = annotInfoAux[key];}
    		insertAnnotation(data);    		
    	}
    	else{
    		alert("Existe esa anotación con el tag asociado");
    	}
    }
};

function crearCurrentLiqen(data) {
	console.log(data['question']);
  	console.log(data['question']['title']);
  	console.log(data['tags']);
  	for (var i = 0; i < data['tags'].length; i++) {
  		console.log(data['tags'][i]);
  		var id = "tag"+data['tags'][i]['id'];
  		console.log(id);
  		var node = document.createElement("p");
  		node.setAttribute("id", id);
  		var text = data['tags'][i]['title'];
  		var text_node = document.createTextNode(text);
  		node.appendChild(text_node);
  		console.log(node);
  		var nodeExistente = document.getElementById("CurrentLinquen").childNodes[0];
  		var nodeBefore = nodeExistente.childNodes[ nodeExistente.childNodes.length - 2 ];
    	console.log(nodeExistente);	
    	console.log(nodeBefore);
    	nodeExistente.insertBefore(node, nodeBefore);	
  	}
  	document.getElementById("Question").childNodes[0].innerText = data["question"]['title'];
  	//console.log(document.getElementById("Question").childNodes[0].innerText);
}