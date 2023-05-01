const {Data, Task, Label} = require('../models');
const {labelValidation} = require('../validation/labelValidation');

const labeling = async (req, res) => {
    const {user, label_result, data_id} = req.body;
    try{
        await labelValidation.validateAsync(label);
    }catch(error){
        return res.status(400).json({message: error.message})
    }

    if(user.role !== 'labeler'){
        return res.status(403).json({message: "Endpoint hanya bisa diakses oleh labeler"});
    }

    const data = await Data.findByPk(data_id);
    if(!data){
        return res.status(404).json({message: "Data tidak ditemukan"});
    }
    const task = await Task.findByPk(data.task_id);
    if(!task){
        return res.status(404).json({message: "Task tidak ditemukan"});
    }
    const total_label = label.findAll({
        where: {data_id}
    });
    if(Number(total_label.length) > Number(task.max_labeller)){
        return res.status(400).json({message: `Jumlah label untuk data dengan id ${data_id} sudah melewati kuota`});
    }

    const lastData = data.findOne({order: [['label_id', 'DESC']]});
    const lastID = lastData ? Number(String(lastData.label_id).substring(1)) : 0;
    const newID = `L${String(lastID + 1).padStart(4, '0')}`;
    const newLabel = await Label.create({
        label_id: newID,
        data_id,
        username: user.username,
        label_result
    });
    return res.status(201).json({message: newLabel});
};

const updateLabel = async (req, res) => {
    const {user, label_result, label_id} = req.body;
    try{
        await labelValidation.validateAsync(label);
    }catch(error){
        return res.status(400).json({message: error.message})
    }

    const label = await findByPk(label_id);
    if(!label){
        return res.status(404).json({message: "Label tidak ditemukan"});
    }

    if(label.username !== user.username){
        return res.status(400).json({message: "Label bukan milik user"});
    }

    await label.update({
        label_result
    });

    return res.status(201).json({message: label});
};

module.exports = {
    labeling,
    updateLabel
};