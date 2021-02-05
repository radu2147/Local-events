const {Router} = require("express");
const controllers = require("./controller");


const router = Router();

router.get('/comms/get', async (req, res) => {

    try{
        let all = await controllers.getAll();
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(404).send({code: 404})
    }
})


router.get('/comms/:id', async (req, res) => {
    try{
        let all = await controllers.getById(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(404).send({code: 404})
    }
})

router.post('/comms/create', async (req, res) => {
    console.log(req.body)
    try{
        await controllers.create({
            username: req.body.username,
            text: req.body.text,
            date: new Date(Date.now())
        })
        let all = await controllers.getAll(req.params.id);
        res.status(200).send(all);
    }
    catch(e){
        console.error(e);
        res.status(404).send({code: 404})
    }
})

router.delete('/comms/delete/:id', async (req, res) => {
    try{
        let x = await controllers.delete(req.params.id);
        res.status(200).send(x);
    }
    catch(e){
        console.error(e);
        res.status(404).send({code: 404})
    }
});

router.put('/comms/update', async (req, res) => {
    try{
        let x = await controllers.update(req.body);
        res.status(200).send(x);
    }
    catch(e){
        console.error(e);
        res.status(404).send({code: 404})
    }
})

module.exports = router;