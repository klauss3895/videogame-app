const express = require('express');
const axios = require("axios").default;
require('dotenv').config();
const{API_KEY}=process.env;
const{Genre}=require("../db");
const server=express();



server.get("/", async (req,res)=>{
    const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = apiGenres.data.results.map(el=>el.name)
    console.log(genres)
            genres.forEach(genreName=>{
                Genre.findOrCreate({
                    where:{name: genreName}
                })
            });

    const allGenres=await Genre.findAll();
    res.send(allGenres);
})
module.exports=server;
