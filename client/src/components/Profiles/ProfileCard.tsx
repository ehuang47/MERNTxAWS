import { UserPayload } from "../../types";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { profileActions } from "../../redux/actions";
import { UPDATE_PROFILE, DELETE_PROFILE } from "../../redux/constant";
import AddProfile from "./AddProfile";
// const {} = profileActions
interface Props extends UserPayload {}

export default function ProfileCard({
	id,
	profile,
	name,
	email,
	phone,
}: Props): JSX.Element {
	const [editing, setEditing] = useState(false);
	const dispatch = useDispatch();

	const toggleEditing = () => setEditing((prev) => !prev);
	const deleteProfile = (): void => {
		// do: dispatch delete action
	};

	if (editing)
		return (
			<div>
				<button onClick={toggleEditing}>Cancel</button>
				<AddProfile actionType={UPDATE_PROFILE} />;
			</div>
		);

	return (
		<div>
			<button onClick={toggleEditing}>Edit</button>
			<button onClick={deleteProfile}>Delete</button>
			<p>{profile}</p>
			<p>{name}</p>
			<p>{email}</p>
			<p>{phone}</p>
		</div>
	);
}
