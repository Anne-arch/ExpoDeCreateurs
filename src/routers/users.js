const express = require ("express")
const User = require("../../models/user")

//creer un router
const router = new express.Router()

router.post("/users", async (req,res) => {
    try{
    const newUser = new User(req.body)
    const document = await newUser.save()
    //res.send("Utilisateur...")
    res.status(201).json(document)
    }catch{
        res.status(500).send("erreur lors de la creation d'un utilisateur")
    }
})

//export du module
module.exports = router

//pour criptage
//npmjs.comm
//argon2  node-argon2