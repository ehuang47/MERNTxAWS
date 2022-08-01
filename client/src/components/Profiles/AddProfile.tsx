import type { FormEventHandler, MouseEventHandler } from "react";
import { useState } from "react";

import { ReInputField } from "components/Reusable";
// traditional redux
// import { profileActions } from "redux/actions";
// import { TypedDispatch, useTypedDispatch } from "redux/store";

// RTK
import type { TypedDispatch } from "rtk/store";
import { useTypedDispatch } from "rtk/hooks";
import { addProfile, updateProfile } from "rtk/slices/profileThunk";

interface Props {
	profileID?: string;
}

interface FormInputs {
	profile: { value: string | File; previewUrl: string; name: string; valid: boolean };
	name: { value: string; valid: boolean };
	email: { value: string; valid: boolean };
	phone: { value: string; valid: boolean };
}
export default function AddProfile({ profileID }: Props): JSX.Element {
	// do: if profileID, load current values as initial state
	const defaultInputs: FormInputs = {
		profile: { value: "", previewUrl: "", name: "", valid: false },
		name: { value: "", valid: false },
		email: { value: "", valid: false },
		phone: { value: "", valid: false },
	};

	const [inputs, setInputs] = useState<FormInputs>(defaultInputs);
	const dispatch: TypedDispatch = useTypedDispatch();

	const handleChange: FormEventHandler<HTMLFormElement> = (e) => {
		const target: HTMLInputElement = e.target as HTMLInputElement;
		const fieldName: string = target.name;
		const fieldValue: string = target.value;
		const imgList: FileList = target.files as FileList;
		let isValid: boolean = true;

		// input validation with regex
		switch (fieldName) {
			case "profile":
				// isValid = /^[a-zA-Z0-9]+\.((png)|(jpeg)|(jpg))$/g.test(fieldValue);
				console.log(imgList[0]);
				isValid = /.+((png)|(jpeg)|(jpg))$/g.test(imgList[0].type);
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

		// creating object urls for image preview
		setInputs((prevInputs) => {
			let newVal: object & any;
			if (fieldName === "profile") {
				if (prevInputs.profile.previewUrl.length > 0)
					URL.revokeObjectURL(prevInputs.profile.previewUrl);

				newVal = {
					value: imgList[0],
					previewUrl: URL.createObjectURL(imgList[0]),
					name: fieldValue,
					valid: isValid,
				};
			} else newVal = { value: fieldValue, valid: isValid };
			return { ...prevInputs, [fieldName]: newVal };
		});
	};

	const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();

		if (Object.values(inputs).every(({ valid }) => valid)) {
			const formData: FormData = new FormData();
			Object.entries(inputs).forEach(([k, v]) => formData.set(k, v.value));
			if (profileID) formData.set("_id", profileID);

			// redux
			// dispatch(
			// 	profileID
			// 		? profileActions.updateProfile(formData)
			// 		: profileActions.addProfile(formData)
			// ).then(()=>setInputs(defaultInputs));

			// RTK
			dispatch(profileID ? updateProfile(formData) : addProfile(formData)).then(() =>
				setInputs(defaultInputs)
			);
		}
	};

	return (
		<form>
			<ReInputField
				id="0"
				type="file"
				accept="image/*"
				name="profile"
				value={inputs.profile.name}
				valid={inputs.profile.valid}
				onChange={handleChange}
			/>
			{inputs.profile.value instanceof File && (
				<img
					style={{ width: "50%", height: "50%" }}
					src={inputs.profile.previewUrl}
					alt="Not Yet Uploaded"
				></img>
			)}
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
