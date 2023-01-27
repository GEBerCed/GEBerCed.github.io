/***************************************************************************************************************/
/**********************************      Encriptación     ******************************************************/
/***************************************************************************************************************/
function encriptar()
    {//Lectura de texto ingresado
    let texto_encriptar = (document.querySelector("textarea[id='textoIngresado']")).value;
    //Separación del texto en caracteres
    let texto_separado = texto_encriptar.split("");
    //Aplicación de reglas de encriptación
    for(i=0;i<texto_encriptar.length;i++)
        {switch(texto_encriptar[i])
            {case "e": {texto_separado[i] = "enter"; break;}
            case "i": {texto_separado[i] = "imes"; break;}
            case "a":  {texto_separado[i] = "ai"; break;}
            case "o": {texto_separado[i] = "ober"; break;}
            case "u": {texto_separado[i] = "ufat";}    
            }
        }
    //Reconstrucción del texto encriptado
    let texto_encriptado = "";
    for(i=0;i<texto_encriptar.length;i++)
        {texto_encriptado = texto_encriptado + texto_separado[i];
        }
    //Exhibición de mensaje encriptado
    document.querySelector("textarea[id='textoRetornado']").value = (texto_encriptado);
    }
/***************************************************************************************************************/
/**********************************      Desencriptación     ***************************************************/
/***************************************************************************************************************/
function desencriptar()
    {//Lectura de texto ingresado
    let texto_desencriptar = (document.querySelector("textarea[id='textoIngresado']")).value;
    
    //Inicialización de variable
    let texto_desencriptado = "";
    //Aplicación de reglas de encriptación
    const regex_e = /enter/gi;
    const regex_i = /imes/gi;
    const regex_a = /ai/gi;
    const regex_o = /ober/gi;
    const regex_u = /ufat/gi;

    texto_desencriptado = texto_desencriptar.replace(regex_e , 'e');
    texto_desencriptado = texto_desencriptado.replace(regex_i , 'i');
    texto_desencriptado = texto_desencriptado.replace(regex_a , 'a');
    texto_desencriptado = texto_desencriptado.replace(regex_o , 'o');
    texto_desencriptado = texto_desencriptado.replace(regex_u , 'u');

    //Exhibición de texto desencriptado
    document.querySelector("textarea[id='textoRetornado']").value = (texto_desencriptado);
    } 


/***************************************************************************************************************/
/********************************      Funciones adicionales      **********************************************/
/***************************************************************************************************************/
/***********************    Función omiteTildes()    ***************************/
function omiteTildes(texto_ingresado)
    {//Reemplazo de las vocales tildadas
    const regex_é = /é/gi;
    const regex_í = /í/gi;
    const regex_á = /á/gi;
    const regex_ó = /ó/gi;
    const regex_ú = /ú/gi;

    texto_ingresado = texto_ingresado.replace(regex_á, 'a');
    texto_ingresado = texto_ingresado.replace(regex_é, 'e');
    texto_ingresado = texto_ingresado.replace(regex_í, 'i');
    texto_ingresado = texto_ingresado.replace(regex_ó, 'o');
    texto_ingresado = texto_ingresado.replace(regex_ú, 'u');

    return texto_ingresado;
    }

/***********************    Función transmiteTexto()    ************************/
//Esta función transmite el texto del textarea de encriptación al de desencriptación 
function transmiteTexto()
    {//Garantizamos que el texto ingresado esté escrito en minúsculas
    let texto_tmp = "";
    texto_tmp = document.querySelector("textarea[id='textoIngresado']").value;
    texto_tmp = texto_tmp.toLowerCase();
    texto_tmp = omiteTildes(texto_tmp);
    document.querySelector("textarea[id='textoIngresado']").value = texto_tmp;
    //El texto de salida es igual al de entrada
    document.querySelector("textarea[id='textoRetornado']").value = document.querySelector("textarea[id='textoIngresado']").value;
    }

/***********************    Función limpiar()    ************************/
//Borra todo el contenido en los textarea (ingreso y salida) 
function limpiar()
    {document.querySelector("textarea[id='textoIngresado']").value = "";
    document.querySelector("textarea[id='textoRetornado']").value = "";
    }

/***********************    Función copiar()    ************************/
//Esta función sirve para copiar al portapapeles el contenido del textarea destinado
//al texto de salida
function copiar()
{let texto_copiado = document.getElementById("textoRetornado").value;
navigator.clipboard.writeText(texto_copiado);
}

/***********************    escondeElementoPorId(idElemento)    ************************/
function escondeElementoPorId(idElemento)
    {document.getElementById(idElemento).style.display = "none";
    }

/***********************    muestraElementoPorId(idElemento)    ************************/
function muestraElementoPorId(idElemento)
    {document.getElementById(idElemento).style.display = "inline-block";
    }

function verificaBotones()
    {//Revisamos si alguno de los botones asignados al texto de ingreso fue presionado
    document.getElementById("encriptar").addEventListener("click",(e) =>{
        if(document.querySelector("textarea[id='textoIngresado']").value!="")
            {idBoton="encriptar";
            }});
    document.getElementById("desencriptar").addEventListener("click",(e) =>{
        if(document.querySelector("textarea[id='textoIngresado']").value!="")
            {idBoton="desencriptar";
        }});
    document.getElementById("limpiar").addEventListener("click",(e) =>{idBoton="limpiar";});
    if(idBoton=="limpiar")
        {verificarTexto();
        document.getElementById("encriptar").disabled=false;
        document.getElementById("desencriptar").disabled=false;
        document.getElementById("textoIngresado").readOnly=false;
        document.getElementById("textoIngresado").focus();
        }
    else if(idBoton=="encriptar" || idBoton=="desencriptar")
        {document.getElementById("encriptar").disabled=true;
        document.getElementById("desencriptar").disabled=true;
        document.getElementById("textoIngresado").readOnly=true;
        }
    }

/***********************    Función verificarTexto()   ***********************/
//Esta función comprueba si el texto ingresado es distinto de vacío, en caso afirmativo, transmite el texto 
//hacia el texto de salida y esconde la imagen decorativa en la zona del texto retornado
function verificarTexto()
    {let texto = document.querySelector("textarea[id='textoIngresado']").value; 
        if (texto != "")
            {transmiteTexto();
            escondeElementoPorId("imagenBuscador");
            escondeElementoPorId("advertencia");
            muestraElementoPorId("textoRetornado");
            muestraElementoPorId("copiar");
            }
        else
            {muestraElementoPorId("imagenBuscador");
            muestraElementoPorId("advertencia");
            escondeElementoPorId("textoRetornado");
            escondeElementoPorId("copiar");
            document.querySelector("textarea[id='textoRetornado']").value = "";
            }
    }

/***************************************************************************************************************/
/********************************                Main             **********************************************/
/***************************************************************************************************************/
//Inicialización de variable
var idBoton="limpiar";
var texto_copiado="";
//Al cargar la página escondemos el textarea para el texto de salida
window.addEventListener("load", (evento) =>{
    escondeElementoPorId("textoRetornado");
    escondeElementoPorId("copiar");
    });
//Sondeamos los botones cada 10ms
setInterval(verificaBotones,10);



