import { useEffect, useState } from "react";

import ProfileCard from "./ProfileCard";
import { profileActions } from "../../redux/actions";
import { TypedDispatch, useTypedDispatch, useTypedSelector } from "../../redux/store";

export default function ProfileList(): JSX.Element {
	const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

	const requestStatus: {
		loading: boolean;
		success: boolean;
		responseMsg: string;
	} = useTypedSelector((state: any) => state.profiles.request);

	const profileIDs: string[] = useTypedSelector((state: any) =>
		Object.keys(state.profiles.profileList)
	);
	const dispatch: TypedDispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(profileActions.getProfiles());
	}, []);

	const updateSelected = (selected: boolean, id: string): void => {
		if (selected) setSelectedProfiles((prevSelected) => [...prevSelected, id]);
		else
			setSelectedProfiles((prevSelected) =>
				prevSelected.filter((selectedId) => selectedId !== id)
			);
	};

	const removeAll = (): void => {
		dispatch(profileActions.deleteProfiles(selectedProfiles));
		setSelectedProfiles([]);
	};

	// custom request notification
	const banner = (
		<p style={{ color: requestStatus.loading ? "yellow" : "red" }}>
			{requestStatus.responseMsg}
		</p>
	);
	return (
		<div>
			{!requestStatus.success && requestStatus.responseMsg && banner}
			{selectedProfiles.length > 0 && <button onClick={removeAll}>Remove All</button>}
			{profileIDs.map((id) => (
				<ProfileCard key={id} id={id} updateSelected={updateSelected} />
			))}
		</div>
	);
}
