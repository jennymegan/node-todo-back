const dbConnect = require('../dbConnect')
const ObjectId = require('mongodb').ObjectId


async function getTasks (req, res) {
    const db = await dbConnect()
    let results
    if (req.query.completed == 1) {
        results = await db.collection('tasks').find({completed : 1, deleted : {$exists: false}}).toArray()
    } else {
        results = await db.collection('tasks').find({completed: {$exists: false}}).toArray()
    }
    if (!results){
        return res.json({
            success: "false",
            msg: "unable to retrieve results from database",
            data: {}
        })
    } else {
        return res.json({
            success: "true",
            msg: "updated database",
            data: {results}
        })
    }
}

async function addNewTask (req, res) {
    const db = await dbConnect()
    const task = req.body.name
    const results = await db.collection('tasks').insertOne({name: task})
    if (results.insertedCount) {
        return res.json({
            success: "true",
            msg: "added to database",
            data: {modified: results.insertedCount}
        })
    } else {
        return res.json({
            success: "false",
            msg: "failed to add to database",
            data: {}
        })
    }
}

async function markComplete (req, res) {
    const db = await dbConnect()
    let id = req.params.id
    const results = await db.collection('tasks').updateOne({_id: ObjectId(id)}, {$set:{completed : 1}})
    if (results.modifiedCount) {
        return res.json({
            success: "true",
            msg: "updated database",
            data: {modified: results.modifiedCount}
        })
    } else {
        return res.json({
            success: "false",
            msg: "failed to update database",
            data: {}
        })
    }
}

async function deleteTask (req, res) {
    const db = await dbConnect()
    let id = req.params.id
    const results = await db.collection('tasks').updateOne({_id: ObjectId(id)}, {$set:{deleted : 1}})
    if (results.modifiedCount) {
        return res.json({
            success: "true",
            msg: "updated database",
            data: {deleted: results.modifiedCount}
        })
    } else {
        return res.json({
            success: "false",
            msg: "failed to delete from database",
            data: {}
        })
    }
}

module.exports.getTasks = getTasks
module.exports.addNewTask = addNewTask
module.exports.markComplete = markComplete
module.exports.deleteTask = deleteTask

// mvc - ish - database stuff in module like a model, rest of it like if and response in here like controller
// ie in controller get the parse.name, put that name into db VIA a model type function
//in model type function, take a param of name, then put that into the db.
// ergo split this out, call this the controllers and put the models somewhere else
//use some try/catches
