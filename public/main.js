let createForm = document.getElementById('create-form')
let createNameInput = document.getElementById('create-name-input')
let createPowerInput = document.getElementById('create-power-input')
let createHealthInput = document.getElementById('create-health-input')

createForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (isNaN(+createPowerInput.value)) {
        alert('put a number in for the power, you fool!')
        return
    }

    if (isNaN(+createHealthInput.value)) {
        alert('put a number in for the health, you adorable user, you!')
        return
    }

    let maBod = {
        name: createNameInput.value,
        power: createPowerInput.value,
        health: createHealthInput.value
    }

    axios.post('/create-fighter', maBod)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
    })

})