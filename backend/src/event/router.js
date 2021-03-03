const { Router } = require("express");

const {parse} = require('url');
const router = Router();
const controllers = require('./controllers');
const usereventcontrollres = require('../userevents/controller');
const {Op} = require('sequelize');
const {DateTime} = require('dateutils');
const [verifyMiddleware, _, __] = require('../auth');
const { pageSize } = require('../constants');

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

router.get('/get-paged/:page', async (req, res) => {
    try{
        let all = await controllers.getByPage(req.params.page);
        res.status(200).send({ pageSize, events:all });
    }
    catch(e){
        console.error(e);
        res.status(404).send({response: "fail"});
    }
});



router.get('/get-saved-events/:page', [verifyMiddleware], async(req, res) => {
    try{
        let final = {userId: req.user.id};
        let saved = await usereventcontrollres.filterAllPaged(final, req.params.page);
        let all = []
        for(const el in saved){
            let elem = await controllers.getById(saved[el].dataValues.eventId);
            all.push(elem);
        }
        res.status(200).send({pageSize, events: all});
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
})

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

const priceObjectCreator = (price) => {
    let priceObj = {};
    if(price === 'Gratis'){
        priceObj = 0;
    }
    else if(price === 'Cu plata'){
        priceObj = {[Op.gt] : 0};
    }
    return priceObj
}

const timeObjectGenerator = (time) => {
    const a = new DateTime();
    if(time === 'Astazi'){
        return {[Op.gte]: DateTime.today().toString(),
                [Op.lt]: DateTime.today().plusDays(1).toString()
        }
    }
    if(time === 'Saptamana aceasta'){
        return {
            [Op.gte]: a.getFirstDateOfWeek().toString(),
            [Op.lt]: a.getFirstDateOfWeek().plusDays(7).toString()
        }
    }
    if(time === 'Luna aceasta'){
        return {
            [Op.gte]: a.firstDateOfMonth().toString(),
            [Op.lt]: a.lastDateOfMonth().toString()
        }
    }
    else{
        return {
            [Op.gt]: a.lastDateOfMonth().toString(),
        }
    }
}

router.get('/filter', async(req, res) => {
    try{
        let url = parse(req.url, true);
        let data = url.query;
        let final = {};

        if(data.title)
            final.title = {[Op.substring]: data.title};

        if(data.time === 'Astazi' || data.time === 'Saptamana aceasta' || data.time === 'Luna aceasta' || data.time === 'Mai tarziu')
            final.date = timeObjectGenerator(data.time);

        if(data.price === 'Gratis' || data.price === 'Cu plata'){
            final.price = priceObjectCreator(data.price);
        }
        if(data.userid){
            final.userid = data.userid;
        }
        
        let all = await controllers.filter(final);

        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
    }
});

router.get('/filter-paged', async(req, res) => {
    try{
        let url = parse(req.url, true);
        let data = url.query;
        let final = {};

        if(data.title)
            final.title = {[Op.substring]: data.title};

        if(data.time === 'Astazi' || data.time === 'Saptamana aceasta' || data.time === 'Luna aceasta' || data.time === 'Mai tarziu')
            final.date = timeObjectGenerator(data.time);

        if(data.price === 'Gratis' || data.price === 'Cu plata'){
            final.price = priceObjectCreator(data.price);
        }
        if(data.userid){
            final.userid = data.userid;
        }
        
        let all = await controllers.filterAllPaged(final, data.page);

        res.status(200).send({pageSize, events : all});
    }
    catch(e){
        console.error(e);
    }
});

router.post('/create',[verifyMiddleware], async (req, res) => {
    try{
        let endDate;
        if(!req.body.endDate){
            endDate = null;
        }
        else{
            endDate = req.body.endDate;
        }
        let all = await controllers.create({
            title: req.body.title, 
            description: req.body.description,
            date: req.body.date,
            price: req.body.price,
            userid: req.user.id,
            link1: req.body.link1,
            link2: req.body.link2,
            endDate,
            location: req.body.location,
            pathfile: req.body.pathfile
        });
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.delete('/delete/:id',[verifyMiddleware], async (req, res) => {
    try{
        let all = await controllers.delete(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
})

router.put('/update',[verifyMiddleware], async(req, res) => {
    try{
        if(!req.body.endDate){
            req.body.endDate = null;
        }
        let all = await controllers.update(req.body);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.get('/get-saved/:id', [verifyMiddleware], async(req, res) => {
    try{
        let all = await usereventcontrollres.filter({eventId: req.params.id});
        res.status(200).send({savings: all.length});
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});



module.exports = router;