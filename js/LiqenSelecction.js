var selection = null;
var idActual = 0;
var contAnnot = null;
var range = null;

var contenidoInfo = null;

function mouseDown() {
  //console.log("mouseDown General");
  var popTagx = event.target.id.match(/pop[A-Z][a-z]*\d*/g);
  //console.log(popTagx);
  muestraErrores();
  if(!popTagx){
    var pop = document.getElementById('PopImg');
    pop.style.display = "none";
    barraOff();
  }
}

function mouseUp() {
  var popAnnot = document.getElementById('PopAnnot');
  console.log(popAnnot);
  if (window.getSelection().type == "Range" && popAnnot.style.display == "none") {
    selection = window.getSelection();
    console.log("GENERA SELECCION");
    console.log(selection);
    var pop = document.getElementById('PopImg');

    var left = event.pageX;
    var top = event.pageY;
    var theHeight = 20; //valor por defecto
    
    pop.style.display = "block";
    
    var leftPop = left-(theHeight/2);
    pop.style.left = leftPop+'px';


    var topPop = top+(theHeight/2);
    pop.style.top = topPop+'px';

  }
}

function barraOff() {
  console.log("entra barraOff");
  document.getElementById('divBarra').style.width = '1px';
  document.getElementById('divButton').style.width = '43px';
  var img = document.getElementById('flecha').src.split("/");
  img[img.length-1] = "glyphicons-225-chevron-left.png";
  document.getElementById('flecha').src = img.join("/");
}

function barraOn() {
  console.log("entra barraOn");
  document.getElementById('divBarra').style.width = '480px';
  document.getElementById('divButton').style.width = '523px';
  var img = document.getElementById('flecha').src.split("/");
  img[img.length-1] = "glyphicons-224-chevron-right.png";
  document.getElementById('flecha').src = img.join("/");
}

function clicFlecha() {
  muestraErrores();
  var img = document.getElementById('flecha').src.split("/");
  //console.log (img[img.length-1]);
  if (img[img.length-1] == "glyphicons-224-chevron-right.png"){
    barraOff();
  }
  else {
    barraOn();
  }
}

function clicPopTag(id) {
  muestraErrores();
  if (document.getElementById(id).style.backgroundColor){
    document.getElementById(id).style.backgroundColor="";
  }
  else{
    document.getElementById(id).style.backgroundColor= "#99ccff";
  }
}

function clicPopAnnotNew() { 
  //console.log(selectionContents);
  muestraErrores();
  var activeTag = getTagSelect();
  
  if(activeTag.length > 0){
    var idAnnot = "annot"+idActual;
    idActual += 1 ;
    console.log(idAnnot);
    var prefix = "";
    var exact  = "";
    var suffix = "";
    var text   = "";

    exact = document.getElementById(idAnnot).textContent;
    text = document.getElementById(idAnnot).parentNode.textContent.split(exact);
    prefix = text[0];
    suffix = text[1];
    console.log("prefix : "+prefix);
    console.log("exact : "+exact);
    console.log("suffix :"+suffix);
    console.log("tag : "+activeTag);
    console.log(contenidoInfo);
    var structAnnot = {};
    structAnnot["article_id"] = contenidoInfo['question']['id'];
    structAnnot['author'] = contenidoInfo['author'];
    structAnnot["target"] = {};
    structAnnot["target"]['type'] = "TextQuoteSelector";
    structAnnot["target"]['prefix'] = prefix;
    structAnnot["target"]['exact'] = exact;
    structAnnot["target"]['suffix'] = suffix;
    structAnnot["tags"] = activeTag;
    console.log(structAnnot);
    /*
    {
        "id": 1, //se autogenera
        "author": 1, //????
        "article_id": 1,
        "target": {
            "type": "TextQuoteSelector",
            "prefix": "ven mejores oportunidades en esas tierras, en un ",
            "exact": "éxodo",
            "suffix": " que ha visto emigraciones"
        },
        "tags": [1, 2]
    }
    */

    var popAnnot = document.getElementById('PopAnnot');
    popAnnot.style.display = "none";
    
    //Inicializamos contenido iframe
    document.getElementById('iframeLiqen').contentWindow.postMessage(JSON.stringify(structAnnot), '*');

  }
  else{
    muestraErrores("Al menos seleccionar un tag");
  }
}

function clicPopAnnotCancel() {

  //var copia = range.cloneContents()
  //console.log(copia);
  //console.log(copia.toString());
  //range.extractContents();
  //console.log(copia);
  //console.log(copia.toString());

  muestraErrores();
  if (range){
    range.extractContents();
    //range.insertNode(document.createTextNode(contAnnot));
    range.insertNode(contAnnot);
    var popAnnot = document.getElementById('PopAnnot');
    popAnnot.style.display = "none";
  }
  getTagSelect();
}

function clicPopButton() {
  console.log("entra en popButton");
  console.log(selection);
  console.log(selection['anchorNode'].childNodes);
  if (selection){
    console.log(selection);
    console.log(selection['anchorNode'].childNodes);
    range = selection.getRangeAt(0);
    console.log(range);
    console.log(range['commonAncestorContainer'].childNodes);
    var sePuede=comprobarSeleccion(range['commonAncestorContainer'].childNodes);
    if(sePuede){
      if (range.toString()){
      contAnnot = range.cloneContents();
      console.log(contAnnot);
      var selectionContents = range.extractContents();
      //console.log("SE EXTRAEEE");
      //console.log(selectionContents);
      //console.log(contAnnot);
      var node_c = document.createElement("c");
      node_c.id = "annot"+idActual;
      node_c.style.backgroundColor = "rgba(176, 191, 63, 0.25)";
      node_c.style.display = "inline";
      node_c.appendChild(selectionContents);
      range.insertNode(node_c);

      var popButton = document.getElementById('PopImg');
      popButton.style.display = "none";
      var popAnnot = document.getElementById('PopAnnot');
      popAnnot.style.display = "block";
      popAnnot.style.left = popButton.style.left;
      popAnnot.style.top = popButton.style.top;  
      }
      else{
        muestraErrores("Seleccion perdida, repita la selección");
      }
    }
    else{
      muestraErrores("No se puede anotar entre parrafos");
    }
  }
}

function comprobarSeleccion(nodes) {
  var continua=true;
  for (var i = 0; i < nodes.length && continua; i++) {
    if(nodes[i].localName =='p' || nodes[i].localName =='div'){
      continua=false;
      console.log(continua);
    }
  }
  return continua;
}

function getTagSelect() {
  var tagNodes = document.getElementById('PopAnnot').childNodes;
  //console.log(tagNodes);
  var activeTag = [];
  for (var i = 0; i < tagNodes.length; i++) {
    if(tagNodes[i].style.backgroundColor){
      //console.log(tagNodes[i]);
      var id = tagNodes[i].id;
      //console.log(id.replace("popTag", ""));
      activeTag.push(id.replace("popTag", ""));
      tagNodes[i].style.backgroundColor = "";
    }
  }
  return activeTag;
}

function clicVista() {
/*  // falta cambiar cosas
  var nodes = document.querySelectorAll('*[id]');
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].id.match("annotation")){
      console.log(nodes[i].id);
      console.log(nodes[i].style.backgroundColor);
    }
  }
*/ 

}

function muestraErrores(error){
  //console.log(error);
  //console.log(error.length);

  if (error && error != event) {
    console.log("entra en Error");
    console.log(error.length);
    var  width = parseInt(error.length * 7.5);
    var left = event.pageX;
    var top = event.pageY;
    var theHeight = 20; //valor por defecto
    
    var popError = document.getElementById('PopError');

    popError.style.width = width+'px';
    popError.textContent=error;
    popError.style.display = "block";
    
    var leftPop = left-(theHeight/2);
    popError.style.left = leftPop+'px';

    var topPop = top+(theHeight/2);
    popError.style.top = topPop+'px';
  }
  else{
    var popError = document.getElementById('PopError');
    popError.style.display = "none";

  }
}

/*******************************************************
**************** FUNCIONES CON CHROME ******************
********************************************************/
function insertContenido(id) {
    document.getElementById(id).addEventListener('click',  function(){clicPopTag(id);});
}

function insertPopAnnot(appInicio, contenido) {
  console.log("ENTRA!!!!!");
  if (contenido['error']){
    muestraErrores(contenido['error']);
  }
  console.log(contenido);
  console.log(appInicio);
  contenidoInfo = contenido;

  /*
  <div class="popover" id="PopAnnot" style="display: block;left: 0px;top: 0px;width: 160px;height: 100px;">
    <div id="popTag1" style="cursor: pointer;padding-buttom: 2px;">Place of origin</div>
    <div id="popTag2" style="cursor: pointer;padding-buttom: 2px;">Reason</div>
    <div id="popTag3" style="cursor: pointer;padding-buttom: 2px;">Destination</div>
    <button class="buttonAnnot" type="button" id="popButton" style="cursor: pointer;width: 75px; margin: 5;">New Annotation</button>
    <button class="buttonAnnot" type="button" id="popButton" style="cursor: pointer;width: 75px; margin: 5;">Cancel Annotation</button>
  </div>
  */

  //Crea los nodos PopAnnot
  var node_divPopAnnot = document.createElement('DIV');
  var node_button_2 = document.createElement('BUTTON');
  var node_button_3 = document.createElement('BUTTON');

  //Atributos de los nodos PopAnnot
  node_divPopAnnot.setAttribute("class", "popover");
  node_divPopAnnot.setAttribute("id", "PopAnnot");
  //node_divPopAnnot.setAttribute("style", "display: none; left: 0px;top: 0px; width: 90px; height: 90px;");
  node_button_2.setAttribute("class", "buttonAnnot");
  node_button_2.setAttribute("type", "button");
  node_button_2.setAttribute("id", "popButtonNew");
  node_button_2.setAttribute("style", "cursor: pointer; width: 75px;  margin-top: 5px;");

  node_button_3.setAttribute("class", "buttonAnnot");
  node_button_3.setAttribute("type", "button");
  node_button_3.setAttribute("id", "popButtonCancel");
  node_button_3.setAttribute("style", "cursor: pointer; width: 75px; margin-left: 10px; margin-top: 5px;");
  //Crear los textos
  var text_node_button_2 = document.createTextNode("New Annotation");
  var text_node_button_3 = document.createTextNode("Cancel Annotation");

  //Estructura de los nodos PopAnnot 
  node_button_2.appendChild(text_node_button_2);
  node_button_3.appendChild(text_node_button_3);

  var nodes = node_divPopAnnot.childNodes.length;

  var width = 0;
  var height = 40;
  var maxLenth = 0;

  for (var i = 0; i < contenido["tags"].length; i++) {
    var valor = "popTag"+contenido["tags"][i]["id"];
    var node_divTag = document.createElement("DIV");
    node_divTag.setAttribute("id", valor);
    node_divTag.setAttribute("style", "cursor: pointer;padding-buttom: 2px;");
    var text_node_divTag = document.createTextNode(contenido["tags"][i]["title"]);
    node_divTag.appendChild(text_node_divTag);
    
    console.log(valor);
    
    console.log(node_divTag);
    node_divPopAnnot.appendChild(node_divTag);

    if(contenido["tags"][i]["title"].length > maxLenth){
        maxLenth = contenido["tags"][i]["title"].length;
        width = parseInt(maxLenth * 7.5);
      }
      height += 15;
  }
  console.log('maxLenth');
  console.log(maxLenth);
  console.log('width');
  console.log(width);
  if (width < 160){
    width = 160;
  }
  node_divPopAnnot.setAttribute("style", "display: none; left: 0px;top: 0px; width: "+width+"px; height: "+height+"px;");

  node_divPopAnnot.appendChild(node_button_2);
  node_divPopAnnot.appendChild(node_button_3);

  //Insetamos en el body
  document.body.appendChild(node_divPopAnnot);

  for (var i = 0; i < contenido["tags"].length; i++) {
    insertContenido("popTag"+contenido["tags"][i]["id"]);
  }
  //Insertamos las acciones
  document.getElementById("popButtonNew").addEventListener('click', clicPopAnnotNew);
  document.getElementById("popButtonCancel").addEventListener('click', clicPopAnnotCancel);

  //Inicializamos contenido iframe
  console.log(contenido);
  console.log(document.getElementById('iframeLiqen'));
  document.getElementById('iframeLiqen').contentWindow.postMessage(JSON.stringify(contenido), appInicio);

}

function insertBarra(appInicio) {
  //Crea los nodos Barra
  var node_divBarra = document.createElement('DIV');
  var node_div_0 = document.createElement('DIV');
  var node_iframe = document.createElement('IFRAME');

  //Atributos de los nodos Barra
  node_iframe.setAttribute("id", "iframeLiqen");
  node_iframe.setAttribute("src", appInicio);
  node_divBarra.setAttribute("id", "divBarra");
  node_div_0.setAttribute('style', 'height: 100%;')
  //Estructura de los nodos Barra
  node_div_0.appendChild(node_iframe);
  node_divBarra.appendChild(node_div_0);

  //Insetamos en el body
  document.body.appendChild(node_divBarra);
}

function insertButtons(img1,img2) {
  console.log("ENTRAAAAAAAA!!!!!!!!");
  //Crea los nodos Button
  var node_divButton = document.createElement('div');
  var node_div_1 = document.createElement('div');
  var node_button_0 = document.createElement('button');
  var node_img_1 = document.createElement('img');
  var node_br_0 = document.createElement('br');
  var node_div_2 = document.createElement('div');
  var node_button_1 = document.createElement('button');
  var node_img_2 = document.createElement('img');

  console.log(node_button_0);
  //Atributos de los nodos Button
  node_divButton.setAttribute("id", "divButton");
  node_button_0.setAttribute("class", "buttonBarra");
  node_button_0.setAttribute("type", "button");
  node_img_1.setAttribute("id", "flecha");
  node_img_1.setAttribute("src", img1);
  //node_img_1.setAttribute("src", chrome.extension.getURL('img/glyphicons-224-chevron-right.png'));
  //node_img_1.setAttribute("style", "margin-top: 6px;");
  node_button_1.setAttribute("class", "buttonBarra");
  node_button_1.setAttribute("type", "button");
  node_img_2.setAttribute("id", "ojo");
  node_img_2.setAttribute("src", img2);
  //node_img_2.setAttribute("src", chrome.extension.getURL('img/glyphicons-52-eye-open.png'));
  //node_img_2.setAttribute("style", "margin-top: 9px;");
  //node_img_2.setAttribute("src", "../glyphicons_free/glyphicons/png/glyphicons-52-eye-open.png");

  //Insertamos las acciones
  node_button_0.addEventListener('click', clicFlecha);
  node_button_1.addEventListener('click', clicVista);

  //Estructura de los nodos Button
  node_button_0.appendChild(node_img_1);
  node_button_1.appendChild(node_img_2);
  node_div_1.appendChild(node_button_0);
  node_div_2.appendChild(node_button_1);
  node_divButton.appendChild(node_div_1);
  node_divButton.appendChild(node_br_0);
  node_divButton.appendChild(node_div_2);

  //Insetamos en el body
  document.body.appendChild(node_divButton);
}

function insertPopImg(img3) {
  //Crea los nodos PopImg
  var node_divPopImg = document.createElement('DIV');
  var node_img_3 = document.createElement('IMG');

  //Atributos de los nodos PopImg
  node_divPopImg.setAttribute("class", "popover");
  node_divPopImg.setAttribute("id", "PopImg");
  node_divPopImg.setAttribute("style", "display: none;cursor: pointer;");
  node_img_3.setAttribute("src", img3);

  //Insertamos las acciones
  node_divPopImg.addEventListener('click', clicPopButton);

  //Estructura de los nodos PopImg
  node_divPopImg.appendChild(node_img_3);

  //Insetamos en el body
  document.body.appendChild(node_divPopImg);
}

function insertPopError() {
  //Crea los nodos PopImg
  var node_divPopError = document.createElement('DIV');

  //Atributos de los nodos PopImg
  node_divPopError.setAttribute("class", "popover");
  node_divPopError.setAttribute("id", "PopError");
  node_divPopError.setAttribute("style", "display: none;cursor: pointer;z-index: 110;");

  //Insertamos las acciones
  node_divPopError.addEventListener('click', muestraErrores);

  //Insetamos en el body
  document.body.appendChild(node_divPopError);
}

function insertIframe(appInicio,img1,img2,img3) {
  //console.log("entra insertIframe");
  if(document.getElementById('divBarra') == null){
    //console.log("entra insertIframe IF");

    //Insertamos la Barra lateral
    insertBarra(appInicio);

    //Insertamos la Barra lateral
    insertButtons(img1,img2);
    
    //Insertamos el Pop para crear la anotacion
    insertPopImg(img3);
 
    //insertamos el Pop para errores
    insertPopError();
  }
}

function OnInsert(appInicio,img1,img2,img3, pathAnnot) {

  //console.log("entra OnInsert");
  insertIframe(appInicio,img1,img2,img3);
  //console.log("entra 3");
  var nodeInsert = document.evaluate(pathAnnot, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  console.log(nodeInsert);
  if(nodeInsert){
    nodeInsert.addEventListener('mousedown', mouseDown);
    nodeInsert.addEventListener('mouseup', mouseUp);
  }
}


