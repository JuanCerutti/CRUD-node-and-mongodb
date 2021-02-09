const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items')
const app = express();
app.use(express.urlencoded({extended: true}))

const mongodb = 'mongodb+srv://juancerutti:GreedyMe2020@cluster0.qn1jy.mongodb.net/item-database?retryWrites=true&w=majority'
app.set('view engine', 'ejs')


mongoose
    .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('conected')
        app.listen(3000);
    })
    .catch((error) => console.log(error));


/*app.get('/crear-item', (req, res) => {
    const item = new Item({
        name:'phone',
        price:2332
    })
    item.save().then(result => res.send(result))
})

app.get('/buscar-items', (req, res) => {
    Item.find().then(result => res.send(result)).catch(err => console.log(err))
})*/

app.get('/buscar-item', (req, res) => {
    Item.findById("6021530b74ab4b0a6004c414").then(result => res.send(result)).catch(err => console.log(err))
})

app.get('/', (req, res) => {
    res.redirect('/buscar-items')
})

app.get('/buscar-items', (req, res) => {
    Item.find().then(result =>{
        res.render('index', { items: result })
    }).catch(err => console.log(err))
})

app.get('/agregar-item', (req, res) => {
    res.render('agregar-item')
})

app.post('/items', (req, res) => {
    //console.log(req.body); //traemos los datos del formulario
    const item = Item(req.body);
    item.save().then(() => {
        res.redirect('/')
    }).catch(err => console.log(err))
})

app.get('/items/:id', (req, res) => {
    //console.log(req.params); //devuelve los id que traemos del front
    const id = req.params.id;
    Item.findById(id).then(result => {
        //console.log(result)
        res.render('item-detalle', {item: result})
    })
})

app.delete('/items/:id', (req, res) => {
    //console.log(req.params); //devuelve los id que traemos del front
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/' })
    })
})

app.put('/items/:id', (req, res) => {
    //console.log(req.params); //devuelve los id que traemos del front
    const id = req.params.id;
    Item.findByIdAndUpdate(id, req.body).then(result => {
        res.json({ msg: 'Update Successfully' })
    })
})


app.use((req, res) => {
    res.render('404')
})

