const { Router } = require("express");
const controllers = require("./controllers");
const [verify,_,__, verifyAdminMiddleware] = require('../auth');
const bcrypt = require('bcrypt');
const salt = 10;

const router = Router();

router.get('/get', async (req, res) => {
    try{
        let all = await controllers.getAll();
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});



router.get('/get/:id',[verifyAdminMiddleware], async (req, res) => {
    try{
        let all = await controllers.getById(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.get('/get-active', [verify], async(req, res) => {
    try{
        res.status(200).send(req.user);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.post('/create', async (req, res) => {
    try{
        let password = await bcrypt.hash(req.body.password, salt);
        let all = await controllers.create({
            username: req.body.username, 
            password
        });
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'user already exists'});
    }
});

router.delete('/delete/:id',[verifyAdminMiddleware], async (req, res) => {
    try{
        let all = await controllers.delete(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.put('/update',[verify], async(req, res) => {
    try{
        let all = await controllers.update(req.body);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

module.exports = router;