import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
/*
metodos http
GET -> listar
Post -> criar
Put -> Editar vários
Patch-> Editar um
Delete-> deletar
*/


//1- Tipo de rota / método http | 2- Endereço /exemplo.com/endereço 

app.post('/usuarios', async(req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.nome,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.get('/usuarios', async(req, res) => {
    let users= []
    if (req.query) {
        users=await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else{
        const users = await prisma.user.findMany()
    }


    res.status(200).json(users)
})

app.put('/usuarios/:id', async(req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.nome,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async(req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso.'})
})
app.listen(3000)

/*
    Status HTTP
    2xx - ok
    4xx - Erro Cliente
    5xx - Erro Servidor
*/