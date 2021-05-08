const express = require('express')
const User = require('./User')
const bcrypt = require('bcrypt')


const Router = express.Router()


Router.get('/user', (req, res) => {
    User.findAll()
        .then((users) => {
            res.json({
                    users
                })
                .catch((erro) => {
                    console.log()
                })
        })
})

Router.post('/user/create', (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    if (name == undefined || email == undefined || password == undefined) {
        res.status(403)
        res.json({
            erro: 'Parâmetro inválido'
        })
    } else {
        User.findOne({
                where: {
                    email: email
                }
            })
            .then((user) => {
                if (user != undefined) {
                    res.status(401)
                    res.json({
                        erro: 'Já existe uma conta com este email.'
                    })
                } else {
                    const salt = bcrypt.genSaltSync()
                    const hash = bcrypt.hashSync(password, salt)

                    User.create({
                            name: name,
                            email: email,
                            password: hash,
                            admin: false
                        })
                        .then(() => {
                            res.status(201)
                            res.json({
                                result: 'Conta criada com sucesso'
                            })
                        })
                        .catch((erro) => {
                            console.log(erro)
                        })
                }
            })
    }
})

Router.post('/user/login', (req, res) => {
    const {
        email,
        password
    } = req.body

    if (email == undefined || password == undefined) {
        res.status(400)
        res.json({
            erro: 'Parâmetros inválidos.'
        })
    } else {
        User.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                if (user != undefined) {
                    validPassword = bcrypt.compareSync(password, user.password)
                    if (validPassword) {
                        res.status(200)
                        res.json({
                            user: user
                        })
                    } else {
                        res.status(401)
                        res.json({
                            erro: 'Email ou senha inválidos.'
                        })
                    }
                } else {
                    res.status(404)
                    res.json({
                        erro: 'Email não cadastrado.'
                    })
                }
            })
            .catch((erro) => {
                console.log(erro)
            })
    }
})

module.exports = Router