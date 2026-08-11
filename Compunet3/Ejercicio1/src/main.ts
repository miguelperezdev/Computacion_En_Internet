
import { miguel2 } from './classes/student-minify.ts'
import { miguel } from './objects/objects.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<h1>Hola mundo</h1>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML += `
<p>${JSON.stringify(miguel)}</p>
`
