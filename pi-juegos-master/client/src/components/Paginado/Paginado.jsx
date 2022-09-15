import React from "react";
import style from "./Paginado.module.css"


export default function Paginado ({videogamesPerPage, allVideogames, paginado}){

    const pageNumbers = []

    for (let i = 1; i < Math.ceil(allVideogames/videogamesPerPage); i++) { //voy a recorrer el arreglo en donde voy a tomar el numero redondeado que resulta dividir todos los juegos por el numero de juegos por pagina que yo quiero y lo pusheo // ejemplo 100 juegos dividido por 15 juegos por pagina, me da 6.6 paginas, redondeo a 7 paginas para mostrar
        pageNumbers.push(i)
    }

    return (
            <div className={style.paginado}>
                {pageNumbers && pageNumbers.map(number => ( //si el arreglo existe, entonces mapeo y devuelvo cada uno de los numeros que devuelva el paginado
                    <button onClick={() => paginado(number)} className={style.paginado_orden} key={number}>
                       <a>{number}</a>
                    </button>
                ))}
            </div>
    )
}
