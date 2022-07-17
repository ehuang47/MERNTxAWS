import { AddProfile, ProfileList } from "../components/Profiles";

const Profiles = (): JSX.Element => {
	return (
		<>
			<AddProfile actionType={"ADD"} />
			<ProfileList actionType={"UPDATE"} />
		</>
	);
};
export default Profiles;
