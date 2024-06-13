
const mongoose = require('../db/db')
const { SuccessModel } = require('../utils/resModel')
const { Answer } = require('../db/models/Answer')

const db = mongoose.connection


const userGet = async (req, res) => {
    const username = req.params.username;
    // console.log('username:',username)
    try {
      const collections = await db.db.listCollections().toArray();
      // console.log('Collections:', collections);
      const result = {};

      for (const collection of collections) {
        const collectionName = collection.name;
        const collectionData = await db.db
          .collection(collectionName)
          .find({ username })
          .toArray();
        if (collectionData.length > 0) {
          result[collectionName] = collectionData;
        }
      }
      
      res.json(new SuccessModel(result));
    } catch (err) {
      res.status(500).send(err.message);
    }
}

const userSet = async(req,res)=>{
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
    userGet,
    userSet
};
