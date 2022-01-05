const express = require('express');
const{Videogame,Genre}=require("../db");
const server=express();


server.post("/",async(req,res)=>{

    let {
        name,
        description,
        releaseDate,
        rating,
        platform,
        genre
    }=req.body;

    let videogameCreated= await Videogame.create({
        name,
        description,
        releaseDate,
        rating,
        platform,
    });

    let genreDb= await Genre.findAll({
        where:{name:genre}
    })
    videogameCreated.addGenre(genreDb)
        res.send("Videogame created")
})

module.exports=server;