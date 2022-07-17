import { AddProfile, ProfileList } from "../components/Profiles";
import { ADD_PROFILE } from "../redux/constant";
export default function Profiles(): JSX.Element {
	return (
		<>
			<AddProfile actionType={ADD_PROFILE} />
			<ProfileList />
		</>
	);
}
