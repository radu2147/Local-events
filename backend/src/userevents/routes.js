const { Router } = require("express");
const {parse} = require('url');
const controllers = require("./controller");

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

router.get('/get/:id', async (req, res) => {
    try{
        let all = await controllers.getById(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.get('/filter', async (req, res) => {
    try{
        let url = parse(req.url, true);
        let data = url.query;
        let final = {};

        if(data.eventid){
            final.eventId = data.eventid;
        }
        if(data.userid){
            final.userId = data.userid;
        }
        let all = await controllers.filter(final);

        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try{
        let all = await controllers.delete(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.put('/update', async(req, res) => {
    try{
        let all = await controllers.update(req.body);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

router.post('/create', async (req, res) => {
    try{
        console.log(req.body);
        let all = await controllers.create({
            userId: req.body.userId, 
            eventId: req.body.eventId
        });
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(400).send({response: 'fail'});
    }
});

module.exports = router;