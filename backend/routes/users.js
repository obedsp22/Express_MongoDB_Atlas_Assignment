var express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
var router = express.Router();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster.yvmxqb7.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url);
const dbName = 'clinicSystem';

client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

router.post('/', async (req, res) => {
    try {
        // const result = await client.db().collection('login-credentials').insertOne(req.body);
        // console.log(req.body);
        // res.end();
        const collection = await client.db(dbName).collection('login-credentials');
        collection.insertOne(req.body).then(() => { res.end(); }).catch((err) => { console.log(err); });
    } catch (err) {
        console.log(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const form = req.body;
        const query = { _id: new ObjectId(id) };
        const update = { $set: form };
        await client.db(dbName).collection('login-credentials').updateOne(query, update);
        res.end();
    } catch (err) {
        console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        await client.db(dbName).collection('login-credentials').deleteOne(query);
        res.end();
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;