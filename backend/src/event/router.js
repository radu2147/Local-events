const { Router } = require("express");

const {parse} = require('url');
const router = Router();
const controllers = require('./controllers');
const {Op} = require('sequelize');

router.get('/get', async(req, res) => {
    try{
        let all = await controllers.getAll();
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(404).send({response: "fail"});
    }
});

router.get('/get/:id', async(req, res) => {
    try{
        let all = await controllers.getById(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(404).send({response: "fail"});
    }
});

router.get('/filter', async(req, res) => {
    try{
        let url = parse(req.url, true);
        let data = url.query;
        let all = await controllers.filter({title:{[Op.substring]: data.title}});

        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
    }
})

router.post('/create', async (req, res) => {
    try{
        let all = await controllers.create({
            title: req.body.title, 
            description: req.body.description,
            date: req.body.date,
            price: req.body.price,
            location: req.body.location
        });
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try{
        let all = await controllers.delete(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
})

router.put('/update', async(req, res) => {
    try{
        let all = await controllers.update(req.body);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
})



module.exports = router;