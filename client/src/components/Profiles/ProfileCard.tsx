import { UserPayload } from "../../types";
import { useState } from "react";
import { profileActions } from "../../redux/actions";
import { UPDATE_PROFILE } from "../../redux/constant";
import AddProfile from "./AddProfile";
import { TypedDispatch, useTypedDispatch, useTypedSelector } from "../../redux/store";
interface Props {
	id: string;
	updateSelected: (selected: boolean, id: string) => void;
}

export default function ProfileCard({ id, updateSelected }: Props): JSX.Element {
	const [editing, setEditing] = useState(false);
	const [selected, setSelected] = useState(false);

	const profile: UserPayload = useTypedSelector(
		(state: any) => state.profiles.profileList[id]
	);
	const dispatch: TypedDispatch = useTypedDispatch();

	const toggleEditing = (): void => setEditing((prev) => !prev);
	const toggleSelected = (): void => {
		updateSelected(!selected, id);
		setSelected((prev) => !prev);
	};
	const deleteProfile = (): void => {
		dispatch(profileActions.deleteProfiles([id]));
	};

	if (editing)
		return (
			<div>
				<button onClick={toggleEditing}>Back</button>
				<AddProfile actionType={UPDATE_PROFILE} profileID={id} />
			</div>
		);

	// profile = data:${content-type};base64,${converted buffer}
	return (
		<div>
			<button onClick={toggleSelected}>{selected ? "Unselect" : "Select"}</button>
			<button onClick={toggleEditing}>Edit</button>
			<button onClick={deleteProfile}>Delete</button>

			<img
				style={{ width: "50%", height: "50%" }}
				src={profile.profile as string}
				alt="Not Yet Uploaded"
			></img>
			<p>{profile.name}</p>
			<p>{profile.phone}</p>
			<p>{profile.email}</p>
		</div>
	);
}
