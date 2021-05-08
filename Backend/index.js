//IMPORTS
const express = require('express')
const connection = require('../Backend/connection')
const UserController = require('./User/UserController')

//Models
const User = require('./User/User')

//CONECTANDO AO BANCO DE DADOS
connection
    .authenticate()
    .then(() => {
        console.log('Connection: SUCESS')
    })
    .catch((erro) => {
        console.log(erro)
    })


// INSTANCIANDO UM APP EXPRESS
const app = express()
app.use(express.json())


//DIZERNDO AO APP PARA UTILIZAR AS ROTAS DO CONTROLLER
app.use('/', UserController)

app.get('/', (req, res) => {
    res.json({
        saudacao: 'Ola'
    })
})

app.get('/login', (req, res) => {
    res.json({
        login: true
    })
})

app.get('/register', (req, res) => {
    res.json({
        register: true
    })
})



//SERVIDOR CRIADO E OUVINDO A PORTA 5000
app.listen(5000, () => {
    console.log('Server is running')
})