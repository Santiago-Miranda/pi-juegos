import { Link } from "react-router-dom";
import style from "./ErrorRoute.module.css";


export default function ErrorRoute(){

    return(
        <div>
            <div className={style.contenedor}>
                <img className={style.img} src="../Imagenes/error.jpg" alt="img not found" />
                <h1 className={style.ruta}>404 ERROR<br/> PAGE NOT FOUND</h1>
                    <Link to='/home'>
                       <button className={style.volver}>Volver al Home</button>
                    </Link>
            </div>   
        </div>
    )
}