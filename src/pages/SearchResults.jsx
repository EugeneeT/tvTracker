// SearchResults.js
import React from "react";
import { useAppContext } from "../components/appContext";
import { NavLink } from "react-router-dom";

const SearchResults = () => {
	const { loading, error, showSearchResults, searchResults, addToFavourite } =
		useAppContext();

	// *** Style ***

	const divStyle = {
		position: 'fixed',
		top: '15vh',
		bottom: '10vh',
		overflowY: 'auto', // Enable vertical scrolling
	};

	const headerStyle = {
		position: 'fixed',
		marginTop: '0%',
		display: 'flex',
		flexDirection: 'column',
		justifyItems: 'center',
		width: '100%',
		height: "8%",
		background: '#242424'
	};


	const ulStyle = {
		listStyle: 'none',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		marginTop: '5%',

	};

	const liStyle = {
		margin: '20px', // Adjust the margin value as per your preference
	};

	const imgButtonContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// Ensure images take up the full width
		height: "auto",
		boxSizing: "border-box", // Include padding and border in the total width and height
	};

	return (
		<div style={divStyle}>
			<div style={headerStyle}><h2 >Search result:</h2></div>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{showSearchResults && (
				<ul style={ulStyle}>
					{searchResults.results.map((result) => (
						<li key={result.id}
							style={liStyle}>
							<div style={imgButtonContainerStyle}>
								<img
									style={{ width: "85%", borderRadius: '5px', }}
									src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
									alt={`${result.name} Poster`}
								/>
								<p>{result.name.substring(0, 20)}...</p>
								<button onClick={() => addToFavourite(result)}
									style={{ marginTop: '10px' }}>
									<NavLink to="../favourite">Add to favourite</NavLink>
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
