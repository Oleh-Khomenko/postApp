const express = require('express')
const CORS = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 5000

app.use(CORS())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

class Post {
    constructor(message, id) {
        this.message = message
        this.id = id
    }
}

let posts = [new Post('Server initial state!', 0)]

app.get('/posts', (req, res) => {
    try {
        res.status(200).json({posts})
    } catch (e) {
        console.log(e)
    }
})

app.post('/posts', (req, res) => {
    try {
        console.log(`post data on server id: ${req.body.id}`)
        posts.unshift(new Post(req.body.post, req.body.id))
        res.status(200).json({'ok': true})
    } catch (e) {
        console.log(e)
        res.status(500).json({'ok': false})
    }
})

app.delete('/posts', (req, res) => {
    try {
        console.log(req.body.post)
        console.log(posts)
        posts = posts.filter((el) => el.id !== req.body.id)
        console.log(posts)
        res.status(200).json({'ok': true})
    } catch (e) {
        console.log(e)
        res.status(500).json({'ok': false})
    }
})

app.listen(PORT, () => console.log('started...'))