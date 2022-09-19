import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getVideogames, filterCreated, orderByName, orderByRating, filterByGenre, getGenres, clearDetail, guardarPage } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx"
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

import style from "./Home.module.css"

export default function Home (){

    const dispatch = useDispatch();
    const pagina = useSelector(state=> state.page)
    const allVideogames = useSelector (state => state.videogames); //con useSelector me trae a esta constante todo lo que esta en el estado de videogames ---- ES LO MISMO que usar mapStateToProps

    //---------------------- PAGINADO ---------------------------

    const [currentPage, setCurrentPage] = useState(pagina);  //con este estado local me guardo la pagina actual, arrancando en la 1

    const [videogamesPerPage, setVideogamesPerPage] = useState(15); //con este estado local me guardo cuantos videojuegos tendre por pagina

    const indexOfLastVideogame = currentPage * videogamesPerPage; //indice del ultimo personaje

    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; //indice del primer personaje

    const currentVideogame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame); //tomo todos los juegos y selecciono los juegos que quiero, en este caso el indice del primero al ultimo indice con las variables creadas 1 al 15

//------------------------------prev-next----------------------------------

    const paginado = (pageNumber) => { //creo la funcion paginado, segun el numero de pagina que le pasen setea el estado de la pagina actual y hace que cambien los indices y asi muestra distintos juegos
        setCurrentPage(pageNumber)
    }

    function handlePage(e){
        dispatch(guardarPage(currentPage))
    }
    
    function handlerPrev(){
        if(currentPage <= 1) return;
        paginado(currentPage - 1);
    }

    function handlerNext(){
        if(currentPage >= currentPage.length) return;
        paginado(currentPage + 1);
    }

//-------------------------------------------------------------------------

    const [orden, setOrden] = useState(""); //creo el estado de orden para poder renderizar

    const genres = useSelector((state) => state.genres); //me traigo el estado de generos

    useEffect(()=>{ //lo manda al store para hacer la logica  //--componentDidMount--//
        dispatch(getGenres());
        dispatch(getVideogames()); //esto es lo mismo que usar mapDispatchToProps
        return(()=>{                                          //--componentWillUnmount--//
            dispatch(clearDetail())
          })
    }, [dispatch])

//--------------------handlers-----------------------------------

    function handleClick(e){ //funcion para recargar o refrescar la pagina al state inicial
        e.preventDefault();  //nos aseguramos de que sea como queremos, no como default
        dispatch(clearDetail())
        dispatch(getVideogames());//despachamos los videojuegos
    }

    function handleFilterCreated(e){ //funcion para filtrar por videojuegos creados o existentes
        e.preventDefault();          //nos aseguramos de que sea como queremos, no como default
        dispatch(filterCreated(e.target.value));
    }


    function handleSort(e){ //funcion para filtrar por orden alfabetico
        e.preventDefault();//preveemos el orden por default
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); //al ordenar seteo para que comience en la primera pagina
        setOrden(e.target.value) //se usa para que haga la modificacion, la setee y renderice 
    }

    function handleRating(e){ //funcion para ordenar por rating
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value)
    }

    function handleGenres(e){ //funcion para ordenar por genero
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }


//-----------------------------------------------------------------------

return (
    <div>
            <div className={style.buscador}>
                <div className={style.searchbar_container}><SearchBar/></div>
                    <div className={style.crearJuego}>
                        <button className={style.select}>
                            <Link className={style.select} to="/videogame">Crear Juego</Link>
                        </button>
                    </div>
            </div>

        
        <div className={style.navcontainer}>
                <div className={style.flex_filtro}>
                    <button className={style.select} onClick={e => {handleClick(e)}}>
                         Refresh
                    </button>
                </div>
            <div className={style.flex_filtro}>
                <select className={style.select} onChange={e => handleSort(e)}>
                    <option value="asc">Orden alfabético A - Z</option> {/* el value nos permite acceder y ver que opciones va a ejecutar la logica segun el value dado */}
                    <option value="desc">Orden alfabético Z - A</option>
                </select>
            </div>
            <div className={style.flex_filtro}>
                <select className={style.select} onChange={e => handleRating(e)}>
                    <option value="peor">Rating Menos - Mas</option>
                    <option value="mejor">Rating Mas - Menos</option>
                </select>
            </div>
            <div className={style.flex_filtro}>
                <select className={style.select} onChange={e => handleGenres(e)}>
                    <option value="All">Géneros</option>
                        {genres?.map(data => (
                    <option value={data.name} key={data.id}>{data.name}</option>
                    ))}
                </select>
            </div>    
            <div className={style.flex_filtro}>
                
                <select className={style.select} onChange={e => handleFilterCreated(e)}>
                    <option value="All">Juegos</option>
                    <option value="api">Juegos Existente</option>
                    <option value="created">Juegos Creados</option>
                </select>
            </div>
        </div>
        <div className={style.paginado_container}>
            <div className={style.paginado}>
                {currentPage === 1 ? <div></div> :
                //si esta es la pagina uno no renderices el boton previo
                <button onClick={()=> handlerPrev()} className={style.paginado_orden}>{"<"}</button>
                }
                <Paginado videogamesPerPage={videogamesPerPage} //renderizamos el paginado 
                 allVideogames={allVideogames.length}    //estos serian los params para el componente
                 paginado={paginado} 
                />
                {currentPage === 7 ? <div></div> :
                //cuando esta en la ultima pagina no muestres el boton
                <button onClick={()=> handlerNext()} className={style.paginado_orden}>{">"}</button>
                }
            </div>
        </div>
        <div className={style.card}>
                {
                    currentVideogame.length !== 0 ? currentVideogame?.map(data => {
                        return (
                            <div className={style.cards_item}>
                                <Link onClick={(e)=>handlePage(e)} className={style.fix_card} to={"/home/" + data.id}>
                                   <Card name={data.name}
                                      image={data.image}
                                      genres={"Géneros: " + data.genres?.join(", ")}
                                      rating={"Rating: " + data.rating}
                                      key={data.id} 
                                    />
                                </Link>
                            </div> 
                        )
                    }):
                    currentVideogame.length === 0 && <p className={style.not}>Not found</p>
                       
                }
        </div>
        <div className={style.paginado_container}>
            <div className={style.paginado} id={style.id}>
                {currentPage === 1 ? <div></div> :
                //si esta es la pagina uno no renderices el boton previo
                <button onClick={()=> handlerPrev()} className={style.paginado_orden}>{"<"}</button>
                }
                <Paginado videogamesPerPage={videogamesPerPage} //renderizamos el paginado 
                    allVideogames={allVideogames.length}    //estos serian los params para el componente
                    paginado={paginado} 
                />
                 {currentPage === currentPage.length ? <div></div> :
                //cuando esta en la ultima pagina no muestres el boton
                <button onClick={()=> handlerNext()} className={style.paginado_orden}>{">"}</button>
                }
            </div>
        </div>
    </div>
    )
}