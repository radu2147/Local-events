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
        let priceObj = {};
        if(data.price === 'Gratis'){
            priceObj = 0;
            console.log(priceObj);
        }
        else if(data.price === 'Cu plata'){
            priceObj = {[Op.gt] : 0};
        }
        let final = {title:{[Op.substring]: data.title}};
        if(data.price === 'Gratis' || data.price === 'Cu plata'){
            final.price = priceObj;
        }
        console.log(final);
        let all = await controllers.filter(final);

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