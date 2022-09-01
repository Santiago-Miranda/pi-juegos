import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import style from "./Detail.module.css"

export default function Detail(){

    const dispatch = useDispatch(); //se usa para despachar acciones al store

    const {id} = useParams(); //uso el parametro del id

    useEffect(() => { //se manda la accion al store para hacer la logica
        dispatch(getDetail(id)); //de esta forma accedo al ID
    }, [dispatch,id]);

    const myVideogame = useSelector(state => state.detail); //uso el estado del reducer

    console.log(myVideogame)

    if (myVideogame) {
        return (
          <div className={style.container}>
            <div className={style.div}>
              <Link to="/home">
                <button className={style.boton}>Volver al Home</button>
              </Link>
                <h1>{myVideogame.name}</h1>
                <img className={style.imagen} src={myVideogame.image} alt="Imagen no encontrada"/>
                <h2>Rating: {myVideogame.rating}</h2>
                <p dangerouslySetInnerHTML={{__html: myVideogame.description}}></p>
                <h4>Fecha de lanzamiento: {myVideogame.released}</h4>
                <h4>Plataformas: {myVideogame.platforms?.join(", ")}</h4>
                <h4>Géneros: {myVideogame?.genres?.join(", ")}</h4>
              
            </div>
          </div>
        );
      } else {
        return (
          <div>
            Ups! Algo malo ha pasado, regresa al Home!
            <Link to="/home">
              <button>Volver</button>
            </Link>
          </div>
        );
      }

}