var Aluno = require("../models/aluno")

module.exports.list = function() {
    return Aluno
        .find()
        .sort({nome : 1})
        .exec()
}

module.exports.findById = function(id) {
    return Aluno
        .findOne({_id : id})
        .exec()
}

module.exports.insert = function(aluno) {
    if(Aluno.find({_id : aluno.id}).exec().length != 1) {
        var newAluno = new Aluno(aluno)
        newAluno._id = aluno.id
        return newAluno.save()
    }
}

module.exports.update = function(id, aluno) {
    return Aluno
        .findByIdAndUpdate(id, aluno)
        .exec()
}

module.exports.delete = function(id) {
    return Aluno    
        .findByIdAndDelete()
        .exec()
}