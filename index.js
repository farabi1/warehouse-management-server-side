const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000



app.use(cors());
app.use(express.json());
// farabi
// LosTUx88Jsnd2cF7


const uri = "mongodb+srv://farabi:LosTUx88Jsnd2cF7@cluster1.59qdt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('DB Connected');
  // perform actions on the collection object
  client.close();
});

app.get('/', (req, res) => {
  res.send('Hello Warehouse Server pro!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})