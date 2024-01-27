import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeWrapper from "./pages/Home.jsx";
import Favourites from "./pages/Favourite.jsx";
import NotFound from "./pages/NotFound.jsx";
import Live from "./pages/Live.jsx";
import SearchResults from "./pages/SearchResults.jsx";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomeWrapper />}>
					<Route index element={<Live />} />
					<Route path="favourites" element={<Favourites />} />
					<Route path="*" element={<NotFound />} />
					<Route path="searchResults" element={<SearchResults />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
