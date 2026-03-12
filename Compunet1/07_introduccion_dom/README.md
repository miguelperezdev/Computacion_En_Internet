# Introducción al DOM - Proyecto de Ejemplo

Este proyecto ilustra los conceptos básicos del Document Object Model (DOM) utilizando HTML y JavaScript.

## ¿Qué es el DOM?

El **DOM (Document Object Model)** es una interfaz de programación para documentos web. Representa la estructura del documento como un árbol de nodos, donde cada nodo corresponde a un objeto (elementos HTML, texto, atributos, etc.). El DOM permite:

- Acceder y modificar contenido, estructura y estilos.
- Responder a eventos (clics, teclas, etc.).
- Interactuar dinámicamente con la página.

## Ejemplo de Código:

`index.html` 

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Intro DOM</title>
    </head>
    <body>
        <p id="messageText">Parrafo</p>    
        <textarea id="inputText">Ingresa texto aquí...</textarea>

        <button onclick="addTextToList()">Agregar a la lista</button>

        <form id="formElement">
            <ul id="formList">
                <li>Elemento 1</li>
                <li>Elemento 2</li>
            </ul>
        </form>

        <button onclick="showMessage()">Mostrar Mensaje</button>
        <button onclick="showParagraph()">Mostrar Contenido del Párrafo</button>

        <script src="index.js"></script>
    </body>
</html>
```

`index.js`: 

```javascript
let msgText; 

window.onload = () => {
    msgText = document.getElementById("messageText");
    console.log("Texto inicial del párrafo:", msgText.innerText);

    const input = document.getElementById("inputText");
    console.log("Contenido del textarea:", input.value);

    const listElement = document.getElementById("formList");
    const elements = document.querySelectorAll("#formList li");

    elements.forEach((element, index) => {
        console.log(`Elemento ${index + 1}:`, element);
        element.textContent = `Nuevo elemento ${index + 1}`;
    });

    msgText.addEventListener("click", () => {
        msgText.style.color = "#FF5733";
    });
};

function showMessage() {
    console.log("¡Botón activado! Esta es la función 2.");
}

function showParagraph() {
    console.log("Contenido actual del párrafo:", msgText.innerHTML);
}


function addTextToList() {
    const input = document.getElementById("inputText");
    const list = document.getElementById("formList");

    if (input.value.trim() !== "") {  
        const newItem = document.createElement("li");
        newItem.textContent = input.value;
        list.appendChild(newItem);
        input.value = "";  
    }
}
```

### Montaje sobre un servidor Apache tomcat

Para instalar el servidor apache tomcat sin permisos de super usuario: 

```bash
curl https://dlcdn.apache.org/tomcat/tomcat-11/v11.0.13/bin/apache-tomcat-11.0.13.tar.gz --output ./tomcat.tar.gz
tar xzvf tomcat.tar.gz
```

Para montar el `frotend` dentro del servidor: 

```bash
cd ~/apache-tomcat-11.0.13/webapps/ROOT
```

En este directorio, deberá copiar los archivos `index.html`  e `index.js` , una vez hecho esto debe ejecutar: 

```bash
~/apache-tomcat-11.0.13/bin/startup.sh
```

### Detalles:

El `window.onload = () => { ... }` en JavaScript es un **event handler** que se ejecuta cuando la página web ha terminado de cargarse por completo, incluyendo todos sus recursos (imágenes, estilos, scripts, etc.).

### Interacción entre Archivos

1. **`index.html`**: Define la estructura y el contenido inicial de la página web. Contiene elementos como un título, un párrafo, un área de texto, botones y una lista. Importa el script `index.js` al final del `<body>`, lo que asegura que el HTML se cargue antes de que se ejecute el JavaScript.
2. **`index.js`**: Contiene la lógica para manipular los elementos del DOM definidos en `index.html`. Las funciones en este archivo son llamadas en respuesta a eventos (como clics de botón o la carga de la página) para modificar el contenido, añadir nuevos elementos o cambiar estilos.

### Resumen de Componentes en `index.js`

El archivo `index.js` contiene varias funciones y un manejador de eventos principal:

- `showMessage()`: Una función de demostración que se ejecuta al hacer clic en el botón "Show Message". Imprime en la consola varios ejemplos de comparaciones en JavaScript, mostrando las diferencias entre `==` (igualdad de valor) y `===` (igualdad estricta, valor y tipo), y el comportamiento de `null` y `undefined`.

- `addTextToList()`: Se activa al pulsar el botón "Agregar". Esta función:
  
  1. Obtiene el elemento de la lista (`<form id="formElement">`) y el campo de texto (`<textArea id="inputText">`).
  2. Verifica que el texto introducido no esté vacío.
  3. Crea un nuevo elemento de lista (`<li>`).
  4. Asigna el valor del campo de texto al contenido del nuevo `<li>`.
  5. Añade el nuevo `<li>` a la lista en el DOM.
  6. Limpia el campo de texto.

- `window.onload`: Este bloque de código se ejecuta automáticamente una vez que toda la página se ha cargado por completo. Realiza dos tareas principales:
  
  1. **Modificación de la lista existente**: Selecciona todos los elementos `<li>` iniciales y cambia su contenido de texto para demostrar cómo se puede modificar el DOM al cargar la página.
  2. **Asignación de un Event Listener**: Selecciona el párrafo con `id="msgText"` y le añade un detector de eventos para el "clic". Cuando el usuario hace clic en el párrafo, su color de texto cambia a azul cian (`#00dfff`).
