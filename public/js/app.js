console.log('Client side jS is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    url = `http://localhost:3000/weather?address=${search.value}`

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.message
            }     
        })
    })
})