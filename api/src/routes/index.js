const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeVideoGame=require("./videogame");
const routeGenre=require("./genre");
const postVideoGame=require("./postVg");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', routeVideoGame);
router.use('/genre',routeGenre);
router.use('/videogame', postVideoGame);

module.exports = router;
