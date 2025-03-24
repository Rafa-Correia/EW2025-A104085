const mongoose = require("mongoose")
const ArqSonSchema = new mongoose.Schema({
    prov: { type: String, required: true},
    local: { type: String, required: true},
    
})