//npm init -y
//npm install 
//https://www.mongodb.com/cloud/atlas/register
//baba@baba.com
//@@@@@@@@

//cda-admin
//UMszZpaKwvsuD26G
//mongodb+srv://cda-admin:<password>@cluster0.ypeeu.mongodb.net/<dbname>?retryWrites=true&w=majority

//mongodb+srv://cda-admin:UMszZpaKwvsuD26G@cluster0.bdq04.mongodb.net/ecoleart-db?retryWrites=true&w=majority

//pour les données 

const express = require ("express")
const mongoose = require("mongoose")
const UserExpoCard = require("../models/userExpoCard")
const userRouter = require("./routers/users")
const authRouter = require("./routers/auth")
require("dotenv").config()

console.log(process.env.CONNECTION_URI,process.env.port)

//connection à db atlas
//const connectionURI = "mongodb+srv://cda-admin:IR7otHaJmoMLMoWt@cluster0.ypeeu.mongodb.net/movies-db?retryWrites=true&w=majority"
//mongoose.connect("mongodb+srv://cda-admin:AIpuPgqaNCgSkAFA@cluster0.jcowj.mongodb.net/movies-db?retryWrites=true&w=majority")
const optionsMongoose = {useNewUrlParser: true,
useUnifiedTopology: true}
mongoose
//.connect(connectionURI, optionsMongoose)
.connect(process.env.CONNECTION_URI, optionsMongoose)
.then(() => {
    console.log("connection à atlas réussie")
})
.catch((err) => {
    console.log(err)
    console.log("echec connection à atlas")
})

//init variables
const port = process.env.PORT || 3000

//serveur
const app = express()

//def middleware (? middleware)
app.use(express.json())//pour accès à req.body
app.use(userRouter)//utilise le router importe utilise les routes
app.use(authRouter)

//creer la route
app.get("/userExpoCard",async(req,res)=>{
    await UserExpoCard
    .find()
    .exec()
    .then(doc=>{
        res.send(doc).catch(err=>{
            res.status(500)
        })
    })
})

// app.get("/userExpoCard/:id",async(req,res) =>{
//     console.log(req.params.id)//la methode fonctionne
//     Movie.findById(req.params.id)//{_id: new ObjectID("5fdc6dd3afa4f916cc8b078b")}
//                 .exec()
//                 .then(doc => {
//                     res.send(doc)
//                 })
//                     .catch(err => {
//                         res.status(500).send("erreur pas de resultat")
//                     })
// })

app.get("/userExpoCard/:id",async(req,res) =>{
    try {
    const doc = await UserExpoCard.findById(req.params.id)//{_id: new ObjectID("5fdc6dd3afa4f916cc8b078b")}
            .exec()
            res.send(doc)
    } catch(e)  {
            res.status(500).send("erreur pas de resultat")
                }
})

app.patch("/userExpoCard/:id",async (req,res) => {
    try {
        //destructuration
        const {id} = req.params
        //const fieldToUpdate = req.body
        const authorizedFields = ["class", "about", "about"]
        console.log("Champs appelés:", req.body)
        console.log("Champs autorisés:", authorizedFields)
        const keys = Object.keys(req.body).filter(key => authorizedFields.includes(key))
            //{//filter avec bool vrai ou faux
            //la cle du champ à modifier present dans le tableau des champs autorisés
            //if (authorisedFields.includes(key))//include boolean vrai ou faux
            // return key
            // else
            // return false
        //})
        console.log("Keys:", keys)

        const fieldToUpdate = {}
        keys.map(key => fieldToUpdate[key]=req.body[key])
        console.log(fieldToUpdate)
        const doc = await UserExpoCard.findByIdAndUpdate(id,fieldToUpdate, {new: true})
        res.json(doc)
        
        //const doc = await UserExpoCard.findByIdAndUpdate(id, 
            ////{rating: pg13}
            //fieldToUpdate
        //, {new: true})
        //res.json(doc)
    }catch{
        res.status(500).send("erreur lors de la mise à jour")
    }
})

app.delete("/userExpoCard/:id", async (req,res) => {
    try{
        const {id} = req.params
        const deletedMovie = await Movie.findByIdAndDelete(id)
        res.status(200).send(deletedMovie)
    }catch{
        res.status(500).send("erreur")
    }
})


//création routes
app.post("/userExpoCard", async (req, res) => {
    const newMovie = new UserExpoCard(req.body)
    const document = await newMovie.save()
    //httpstatus.com
    res.status(201).json(document)
})

//lancement serveur
app.listen(port, () =>{
    console.log(`Serveur lancé: http://localhost:${port}`)
})

//mdn mozilla

//https://github.com/FabioReact/cda-node-nosql



