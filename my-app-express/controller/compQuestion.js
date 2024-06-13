
const mongoose = require('../db/db')
const { SuccessModel } = require('../utils/resModel')
const { Answer } = require('../db/models/Answer')

const db = mongoose.connection

const titleGet = async (req, res) => {
    const questionId = req.params.questionid; 
    console.log('questionid',questionId);
    try {
        const collections = await db.db.listCollections().toArray();
        console.log('Collections:', collections);
        const objectId = new ObjectId(questionId);
        // 查找特定的 question 文档
        const questionDoc = await db.db.collection('questions').findOne({ _id: objectId });
        console.log(questionDoc)
        if (!questionDoc) {
            return res.status(404).json({ message: 'Question not found' });
        }
        // 提取 componentList 中的 props 数组中的 title
        const titles = [];
        for (const component of questionDoc.componentList) {
            if (component.props && Array.isArray(component.props)) {
                for (const prop of component.props) {
                    if (prop.title) {
                        titles.push(prop.title);
                    }
                }
            }
        }
        // 将结果封装到 SuccessModel 并返回
        res.json(new SuccessModel(titles));
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const userSet = async (req, res) => {
    const age = req.params.age;
    const newData = req.body; // 新的数据
    try {
        // 更新特定集合（例如 answer）中的数据
        const updateResult = await Answer.updateMany({ age }, { $set: newData });

        res.json(new SuccessModel(updateResult));
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    titleGet,
    userSet
};
