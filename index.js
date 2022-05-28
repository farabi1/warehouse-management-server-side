const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config();



app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ollsz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

  try {
    await client.connect();
    console.log("Warehouse DB Connected");
    const inventoryCollection = client.db('warehouse').collection('inventory');

    app.get('/inventory', async (req, res) => {
      const query = {};
      const cursor = inventoryCollection.find(query);
      const inventory = await cursor.toArray();
      res.send(inventory);
    });

    app.get('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const item = await inventoryCollection.findOne(query);
      res.send(item);
    })

    app.post('/inventory', async (req, res) => {
      const newItem = req.body;
      const result = await inventoryCollection.insertOne(newItem);
      res.send(result);
    })

    app.delete('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    });

  }

  finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Warehouse Server pro!')
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})