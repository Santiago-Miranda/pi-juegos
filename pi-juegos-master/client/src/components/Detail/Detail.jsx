import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css"
import ErrorRoute from "../error/ErrorRoute";
import { deleteVideogame, clearDetail, getDetail } from "../../actions";

export default function Detail(){

    const dispatch = useDispatch(); //se usa para despachar acciones al store

    const {id} = useParams(); //uso el parametro del id

    useEffect(() => { //se manda la accion al store para hacer la logica
        dispatch(getDetail(id)); //de esta forma accedo al ID
        return(()=>{
          dispatch(clearDetail())
        })
      }, [dispatch,id]);

    const myVideogame = useSelector(state => state.detail); //uso el estado del reducer

    console.log(myVideogame)


    if (myVideogame.id == id) {
        return (
          <div key={id} className={style.container}>
            <div className={style.div}>
              <Link  to="/home">
                <div>
                  <button className={style.boton}>Volver al Home</button>
                  
                </div>
               
                <div className={style.container_delete}>
                  <p>{id && id.length > 6?
                  <button className={style.delete} onClick={()=>{
                  dispatch(deleteVideogame(id))}}>Delete</button>
                  :
                  <></>
                  }</p>
                </div>
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
           <ErrorRoute/>
          </div>
        );
      }

}