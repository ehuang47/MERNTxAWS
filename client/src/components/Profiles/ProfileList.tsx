import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UserPayload } from "../../types";
import ProfileCard from "./ProfileCard";

import { profileActions } from "../../redux/actions";

export default function ProfileList(): JSX.Element {
	const profiles: { [id: string]: UserPayload } = useSelector(
		(state: any) => state.profiles
	);
	const dispatch = useDispatch();

	useEffect(() => {
		// do: dispatch action to initialize state
	}, []);

	const clearProfiles = (): void => {
		// do: dispatch clear action
	};

	return (
		<div>
			<button onClick={clearProfiles}>Clear</button>
			{Object.values(profiles).map((profile, i) => (
				<ProfileCard key={i} {...profile} />
			))}
		</div>
	);
}
