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

    const tempA =  DatosVitales.map(vac =>  vac.variables.temperatura);
    const cardA =  DatosVitales.map(vac =>  vac.variables.cardiaco);
    const respA =  DatosVitales.map(vac =>  vac.variables.respiracion);
    const dataTA =  DatosVitales.map((vac,i) =>  {
        return {
        x: i,
        y: vac.variables.temperatura, 
        }
    });
    const dataCA =  DatosVitales.map((vac,i) =>  {
        return {
        x: i,
        y: vac.variables.cardiaco, 
        }
    });
    const dataRA =  DatosVitales.map((vac,i) =>  {
        return {
        x: i,
        y: vac.variables.respiracion, 
        }
    });

    const promedioTemp = promedio(tempA); 
    const promedioCard = promedio(cardA);
    const promedioResp = promedio(respA);

    const Grafica = () => {



        return (

            <div className="fondoblanco flexcenter" >
                <VictoryChart>
                    <VictoryLine data={dataTA} 
                    style={{ data: { stroke: "#25ba52" } }}
            /> 
                    <VictoryLine data={dataCA}/>
                    <VictoryLine data={dataRA}
                    style={{ data: { stroke: "red" } }}
            />


                </VictoryChart>
                <div className="flsty">
                    <p style={{color:"#25ba52"}}>Temperatura</p> 
                    <p style={{color:"black"}}>Frecuencia Cardiaca</p> 
                    <p style={{color:"red"}}>Frecuencia Respiratoria</p> 
                </div>
            </div>
        );
    }

    return (
        <div className="monitor-container flexcenter" >
            <div className="despliegue-data flexcenter">
                <div className="caja-promedios flexcenter">
                    <h5>Temperatura Promedio</h5>
                    <p>{promedioTemp}</p>
                </div>
                <div className="caja-promedios flexcenter">
                    <h5>Frecuencia Cardiaca <br/> Promedio</h5>
                    <p>{promedioCard}</p>
                </div>
                <div className="caja-promedios flexcenter">
                    <h5>Frecuencia Respiratoria <br/> Promedio</h5>
                    <p>{promedioResp}</p>
                </div>
            </div>
            <Grafica />
        </div>
    );
}

export default Monitor;
