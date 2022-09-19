import axios from "axios";
import fetch from "fetch";

//aca se conecta el back con el front

export function getVideogames() { //obtener todos los videojuegos
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/videogames"); //nos traemos los juegos
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: json.data
        })
    }
}



export function filterCreated(payload) { //filtrar por creados
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function orderByName(payload) { //ordenar por nombre asc o desc
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByRating(payload) { //ordernar por rating asc o desc
    return {
        type: "ORDER_BY_RATING",
        payload
    }
}


export function getNameVideogames(payload) { //obtener videojuegos por nombre
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/videogames?name=" + payload); //el payload viene siendo el nombre del juego
            return dispatch({
                type: "GET_NAME_VIDEOGAMES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}




export function getGenres() { //obtener generos
    return async function (dispatch) {
        let info = await axios.get("http://localhost:3001/genres");

        return dispatch({
            type: "GET_GENRES",
            payload: info.data
        })
    }
}

export function filterByGenre(payload) {//filtrame por generados o creados
    return {
        type: "FILTER_BY_GENRE",
        payload
    }
}

export function getDetail(payload) { //obtener detalle del videojuego(ID)
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/videogame/" + payload);

            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function clearDetail (){
    return {
        type: "CLEAR_DETAIL",
        payload: []
    }
    
}

export function postVideogame(payload) { //crear videojuego
    return async function () {
        const response = await axios.post("http://localhost:3001/videogame", payload);
        return response
    }
}

export function deleteVideogame(id){//eliminar videojuego
    return async function(dispatch){
        await axios.delete(`http://localhost:3001/videogame/${id}`)
        dispatch({
            type: "DELETE_VIDEOGAME",
            payload: id
        })
    }
}

export function guardarPage(payload){
   return function(dispatch){
    return dispatch({
     type: "GUARDAR_PAGE",
     payload
    })
   }
}
