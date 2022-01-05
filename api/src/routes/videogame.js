const express = require('express');
const axios = require("axios").default;
require('dotenv').config();
const{API_KEY}=process.env;
const{Videogame,Genre}=require("../db");
const server=express();



const getApiInfo = async ()=>{

    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const result = apiUrl.data.results;
    const apiInfo=await result.map(el=>{
        return{
            name:el.name,
            image:el.background_image,
            genre:el.genres.map(el=>el.name),
            description:"description",
            releaseDate:el.released,
            rating:el.rating,
            platform:el.platforms.map(el=>el.platform.name)
        };
    });
    return apiInfo;
};
// INFO de la BASE DE DATOS
const getDb= async()=>{
    return await Videogame.findAll({ 
        include:{
            model:Genre,
            atributes:["name"],
            through:{
                attributes:[],
            }
        }
    })
};

// Concateno la info 

const getAllInfo = async ()=>{
    const apiInfo = await getApiInfo();
    const infoDb = await getDb();
    const allInfo = apiInfo.concat(infoDb);
    return allInfo; 
}

server.get("/",async(req,res)=>{
    const name = req.query.name;
    let allVideogames = await getAllInfo();
    if(name){
        let  nameVG = await allVideogames.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
        if(nameVG.length)res.status(200).send(nameVG)
        else res.status(404).send("No existe el videogame");        
    } else {
        res.status(200).send(allVideogames)
    }
})



module.exports = server;