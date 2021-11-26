
const InfoMostrada = props => {

    return (
        <div className="info-display flexcenter">
            <h3>{props.name}</h3>

            <p>Correo: {props.email} </p>

            <p>Telefono: {props.phone} </p>
        </div>
    )
}

export default InfoMostrada;
