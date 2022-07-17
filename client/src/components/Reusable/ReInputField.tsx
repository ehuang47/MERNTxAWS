import React from "react";

interface Props {
	id: string;
	type: string;
	name: string;
	value: string;
	valid: boolean;
	onChange: (e: any) => void;
}

export default function ReInputField({ id, name, valid, ...props }: Props): JSX.Element {
	return (
		<div>
			<label htmlFor={id}>{name[0].toUpperCase() + name.substring(1)}: </label>
			<input
				id={id}
				style={valid ? { color: "green" } : { color: "red" }}
				name={name}
				{...props}
			/>
		</div>
	);
}
