const {pageSize} = require('./constants');

const getAll = model => async () => await model.findAll();
const getById = model => async(id) => await model.findByPk(id);
const insertObject = model => async(obj) => await model.create(obj);
const deleteObject = model => async(id) => {
    let obj = await model.findByPk(id);
    await obj.destroy();
}

const filterAll = model => async(obj) => (
    await model.findAll({
        where: obj
    })
);

const filterAllPaged = model => async(obj, page) => (
    await model.findAll({
        where: obj,
        offset: pageSize*(page-1),
        limit: pageSize
    })
)

const getByPage = model => async (page) => {
    return await model.findAll({offset: pageSize*(page-1), limit: pageSize})
}

const updateObject = model => async(obj) => await model.update(obj, {where: {id: obj.id}});

module.exports = function(model){
    return{
        getAll: getAll(model),
        getById: getById(model),
        create: insertObject(model),
        delete: deleteObject(model),
        update: updateObject(model),
        filter: filterAll(model),
        getByPage: getByPage(model),
        filterAllPaged: filterAllPaged(model)
    }
}