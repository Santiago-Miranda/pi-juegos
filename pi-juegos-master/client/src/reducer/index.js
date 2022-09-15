const initialState = { //estados iniciales
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
    page: 1
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES": //caso de obtener todos los videojuegos, ademas de mantener lo que teniamos en el estado, añadimos los videojuegos
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload //copia de todos los juegos para no pisar el estado original
            }
                case "ORDER_BY_NAME": //ordenar alfabeticamente
                    let sortedArr = action.payload === "asc" ? state.videogames.sort(function (a, b) { //si es ascendente
                            if (a.name.toLowerCase() > b.name.toLowerCase()) { // accede al estado videogames y le hace un sort
                                return 1; // los ordena de manera ascendente
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return -1;
                            }
                            return 0
                        }) :
                        state.videogames.sort(function (a, b) { //sort ordena por unicode, las letras tienen un valor asignado
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return -1
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return 1
                            }
                            return 0
                        })
                    return {
                        ...state,
                        videogames: sortedArr
                    }
                    case "GET_NAME_VIDEOGAMES": //buscar videojuego por nombre
                        return {
                            ...state,
                            videogames: action.payload
                        }
                        case "POST_VIDEOGAME": //crear videojuego
                            return {
                                ...state
                            }
                            case 'DELETE_VIDEOGAME'://Eliminar juego por id
                            return{
                            ...state,
                            allVideogames: state.allVideogames.filter(rec=>rec.id != action.payload),
                            videogames: state.videogames.filter(rec=>rec.id != action.payload)
                            }
                             case "FILTER_CREATED": //ordenar por creados o existentes
                                let createdFilter;
                                if (action.payload === "api") {
                                let apiGame = state.allVideogames.filter(data => data.id.toString().length < 7) //toString para poder usar el .length
                                createdFilter = apiGame
                                }
                                    if (action.payload === "created") {
                                    let createdGame = state.allVideogames.filter(data => data.id.toString().length > 6)
                                    createdFilter = createdGame
                                    }
                                        if (action.payload === "All") {
                                        let allFiltered = state.allVideogames;
                                        createdFilter = allFiltered
                                        }
                                            return {
                                            ...state,
                                            videogames: createdFilter
                                            }
                                case "GET_GENRES": //obtener generos
                                    return {
                                    ...state,
                                    genres: action.payload
                                }
                                case "FILTER_BY_GENRE": //filtrar por genero
                                    let filterGenre = state.allVideogames.filter(p => { //filtro los videojuegos buscando coincidencia
                                        if(p.genres?.includes(action.payload)) return p  //si el genero es el mismo al del payload me lo trae
                                    })
                                    if(action.payload === "All"){
                                        filterGenre = state.allVideogames
                                    }
                                    return {
                                        ...state,
                                        videogames: filterGenre
                                    }
                                   case "ORDER_BY_RATING": //ordenar por rating
                                        let sortedArrRating;
                                        if(action.payload === "peor"){
                                            sortedArrRating = state.videogames.sort(function (a, b) { //si es ascendente
                                                if (a.rating > b.rating) { // accede al estado videogames y le hace un sort
                                                     return 1; // los ordena de manera ascendente
                                                }
                                                if (b.rating > a.rating) {
                                                    return -1;
                                                }
                                                return 0
                                            })
                                        } else if (action.payload === "mejor"){
                                            sortedArrRating = state.videogames.sort(function (a, b) {
                                                if (a.rating > b.rating) {
                                                    return -1
                                                }
                                                if (b.rating > a.rating) {
                                                    return 1
                                                }
                                                return 0
                                            })
                                        }
                                        return {
                                            ...state,
                                            videogames: sortedArrRating
                                        }
                                        case "GET_DETAIL": //obtener detalle (id)
                                            return {
                                                ...state,
                                                detail: action.payload
                                            }
                                        case "CLEAR_DETAIL"://Limpiar estado
                                            return {
                                                ...state,
                                                videogames: action.payload,
                                                detail: action.payload
                                            } 
                                            case "GUARDAR_PAGE":
                                                return{
                                                    ...state,
                                                    page: action.payload
                                                }
                                        default:
                                            return state;
    }
}

export default rootReducer;