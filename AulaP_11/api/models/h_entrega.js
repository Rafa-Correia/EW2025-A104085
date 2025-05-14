var mongoose = require('mongoose')

var h_entregaSchema = new mongoose.Schema({
    _id: String,
    date: Date,
    uc: String,
    title: String,
    equipa_id: String,
    equipa_desc: String,
    file: String,
    obs: String,
    rem_date: Date,
    justificacao: String
}, {versionKey : false})

module.exports = mongoose.model('entrega', h_entregaSchema)