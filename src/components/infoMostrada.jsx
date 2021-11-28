const InfoMostrada = (props) => (
	<div onClick={props.method} className='info-display flexcenter'>
		{props.children}
	</div>
);

export default InfoMostrada;
