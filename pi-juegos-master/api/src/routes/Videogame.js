const { Router } = require('express');
const {infoTotal} = require("../Controllers/VideogamesController")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Genre, Videogame } = require("../db")

const router = Router();

const axios = require('axios');
const fetch = require('fetch')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/:id", async (req, res) => {
    try {

        const { DB_KEY } = process.env;

        let { id } = req.params; //traigo el id por parametro

        if (id.length > 6) {
            let videogameDb = await Videogame.findOne({ //si el id tiene un largo mayor a 6 viene de la base de datos, se trae el juego y el genero respectivo
                where: {
                    id: id
                },
                include: Genre
            })

            let game = {   //creo el formato del juego que necesito para luego darlo por respuesta
                id: videogameDb.id,
                name: videogameDb.name,
                description: videogameDb.description,
                released: videogameDb.released,
                rating: videogameDb.rating,
                platforms: videogameDb.platforms,
                image: videogameDb.image,
                genres: videogameDb.genres?.map((genre) => genre.name)
            }

            res.send(game)
        } else {

            let gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_KEY}`);  //me traigo de la api el juego por id

            let gameFromApi = {
                id: gameApi.data.id,
                name: gameApi.data.name,
                description: gameApi.data.description,
                released: gameApi.data.released,
                rating: gameApi.data.rating,
                image: gameApi.data.background_image,
                platforms: gameApi.data.platforms?.map(data => data.platform.name),
                genres: gameApi.data.genres?.map(data => data.name)
            }

            res.send(gameFromApi);

        }
    } catch (error) {
        console.log(error)
    }


})


router.post("/", async (req, res) => {
    try {
        let {
            id,
            name,
            description,
            released,
            rating,
            platforms,
            createdInDb,
            genres,
            image
        } = req.body //se busca la info que necesitaremos para crear en el body

        let videogameCreated = await Videogame.create({ //aca creamos el videojuego en la tabla con lo que nos pasaron por body
            id,
            name,
            description,
            released,
            rating,
            platforms,
            createdInDb,
            image
        })

        let genresDb = await Genre.findAll({ //se busca todas las coincidencias en la DB donde coincida su nombre con lo que me pasan por body
            where: {
                name: genres
            }
        })

        videogameCreated.addGenres(genresDb) //aca le anexamos el genero de la base de datos al videojuego creado

        res.send("Juego creado con exito")

    } catch (error) {
        console.log(error)
    }
})


/*
router.delete("/:id", async (req, res, next)=>{
    try{
        const {id} = req.params
        Videogame.destroy({where: {id:id}})
        res.send('Deleted' + id)
    }catch(error){
        next(error)
    }
})
*/

router.delete("/:id", (req, res) =>{
    const { id } = req.params
    Videogame.destroy({ where:{ id: id}})
    .then( (a) => { res.status(200).send("Videogame eliminado correctamente") })
    .catch( (e) => { res.status(400).send("No se pudo eliminar el videojuego") })
})



router.patch("/:id", async (req, res) => {
    const { id } = req.params
    const { name, description, rating, released, platforms, image } = req.body;
    try {
        await Videogame.update(
            {
                name: name,
                description: description,
                rating: rating,
                released: released,     
                platforms: platforms,
                image: image,
            },
            {
                where: {
                    id: id,
                },
            }
        );

        res.status(200).send("Juego actualizado correctamente")
    } catch (error) {
        res.status(404).send("No se pudo actualizar el juego");
    }
})






module.exports = router;