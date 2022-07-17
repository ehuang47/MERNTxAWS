import "./App.css";
import { Profiles } from "./pages";

// FCs will either return another FC (it's a HoC) or JSX element
// type FC<Props extends {}> = (props: Props, context?: any) => FC<any> | JSX.Element;

function App() {
	return (
		<div className="App">
			<Profiles />
		</div>
	);
}

export default App;
