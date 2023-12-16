let createForm = document.getElementById('create-form')
let createNameInput = document.getElementById('create-name-input')
let createPowerInput = document.getElementById('create-power-input')
let createHealthInput = document.getElementById('create-health-input')
let deleteForm = document.getElementById('delete-form')
let deleteByNameInput = document.getElementById('delete-by-name-input')

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
        loadFightersToDom(response.data)
    })
    .catch((error) => {
        console.log(error)
    })

})

deleteForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let name = deleteByNameInput.value

    axios.delete('/delete-fighter?name=' + name)
    .then((response) => {
        loadFightersToDom(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
})

axios.get('/fighters')
.then((result) => {
    loadFightersToDom(result.data)
})
.catch((error) => {
    console.log(error)
})



function loadFightersToDom(fightersArray) {
    //start with a clean slate: wipe all fighters out of the DOM
    //before we put new ones in
    document.getElementById('fighters-display').innerHTML = ''

    for (let i = 0; i < fightersArray.length; i++) {
        //I'm gonna need to make 4 new elements
        let containerDiv = document.createElement('div')
        let heading = document.createElement('h3')
        let powerP = document.createElement('p')
        let healthP = document.createElement('p')

        //three of those will need to go in the one
        containerDiv.appendChild(heading)
        containerDiv.appendChild(powerP)
        containerDiv.appendChild(healthP)

        //three of them will need to have text based
        //off of the particular fightersArray object
        heading.innerHTML = fightersArray[i].name
        powerP.innerHTML = 'Power: ' + fightersArray[i].power
        healthP.innerHTML = 'Health ' + fightersArray[i].health

        //and then last of all, I'll need to put that
        //one that contains the three in the DOM
        //as a child of my fighters-display div
        document.getElementById('fighters-display').appendChild(containerDiv)
    }
}