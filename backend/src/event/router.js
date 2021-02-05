const { Router } = require("express");

const router = Router();
const controllers = require('./controllers');

router.get('/get', async(req, res) => {
    try{
        let all = await controllers.getAll();
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(404).send({response: "fail"})
    }
});

router.get('/get/:id', async(req, res) => {
    try{
        let all = await controllers.getById(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(404).send({response: "fail"})
    }
});

router.post('/create', async (req, res) => {
    try{
        let all = await controllers.create({
            title: req.body.title, 
            description: req.body.description,
            date: new Date(Date.now())
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