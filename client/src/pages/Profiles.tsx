import { ProfilesComponents } from "components";
export default function Profiles(): JSX.Element {
	return (
		<>
			<ProfilesComponents.AddProfile />
			<ProfilesComponents.ProfileList />
		</>
	);
}
