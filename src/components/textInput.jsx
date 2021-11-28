const InputText = (props) => (
	<input
		type={props.type || 'text'}
		onChange={props.setter}
		className={props.className || 'input-textt'}
		value={props.val}
	/>
);

export default InputText;
