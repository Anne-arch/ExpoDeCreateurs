//import module
const express = require("express")
const argon2 = require("argon2")
const User = require("../../models/user")


//creation router
const router = new express.Router()

//creetion routes
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})//equivaut {username: username}
        if (!user) {
            return res.status(401).send("Erreur de mot de passe et/ou d'identifiant")
        }
        const match = await argon2.verify(user.password, password)
        if (!match) {
            console.log("erreur pwd")
            return res.status(401).send("Erreur de mot de passe et/ou d'identifiant")
        }
        res.send("Login success")
    } catch (e) {//on peut (e) pour traiter l'erreur
        console.log(e)
        res.status(500).send("erreur lors du login")
    }
})

//export 
module.exports = router