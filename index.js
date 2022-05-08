const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config();



app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.59qdt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

  try {
    await client.connect();
    const inventoryCollection = client.db('warehouse').collection('inventory');

    app.get('/inventory', async (req, res) => {
      const query = {};
      const cursor = inventoryCollection.find(query);
      const inventory = await cursor.toArray();
      res.send(inventory);
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