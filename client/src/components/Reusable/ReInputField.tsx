interface Props {
	id: string;
	type: string;
	accept?: string;
	name: string;
	value: any;
	valid: boolean;
	onChange: (e: any) => void;
}

export default function ReInputField({ id, name, valid, ...props }: Props): JSX.Element {
	return (
		<div>
			<label htmlFor={id}>{name[0].toUpperCase() + name.substring(1)}: </label>
			<input id={id} style={{ color: valid ? "green" : "red" }} name={name} {...props} />
		</div>
	);
}
