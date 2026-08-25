//import mensaje from './basics/basics';
import { gus } from './classes/student';
//import { gus2 } from './classes/student-minify';
//import { studentIds } from './objects/objects';
//import { class03 } from './objects/objects';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<p>${JSON.stringify(gus)}</p>
`

