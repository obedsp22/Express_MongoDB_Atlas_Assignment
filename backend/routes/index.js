var express = require('express');
const { MongoClient } = require('mongodb');
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

/* GET home page. */
router.get('/', async (req, res) => {
    try {
        const collection = client.db(dbName).collection('login-credentials');
        collection.find({}).toArray()
            .then(docs => {
                res.json(docs);
            });
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
    }
});


    module.exports = router;