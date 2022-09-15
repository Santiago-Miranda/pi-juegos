import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getNameVideogames } from "../../actions";
import style from "./SearchBar.module.css"

export default function SearchBar(){

    const dispatch = useDispatch();

    const [name, setName] = useState("");

   


   function handleInputChange(e){ //setea los cambios que escriba el usuario en el input
       e.preventDefault();
       setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVideogames(name)); //despacha el estado local, que sera lo que escribe el usuario al buscar con el boton
        setName("")
    }

    return(
        <div>
            <input
               className={style.input}
               value={name}
               type="text"
               placeholder="Buscar Videojuego..."
               onChange={(e) => handleInputChange(e)}
            />
            <button className={style.boton} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )

}