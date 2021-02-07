const jwt = require("jsonwebtoken");
const User = require("./user/models");

const newToken = user => {
    return jwt.sign({ id: user.id }, 'secrets', {
        expiresIn: 360
    });
};

const verifyToken = token => {
    return new Promise((res, rej) => {
        jwt.verify(token, 'secrets', (err, decoded) => {
            if(err){
                return rej(err);
            }
            return res(decoded);
        })
    });
};

const verifyMiddleware = async function(req, res, next){
    let auth = req.headers.authorization;
    if(!auth){
        res.status(403).send({response: 'no token'});
        return;
    }
    let token = auth.split('Bearer ')[1];
    if(!token){
        res.status(403).send({response: 'no token'});
        return;
    }
    try{
        let data = await verifyToken(token);
        req.user = (await User.findOne({where: {id: data.id}})).dataValues;
    }
    catch(e){
        console.error(e);
        res.status(403).send({response: 'invalid token'});
    }
    
    next();
}

const signin = async (req, res) => {
    if(!req.body.username || !req.body.password){
        res.status(401).send({response: 'fail'});
        return;
    }
    try{
        let user = (await User.findOne({where: {username: req.body.username}})).dataValues;
        if(!User.checkPassword(user.password, req.body.password)){
            res.status(401).send({response: 'incorrect password'});
            return;
        }
        res.status(200).send({token: newToken(user)});
    }
    catch(e){
        console.error(e);
        res.status(401).send({response: 'fail'});
    }
    
}

module.exports = [verifyMiddleware, signin];