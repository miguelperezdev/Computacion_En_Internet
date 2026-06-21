#  Trivia Challenge — Corporate Practice Mode

Aplicación web de trivia construida con **Vite + React** que consume la [Open Trivia DB](https://opentdb.com). Permite a los participantes de eventos corporativos practicar antes del evento real.

---

Por:
- Miguel Perez Ojeda - A00407054

## Estructura del Proyecto

```
src/
├── context/
│   └── GameContext.jsx       # Contexto global + proveedor
├── components/
│   ├── Setup.jsx / .css      # Pantalla de configuración
│   ├── Game.jsx / .css       # Pantalla de juego (contenedor)
│   ├── QuestionCard.jsx/.css # Tarjeta de pregunta (requerido por spec)
│   ├── ScoreBar.jsx / .css   # Barra de puntaje y progreso
│   ├── Results.jsx / .css    # Pantalla de resultados
│   └── Loading.jsx / .css    # Pantalla de carga
├── App.jsx                   # Router por pantalla
├── main.jsx                  # Entry point
└── index.css                 # Variables CSS + estilos globales
```

---

## Descripción de Componentes

### `GameContext.jsx`
Proveedor de contexto global. Contiene toda la lógica de estado persistente del juego. Expone funciones para configurar la partida, iniciarla, responder preguntas y volver al menú. También gestiona la persistencia en `localStorage`.

### `App.jsx`
Componente raíz. Envuelve la app en el `GameProvider` y renderiza el componente correcto según `state.screen`: `setup → loading → game → results`.

### `Setup.jsx`
Pantalla inicial de configuración. El usuario elige cantidad de preguntas, dificultad y categoría. Llama a la API para obtener las categorías y, al confirmar, llama a la API para cargar las preguntas y arranca el juego.

### `Loading.jsx`
Pantalla de transición animada que se muestra mientras se esperan las preguntas de la API.

### `Game.jsx`
Contenedor de la pantalla de juego activo. Simplemente compone `ScoreBar` arriba y `QuestionCard` abajo.

### `ScoreBar.jsx`
Barra sticky en la parte superior durante el juego. Muestra: categoría, dificultad, índice de pregunta actual / total, puntaje en tiempo real y barra de progreso.

### `QuestionCard.jsx` *(requerido por spec)*
Componente principal del juego. Muestra la pregunta actual y sus cuatro opciones (mezcladas al cargar). Al seleccionar una respuesta:
- Resalta la respuesta elegida (verde = correcta, rojo = incorrecta).
- Revela siempre cuál era la respuesta correcta.
- Muestra un banner de feedback.
- Después de 900ms llama a `answerQuestion()` para avanzar.

### `Results.jsx`
Pantalla final. Calcula la nota (S/A/B/C/F), muestra estadísticas (puntaje, correctas, incorrectas, precisión) y un listado de revisión de todas las preguntas con la respuesta elegida y la correcta. Permite jugar de nuevo (mismos ajustes) o volver a configuración.

---

## Variables en el Contexto Global (`GameContext`)

El contexto almacena un único objeto `state`. Todas las pantallas acceden a él vía `useGame()`.

| Variable | Tipo | Descripción | Pantallas que la usan |
|---|---|---|---|
| `screen` | `string` | Pantalla activa: `setup`, `loading`, `game`, `results` | `App` (router) |
| `totalQuestions` | `number` | Cantidad de preguntas elegidas | `Setup`, `Results` (replay) |
| `categoryId` | `string` | ID de la categoría (param para la API) | `Setup`, `Results` (replay) |
| `categoryName` | `string` | Nombre de la categoría para mostrar | `ScoreBar`, `Results` |
| `difficulty` | `string` | `easy` / `medium` / `hard` | `Setup`, `ScoreBar`, `Results` |
| `questions` | `array` | Preguntas traídas de la API (con `shuffled_answers`) | `QuestionCard`, `ScoreBar`, `Results` |
| `currentIndex` | `number` | Índice de la pregunta actual | `QuestionCard`, `ScoreBar` |
| `score` | `number` | Puntaje actual (+1 correcta / -1 incorrecta) | `ScoreBar`, `Results` |
| `answers` | `array` | Historial: `{questionIndex, correct, chosen}` | `Results` |

---

## Variables de Estado Local por Pantalla (`useState`)

### `Setup.jsx`
| Variable | Tipo | Descripción |
|---|---|---|
| `categories` | `array` | Lista de categorías obtenidas de la API |
| `loadingCats` | `boolean` | Indica si se están cargando las categorías |
| `loadingGame` | `boolean` | Indica si se están cargando las preguntas |
| `error` | `string` | Mensaje de error a mostrar al usuario |
| `localAmount` | `number` | Cantidad seleccionada (buffer antes de confirmar) |
| `localCategory` | `string` | ID de categoría seleccionada (buffer) |
| `localCategoryName` | `string` | Nombre de categoría seleccionada (buffer) |
| `localDifficulty` | `string` | Dificultad seleccionada (buffer) |

> Las variables `local*` son un buffer local que solo se persisten al contexto global cuando el usuario presiona "Start Game". Esto evita modificar el contexto con cambios no confirmados.

### `QuestionCard.jsx`
| Variable | Tipo | Descripción |
|---|---|---|
| `selected` | `string \| null` | Texto de la respuesta que el usuario eligió |
| `revealed` | `boolean` | Si ya se mostró el resultado (feedback activo) |

### `Results.jsx`
No tiene `useState` propio. Todo viene del contexto global.

---

## Efectos (`useEffect`) por Pantalla

### `Setup.jsx`

```js
// Cargar categorías al montar el componente
useEffect(() => {
  axios.get('https://opentdb.com/api_category.php')
    .then(res => setCategories(res.data.trivia_categories))
    .catch(() => setError('Could not load categories.'))
    .finally(() => setLoadingCats(false))
}, [])
// Dependencias: [] → se ejecuta solo una vez al montar Setup
```

**Propósito:** Poblar el selector de categorías con los datos reales de la API antes de que el usuario configure la partida.

---

### `QuestionCard.jsx`

```js
// Resetear selección cuando cambia la pregunta
useEffect(() => {
  setSelected(null)
  setRevealed(false)
}, [currentIndex])
// Dependencias: [currentIndex] → se ejecuta cada vez que avanza la pregunta
```

**Propósito:** Limpiar el estado visual (respuesta seleccionada, feedback) cuando la app avanza a la siguiente pregunta. Sin este efecto, la respuesta anterior quedaría resaltada en la nueva pregunta.

---

### `GameContext.jsx`

```js
// Persistir el estado del juego en localStorage
useEffect(() => {
  if (state.screen === 'game' || state.screen === 'results') {
    localStorage.setItem('trivia_session', JSON.stringify(state))
  } else {
    localStorage.removeItem('trivia_session')
  }
}, [state])
// Dependencias: [state] → se ejecuta en cada cambio de estado global
```

**Propósito:** Implementar R4 (partida persistente). El estado se serializa en cada cambio para que si el usuario recarga o cierra la pestaña, la partida pueda restaurarse.

---

## Persistencia (R4) — Flujo Completo

1. **Al cargar la app:** `GameContext` inicializa su estado leyendo `localStorage`. Si encuentra una sesión con `screen === 'game'`, la restaura completamente.
2. **Durante el juego:** El `useEffect` de persistencia serializa `state` en cada cambio.
3. **Al terminar:** También persiste el estado de resultados.
4. **Al volver al setup:** `goToSetup()` llama a `localStorage.removeItem()` y resetea al estado inicial.

---

## Lista de Prompts Usados con IA

Durante el desarrollo usé ChatGPT y GitHub Copilot puntualmente para resolver dudas específicas y depurar errores. No generé el código completo con IA; la arquitectura, la lógica y la estructura de componentes las diseñé yo, y recurrí a estas herramientas cuando me trabé en algo concreto.

---

### Prompt 1 — Duda sobre cómo leer `localStorage` al inicializar `useState`

**Pregunta:** "¿como se puede inicializar un `useState` leyendo de `localStorage` para evitar que se me ejecute en cada Render?"

**Para qué:** Tenía la lógica de persistencia funcionando en el `useEffect`, pero el estado se inicializaba vacío y después se pisaba. Aprendí a usar la función initializer de `useState` (pasar una función en vez del valor directo) para leer `localStorage` solo una vez al montar.

**Resultado:** Implementé el initializer en `GameContext.jsx`:
```js
const [state, setState] = useState(() => {
  const saved = localStorage.getItem('trivia_session')
  return saved ? JSON.parse(saved) : defaultState
})
```

---

### Prompt 2 — Error al mezclar las respuestas

**Pregunta:** "Tengo un fallo y es que las respuestas se me mezclan distinto cada vez que el componente rerenderiza. por que pasa esto?"

**Para qué:** Al principio mezclaba las respuestas dentro del render de `QuestionCard`, lo que causaba que se reordenaran en cada re-render. La IA me explicó que la mezcla debía hacerse una sola vez al cargar las preguntas, no en el render.

**Resultado:** Moví el `.sort(() => Math.random() - 0.5)` al momento de procesar las preguntas en `Setup.jsx`, guardando `shuffled_answers` directamente en el objeto de cada pregunta.

---

### Prompt 3 — HTML entities en el texto de las preguntas

**Pregunta:** "Las preguntas muestran cosas como `&amp;` o `&#039;` en vez del texto correcto. Cómo corrijo bien esta parte en React?"

**Para qué:** La API de Open Trivia DB devuelve el texto con HTML entities y no se renderizaban bien.

**Resultado:** Me sugirieron usar un `<textarea>` del DOM para decodificar:
```js
function decodeHtml(html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}
```
Lo agregué a `QuestionCard.jsx` y a `Results.jsx`.

---

### Prompt 4 — `useEffect` para resetear el estado entre preguntas

**Pregunta:** "Cuando paso de una pregunta a otra, el boton que elegi en la pregunta anterior sigue coloreado. Cómo lo reseteo?"

**Para qué:** `selected` y `revealed` son estado local del componente, y al cambiar `currentIndex` el componente no se desmonta, así que el estado local no se reseteaba solo.

**Resultado:** Agregué un `useEffect` con `[currentIndex]` como dependencia para hacer el reset:
```js
useEffect(() => {
  setSelected(null)
  setRevealed(false)
}, [currentIndex])
```

---

### Prompt 5 — `response_code` de la API

**Pregunta:** "¿Qué significa el campo `response_code` que devuelve Open Trivia DB?"

**Para qué:** Al probar con algunas combinaciones de categoría + dificultad + cantidad, la API devolvía un array vacío sin tirar error HTTP. No entendía por qué.

**Resultado:** Aprendí que `response_code: 1` significa que no hay suficientes preguntas para esa configuración. Agregué una validación explícita en el handler de inicio:
```js
if (res.data.response_code !== 0) {
  setError('Not enough questions for this configuration.')
  return
}
```

---

**Prompt 6 — Ayuda con el CSS general de la app**

**Pregunta:** "Tengo los componentes funcionando pero el CSS se ve muy feo . ¿Me ayudas a mejorar el diseño visual porfa es que quiero algo limpio, con tema claro, buena tipografía y que se vea ordenado. solo que sea agradable."

**Para qué:** El diseño base que tenía era solo estilos inline y un par de clases sueltas. Le pedí ayuda para estructurar mejor el CSS con variables globales, mejorar espaciados, tipografía y los estados visuales de los botones de respuesta (correcto/incorrecto).

---

**Prompt 7 — Ayuda para terminar el README**

**Pregunta:** "Ya tengo el proyecto terminado, ¿me ayudas a armar el README? Necesito que tenga la descripción de los componentes, las variables del contexto, los useState y useEffect de cada pantalla. Yo te explico lo que hice y tú me ayudas a redactarlo bien."

---
# trivia-app

app de trivia para practicar antes del evento corporativo, consume la API de Open Trivia DB que es gratuita y no necesita key.

## como correr el proyecto

primero instalar dependencias:

npm install

despues correr en local:

npm run dev

## estructura

la app tiene varias pantallas: una de configuracion antes de empezar, la del juego como tal, y al final la de resultados. la navegacion entre pantallas la manejo con un estado en el contexto global en vez de usar react router porque me parecio mas sencillo para este caso.

los componentes principales son:

- Setup: donde el usuario elige cuantas preguntas quiere, la categoria y la dificultad
- QuestionCard: muestra la pregunta y las 4 opciones, cuando el usuario responde le muestra si estuvo bien o mal
- ScoreBar: barra de arriba que muestra el puntaje y en que pregunta va
- Results: pantalla final con el resumen de como le fue

## contexto global

use el API de contexto de react para guardar todo lo de la partida: las preguntas, el indice actual, el puntaje, las respuestas que ha dado el usuario y la configuracion. asi cualquier componente puede acceder a eso sin estar pasando props para todos lados.

## persistencia

para que la app recuerde por donde iba el usuario si recarga la pagina, guardo el estado en localStorage cada vez que cambia. al iniciar la app reviso si hay algo guardado y si hay lo cargo.

## API

uso axios para hacer las peticiones. hay dos endpoints que use:
- uno para traer las categorias al inicio
- otro para traer las preguntas con los filtros que eligio el usuario

las respuestas vienen con html entities entonces toco decodificarlas antes de mostrarlas.

## notas

- las respuestas se mezclan al cargarlas para que no siempre este la correcta en el mismo lugar
- el puntaje es +1 si acierta y -1 si falla
- desde la pantalla de resultados puede volver a jugar con la misma config o cambiar las opciones
---

**Para qué:** Tenía las notas de lo que había hecho pero me costaba redactarlo de forma clara y ordenada para la entrega. La IA me ayudó con la estructura y el formato del documento.
```

## Cómo Ejecutar

```bash
npm install
npm run dev
```

> Requiere conexión a internet para acceder a [opentdb.com](https://opentdb.com).
