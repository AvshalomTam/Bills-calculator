// const socket = io()

const $retrieveButton = document.querySelector('#retrieve')

const messageDB = document.querySelector('#oldClocks')

$retrieveButton.addEventListener('click', (e) => {
    e.preventDefault()
    // const str = 'Kilowatt'
    const kind = 'Water'
    fetch('/clocks?kind=' + kind).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageDB.textContent = data.error
            } else {
                // messageDB.textContent = data.clocks
                messageDB.textContent = data.kind

            }  
        })
    })

    // messageDB.textContent = 'hiiiiiiiiiiiiii'
})