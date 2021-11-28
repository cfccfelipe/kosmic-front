const InputText = props => <input 
    type={props.type || "text"} 
    onChange={props.setter} 
    className="input-text" 
    value={props.val}  />
  
 export default InputText
