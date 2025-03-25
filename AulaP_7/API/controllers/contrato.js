var contrato = require('../models/contrato') 

module.exports.getContratos = () => {
    return contrato
        .find()
        .exec()
}

module.exports.getContratoById = (id) => {
    /*console.log(id)*/
    return contrato
        .findById(id)
        .exec()
    /**
     * OR DO IT LIKE THIS
     * 
     * .find({
     *  _id : id
     * })
     * .exec()
     */
}

module.exports.getContratosByEntidade = (entidade) => {
    return contrato
        .find({
            entidade_comunicante : entidade
        })
        .exec()
}

module.exports.getContratosByTipo = (tipo) => {
    return contrato
        .find({
            tipoprocedimento : tipo
        })
        .exec()
}

module.exports.getEntidades = () => {
    return contrato
        .distinct("entidade_comunicante")
        .sort({entidade_comunicante : 1})
        .exec()
}

module.exports.getTipos = () => {
    return contrato
        .distinct("tipoprocedimento")
        .sort({tipoprocedimento : 1})
        .exec()
}

module.exports.insert = (contract) => {
    var contract_schema_object = new contrato(contract)
    return contract_schema_object
        .save()
}

module.exports.update = (contract, id) => {
    return contrato
        .findByIdAndUpdate(id, contract, {new:true})
        .exec()
}

module.exports.delete = (id) => {
    return contrato
        .findByIdAndDelete(id)
        .exec()
}