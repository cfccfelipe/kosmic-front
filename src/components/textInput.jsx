<<<<<<< HEAD
const InputText = (props) => (
	<input
		type={props.type || 'text'}
		onChange={props.setter}
		className='input-textt'
		value={props.val}
	/>
);

export default InputText;
=======
const InputText = props => <input 
    type={props.type || "text"} 
    onChange={props.setter} 
    className={props.className || "input-textt"} 
    value={props.val}  />
  
 export default InputText
>>>>>>> 7048800b19f6a691a64b3072fccb10ad62c2982f
