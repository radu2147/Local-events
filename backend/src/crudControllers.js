const getAll = model => async () => await model.findAll();
const getById = model => async(id) => await model.findByPk(id);
const insertObject = model => async(obj) => await model.create(obj);
const deleteObject = model => async(id) => {
    let obj = await model.findByPk(id);
    await obj.destroy();
}

module.exports = function(model){
    return{
        getAll: getAll(model),
        getById: getById(model),
        create: insertObject(model),
        delete: deleteObject(model)
    }
}