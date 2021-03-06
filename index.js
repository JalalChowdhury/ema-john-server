const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();


const port = process.env.PORT || 5000 ;

// middlewere
app.use(cors());
app.use(express.json());

// connection for username and passs
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ug0c1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);


//main body

async function run(){

    try{
        await client.connect();
        const  databae = client.db('online_shop');
        const productsCollection = databae.collection('products');

        // GET PRODUCTS API
        app.get('/products', async(req,res)=>{
            const cursor = productsCollection.find({});
            const products = await cursor.toArray(); 


            res.send(products);
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);









app.get('/' , (req,res)=>{
    res.send("Ema john server is running");
})

app.listen(port, ()=>{
    console.log("surver running at port ",port);
    // EM4D8cLpkIcCGqwy - fff
})

//for ck
app.get('/hello', (req,res)=>{
    res.send('hello updated here');
})