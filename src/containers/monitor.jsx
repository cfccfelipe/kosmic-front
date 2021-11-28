import { VictoryLine, VictoryChart } from "victory";


const Monitor = ({DatosVitales}) => {

    if(DatosVitales.length === 0)
    {
        return ( 
            <div className="monitor-container flexcenter">
                <p>Id No valida </p>       
            </div>
        );
    }
    const promedio = arr => {
        let pro = 0;
        for(let i = 0; i < arr.length; i++)
        {
            pro += arr[i];
        }
        return pro/ arr.length;
    }

    let promedioTemp = promedio(DatosVitales.map(vac =>  vac.variables.temperatura));
    let promedioCard = promedio(DatosVitales.map(vac =>  vac.variables.cardiaco));
    let promedioResp = promedio(DatosVitales.map(vac =>  vac.variables.respiracion));

    return (
        <div className="monitor-container flexcenter" >
            <div className="despliegue-data flexcenter">
                <p>Temperatura <br/>Promedio: {promedioTemp}</p>
                <p>Frecuencia Cardiaca <br/>Promedio: {promedioCard}</p>
                <p>Frecuencia Respiratoria <br/>Promedio: {promedioResp}</p>
            </div>
        </div>
    );
}

export default Monitor;
