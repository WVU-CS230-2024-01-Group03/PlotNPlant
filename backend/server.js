const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json)

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"project"
})

app.get('/', (req,res) => {
    return res.json("from backend");
})

app.get('/users',(req,res)=>{
    const q = "Select * FROM users";
    db.query(q, (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, ()=>{
    console.log("listening...")
})
