const mongoose = require ("mongoose")

//creation du schema 
const userExpoCardSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    class: {
        required: true,
        type: String
    },
    about: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
})

//le mosel est une classe qui aura les proprietes declrarees ds schema ainsi que les methodes pour faire les requetes
const UserExpoCard = mongoose.model("UserExpoCard", userExpoCardSchema)

module.exports = UserExpoCard