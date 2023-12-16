import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

let app = express()

app.use(express.json())

let db = []

//showing how we derived the full path to our HTML file
// console.log(import.meta.url)
// console.log(fileURLToPath(import.meta.url))
// console.log(dirname(fileURLToPath(import.meta.url)))
// console.log(join(dirname(fileURLToPath(import.meta.url)), '/public/index.html'))

//this replaces the commented out get routes below
app.use(express.static(join(dirname(fileURLToPath(import.meta.url)), '/public')))

// app.get('/', (req, res) => {
//     res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/index.html'))
// })

// app.get('/css', (req, res) => {
//     res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/styles.css'))
// })

// app.get('/js', (req, res) => {
//     res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/main.js'))
// })

app.get('/fighters', (req, res) => {
    res.status(200).send(db)
})

app.post('/create-fighter', (req, res) => {
    db.push(req.body)
    res.status(200).send(db)
})

app.delete('/delete-fighter', (req, res) => {
    let name = req.query.name

    //search through my array and delete any fighters with a name that is the name variable
    for (let i = 0; i < db.length; i++) {
        if (db[i].name === name) {
            db.splice(i, 1)
            i--
        }
    }

    res.status(200).send(db)
})

app.listen(8080, () => {
    console.log('we have started the server on port 8080')
})
