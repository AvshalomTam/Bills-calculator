// const socket = io()

const $retrieveButton = document.querySelector('#retrieve')
const monthPick = document.querySelector('#monthPickRet')
const yearhPick = document.querySelector('#yearPickRet')

const messageDB = document.querySelector('#oldClocks')

$retrieveButton.addEventListener('click', (e) => {
    e.preventDefault()
    // const str = 'Kilowatt'
    const kind = 'Water'
    console.log(monthPickRet.value)
    console.log(yearPickRet.value)
    const year = yearPickRet.value
    const month = monthPickRet.value
    fetch('/clocks?kind=' + kind + '&year=' + year + '&month=' + month).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageDB.textContent = data.error
            } else {
                // messageDB.textContent = data.clocks
                console.log(data)
                messageDB.textContent = data

            }  
        })
    })

    // messageDB.textContent = 'hiiiiiiiiiiiiii'
})