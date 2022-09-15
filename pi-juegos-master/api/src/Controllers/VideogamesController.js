const axios = require("axios");

const { Genre, Videogame } = require("../db")

const getApiInfo = async function () {

    try {
        const { DB_KEY } = process.env;

        let pagOne = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}`);
        let pagTwo = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=2`);
        let pagThree = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=3`);
        let pagFour = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=4`);
        let pagFive = axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=5`);


        let fullApiUrl = []; //creo una variable donde voy a guardar las 5 paginas del pedido a la api para reducir el tiempo

        await Promise.all([pagOne, pagTwo, pagThree, pagFour, pagFive]).then((response) => { //aca hago un Promise.all para enviar los 5 pedidos en simultaneo y seteo la variable con la info que me traiga
            response.forEach((promise) => {
                fullApiUrl = [...fullApiUrl, ...promise.data.results]
            })
        });

        let apiInfo = fullApiUrl.map(data => { //creo una variable donde voy a guardar solo los datos que necesito
            return {
                id: data.id,
                name: data.name,
                description: data.description,
                released: data.released,
                rating: data.rating,
                image: data.background_image,
                platforms: data.platforms.map(data => data.platform.name),
                genres: data.genres.map(data => data.name)
            }
        })
        return apiInfo
    } catch (error) {
        console.log(error)
    }

}

const getDbInfo = async function () { //busca en la base de datos cualquier info que incluya el modelo genero y su atributo name y que sea un array
    try {
        let gameDb = await Videogame.findAll({ //en una variable guardo la pedida a la DB de los juegos que incluyan el modelo genero
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })

        gameDb = gameDb.map(({ //retorno los datos necesarios para los juegos de la DB
            id,
            name,
            released,
            rating,
            platforms,
            genres,
            image
        }) => ({
            id,
            name,
            released,
            rating,
            platforms,
            image,
            genres: genres.map((genre) => genre.name),
        }));

        return gameDb

    } catch (error) {
        console.log(error)
    }

}

const getAllVideogames = async function () {
    try {
        let apiInfo = await getApiInfo();
        let dbInfo = await getDbInfo();
        let infoTotal = dbInfo.concat(apiInfo); //concateno la api con la DB
        return infoTotal;
    } catch (error) {
        console - log(error)
    }
}

module.exports = { getAllVideogames }