/* function to show and refresh time */
function printTime() {
    let currentTime = new Date().toLocaleString('gr',{hour12: false})
    let timeToPrint = currentTime.replace(","," -")
    const dateElement = document.querySelector(".header").innerHTML = timeToPrint
}

setInterval(printTime, 1000)


/* manage all cases*/
let counter = 0

// the footer '+' button element
const addBtn = document.querySelector(".add-button")

addBtn.addEventListener('click', function() {

    const noteToRead = document.querySelector("#note-name")
    if(noteToRead.value === "") {
        console.log("Note to be added is blank")
        popup("Note to be added is blank. Please try again.")
        return
    }

    let firstLi = document.querySelector("li:first-of-type")

    // .main > ul in notes.css is initially display: none
    if (!counter) {
        firstLi.querySelector(".item label").innerHTML = noteToRead.value
        firstLi.querySelector(".item input").checked = false
        firstLi.querySelector(".item label").classList.remove("cross-line")
        addToggleCrossLineListener(firstLi)
        addRemoveLiListener(firstLi)
        document.querySelector(".main > ul").style.display = 'block'
    } else {
        let cloneLi = firstLi.cloneNode(true)
        cloneLi.querySelector(".item input").checked = false
        cloneLi.querySelector(".item label").classList.remove("cross-line")
        cloneLi.querySelector(".item label").innerHTML = noteToRead.value
        addToggleCrossLineListener(cloneLi) 
        addRemoveLiListener(cloneLi)
        document.querySelector(".main > ul").append(cloneLi)
    }
    counter++
    popup("Note inserted")
    noteToRead.value =""
})


function popup(message) {
    alert(message)
}

function addToggleCrossLineListener(e) {
    e.querySelector(".item input").addEventListener('click', function() {
        e.querySelector(".item label").classList.toggle("cross-line")
    })
}

function addRemoveLiListener(e) {
    e.querySelector("button").addEventListener('click', function() {
        if(counter === 1) {
            document.querySelector(".main > ul").style.display = 'none'
            counter--
            return
        }
        while(e.firstChild) {
            e.removeChild(e.firstChild)
        }
       e.remove()
       counter--
    })
}




