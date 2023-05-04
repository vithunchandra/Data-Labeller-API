const {Data, Task, TaskType, Label} = require('../models');
const {labelValidation} = require('../validation/labelValidation');

const labeling = async (req, res) => {
    const {user, label_result, data_id} = req.body;
    try{
        await labelValidation.validateAsync(label);
    }catch(error){
        return res.status(400).json({message: error.message})
    }

    if(user.role !== 'labeler'){
        return res.status(403).json({message: "Endpoint only allowed for labeller"});
    }

    const data = await Data.findByPk(data_id);
    if(!data){
        return res.status(404).json({message: "Data not found"});
    }
    const task = await Task.findByPk(data.task_id);
    if(!task){
        return res.status(404).json({message: "Task not found"});
    }
    const total_label = await label.findAll({
        where: {data_id}
    });
    if(Number(total_label.length) > Number(task.max_labeller)){
        return res.status(400).json({message: `Quota exceeded for Data ${data_id}`});
    }

    const lastData = await Data.findOne({order: [['label_id', 'DESC']]});
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
        return res.status(404).json({message: "Label not found"});
    }

    if(label.username !== user.username){
        return res.status(400).json({message: "Label doesn't belong to this user"});
    }

    await label.update({
        label_result
    });

    return res.status(201).json({message: label});
};

const getLabel = async (req, res) => {
    const {user} = req.body;
    const {data_id, task_id} = req.query;
    let result = undefined;
    if(user.role === "requester"){
        if(data_id){
            const data = await Data.findOne({where: {data_id}});
            if(data.username !== user.username){
                return res.status(403).json({message: "Forbidden access"});
            }
            result = await Label.findAll({
                where: {data_id},
                attributes: ['label_id', 'username', 'label_result']
            });
        }else if(task_id){
            const task = await Task.findByPk(task_id, {attributes: ['task_id', 'task_name', 'type_id']});
            const task_type = await TaskType.findByPk(task.type_id);
            if(task.username !== user.username){
                return res.status(403).json({message: "Forbidden access"});
            }
            const data = await Data.findAll({where: {task_id}});
            let datas = [];
            for(const datum in data){
                const labels = await Label.findAll({
                    where: {data_id: datum.data_id},
                    attributes: ['label_id', 'username', 'label_result']
                });
                datas.push({
                    data_id: datum.data_id,
                    data_text: datum.data_text,
                    price: datum.price,
                    close_date: datum.closeDate,
                    labels
                });
            }
            result = {
                task_id: task.task_id,
                task_name: task.task_name,
                task_type: task_type.type_name,
                data: datas.length > 0 ? datas : "Data is empty"
            };
        }else{
            const tasks = await Task.findAll({
                where: {username: user.username}
            });
            let taskResult = [];
            for(const task of tasks){
                const task_type = await TaskType.findByPk(task.type_id);
                const data = await Data.findAll({where: {task_id : task.task_id}});
                let dataResult = [];
                for(const datum of data){
                    const labels = await Label.findAll({
                        where: {data_id: datum.data_id},
                        attributes: ['label_id', 'username', 'label_result']
                    });
                    dataResult.push({
                        data_id: datum.data_id,
                        data_text: datum.data_text,
                        price: datum.price,
                        close_date: datum.closeDate,
                        labels: labels.length > 0 ? labels : "Label is empty"
                    });
                }
                taskResult.push({
                    task_id: task.task_id,
                    task_name: task.task_name,
                    task_type: task_type.type_name,
                    data: dataResult.length > 0 ? dataResult : "Data is empty"
                });
            }
            result = taskResult;
        }
    }else{
        if(data_id){
            const data = await Data.findByPk(data_id);
            if(data.username !== user.username){
                return res.status(403).json({message: "Forbidden access"});
            }
            const labels = await Label.findAll({
                where: {data_id},
                attributes: ['label_id', 'label_result']
            });
            result = {
                data_id: data.data_id,
                data_text: data.data_text,
                close_date: data.closeDate,
                labels
            };
        }else{
            result = [];
            const labels = await Label.findAll({where: {username: user.username}, attributes: ['label_id', 'label_result']});
            for(const label of labels){
                const data = await Data.findByPk(label.data_id);
                result.push({
                    data_id: data.data_id,
                    data_text: data.data_text,
                    close_date: data.closeDate,
                    label
                });
            }
        }
    }
    return res.status(200).json({body: result});
};

module.exports = {
    labeling,
    updateLabel,
    getLabel
};