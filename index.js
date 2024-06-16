const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3200;

//middlewares
app.use(
  cors({
    origin: [
      "https://charlie-portfolio-17.netlify.app",
      "http://localhost:5173",
      "http://localhost:5174",
      'https://iamcharlie17.github.io/my-portfolio'
    ],
  })
);
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://portfolio:LCnP7aU25eLmhePZ@cluster0.x7zkge4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const contactCollecton = client.db("Portfolio").collection("contacts");

    app.post("/contacts", async (req, res) => {
      const contactInfo = req.body;
      const result = await contactCollecton.insertOne(contactInfo);
      res.send(result);
    });

    app.get("/contacts", async (req, res) => {
      const result = await contactCollecton.find().toArray();
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Portfolio is running");
});

app.listen(port, () => {
  console.log(`Portfolio is listening on port ${port}`);
});
