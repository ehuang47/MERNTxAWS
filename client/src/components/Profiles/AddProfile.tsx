import { FormEvent, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { ReduxAction, UserInterface, UserPayload } from "../../types";
import { ReInputField } from "../Reusable";

interface Props {
	actionType: string;
}

export default function AddProfile({ actionType }: Props): JSX.Element {
	const defaultInputs = {
		profile: { value: "", valid: true },
		name: { value: "", valid: true },
		email: { value: "", valid: true },
		phone: { value: "", valid: true },
	};

	const [inputs, setInputs] = useState(defaultInputs);
	const dispatch = useDispatch();

	const handleChange = (e: FormEvent<HTMLInputElement>): void => {
		const target = e.target as HTMLInputElement;
		const fieldName: string = target.name;
		const fieldValue: string = target.value;

		let isValid: boolean = true;
		switch (fieldName) {
			case "profile":
				// isValid = /^[a-zA-Z0-9]+\.((png)|(jpeg)|(jpg))$/g.test(fieldValue);
				isValid = /.+\.((png)|(jpeg)|(jpg))$/g.test(fieldValue);
				break;
			case "name":
				isValid = /^[a-zA-Z]+$/g.test(fieldValue);
				break;
			case "email":
				isValid = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{3}$/g.test(fieldValue);
				break;
			case "phone":
				isValid = /^[0-9]-([0-9]{3}-){2}[0-9]{4}$/g.test(fieldValue);
				break;
			default:
		}

		setInputs((prevInputs) => {
			return { ...prevInputs, [fieldName]: { value: fieldValue, valid: isValid } };
		});
	};

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();

		if (Object.values(inputs).every(({ valid }) => valid)) {
			const payload: UserInterface = Object.entries(inputs).reduce((map, [k, v]) => {
				map[k] = v.value;
				return map;
			}, {} as any);

			const action: ReduxAction<UserInterface> = { type: actionType, payload };
			console.log(action);
			// do: dispatch add action to redux

			// setInputs(defaultInputs);
		}
	};

	return (
		<form>
			<ReInputField
				id="0"
				type="file"
				name="profile"
				value={inputs.profile.value}
				valid={inputs.profile.valid}
				onChange={handleChange}
			/>

			<ReInputField
				id="1"
				type="text"
				name="name"
				value={inputs.name.value}
				valid={inputs.name.valid}
				onChange={handleChange}
			/>

			<ReInputField
				id="2"
				type="text"
				name="email"
				value={inputs.email.value}
				valid={inputs.email.valid}
				onChange={handleChange}
			/>

			<ReInputField
				id="3"
				type="text"
				name="phone"
				value={inputs.phone.value}
				valid={inputs.phone.valid}
				onChange={handleChange}
			/>
			<button type="submit" onClick={handleSubmit}>
				Submit
			</button>
		</form>
	);
}
