const mongoose = require("mongoose")
const argon2 = require ("argon2")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
    },
    password:{
        type: String,
        required: true
    }
})

//fonction executee avant la sauvegarde
userSchema.pre("save", async function (){//arrow fonct concerne un contexte
    //const user = {...this}//... copie de l'objet
    //console.log(this)//user ds this avant la sauvegarde
    try{
    const hashedPassword = await argon2.hash(this.password)
    //user.password = hashedPassword
    //return user
    this.password = hashedPassword
    }catch(e){
        console.log(e)
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User

//https://httpstatuses.com/

//Fabio.react.dev@gmail.com

