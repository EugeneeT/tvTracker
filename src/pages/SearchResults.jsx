// SearchResults.jsx

// 1. import needed functions and dependencies
import { useAppContext } from "../components/AppContext";


// Styles for div, ul, li, img and button sections
const divStyle = {
	position: "fixed",
	top: "15vh",
	bottom: "10vh",
	overflowY: "auto", // Enable vertical scrolling
};

const headerStyle = {
	position: "fixed",
	marginTop: "0%",
	display: "flex",
	flexDirection: "column",
	justifyItems: "center",
	width: "100%",
	height: "8%",
	background: "#242424",
};

const ulStyle = {
	listStyle: "none",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	flexWrap: "wrap",
	marginTop: "5%",
};

const liStyle = {
	margin: "20px", // Adjust the margin value as per your preference
};

const imgButtonContainerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	// Ensure images take up the full width
	height: "auto",
	boxSizing: "border-box", // Include padding and border in the total width and height
};


const SearchResults = () => {
	const { loading, error, showSearchResults, searchResults, addToFavorite } =
		useAppContext();

	return (
		<div style={divStyle}>
			<div style={headerStyle}>
				<h2>Search result:</h2>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{showSearchResults && (
				<ul style={ulStyle}>
					{searchResults.results.map((result) => (
						<li key={result.id} style={liStyle}>
							<div style={imgButtonContainerStyle}>
								<img
									style={{ width: "85%", borderRadius: "5px" }}
									src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
									alt={`${result.name} Poster`}
								/>
								<p>{result.name.substring(0, 20)}...</p>
								<button
									onClick={() => addToFavorite(result)}
									style={{ marginTop: "10px" }}
								>
									Add to favorites
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchResults;
