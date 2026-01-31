
let inputText 

window.onload = () => {
    msgText = 
	document.getElementById("textMessage")

    console.log("Texto inicial: ", 
	msgText.innerText)

    inputText = 
	document.getElementById("areaMessage")

    console.log(inputText.value)

    const listElements =
	document.getElementById("formList")

    const elemnets = 
	document.querySelectorAll("#formList li")

    elemnets.forEach( (elemnet, index) => {
	console.log(`Element ${index}`, elemnet)
	elemnet.textContent = `Nuevo elemento: ${index}`
    } )


}

function addTextToList() {
    const input = document.getElementById("areaMessage")
    const list =  document.getElementById("formList")

    if(input.value.trim() !== ""){
	const newItem = document.createElement("li")
	newItem.textContent = inputText.value
	list.appendChild(newItem)
	input.value = ""
    }
	
}

function showMessage(){
    console.log(inputText.value)
}
