import {Link} from "react-router-dom"

const MenuDes = props => {

    return (
            <div className="centered-menu flexcenter">
                <h3>{props.name}</h3> 
                
                {props.children}
                <div className="button-cont">
                    <button className="button-green btlf" > 
                        <Link to={props.actualizar} >
                           Actualizar
                        </Link>
                    </button>
                    <button className="button-green" onClick={props.eliminar} > Eliminar </button>
                    <button className="button-green btrg" onClick={props.salir} > Salir </button> 
                </div>
            </div>
    )
} 

export default MenuDes
