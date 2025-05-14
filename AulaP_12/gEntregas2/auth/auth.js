var jwt = require('jsonwebtoken')

module.exports.validate = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')

    token = token.split(' ')[1]

    if(token) {
        jwt.verify(token, 'EngWeb2025', (err, payload) => {
            if(err) {
                res.status(401).jsonp(err)
            }
            else {
                console.log(payload);
                next()
            }
        })
    }
    else {
        res.status(401).jsonp({error: "Non-existant token."})
    }
}

module.exports.validateDocente = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')

    token = token.split(' ')[1]
    
    if(token) {
        jwt.verify(token, 'EngWeb2025', (err, payload) => {
            if(err) {
                res.status(401).jsonp(err)
            }
            else {
                if(payload.level === "DOCENTE") {
                    console.log(payload);
                    next()
                }
                else {
                    res.status(401).jsonp({error: "User doesn't have the required permission level to access this content."})
                }
            }
        })
    }
    else {
        res.status(401).jsonp({error: "Non-existant token."})
    }
}