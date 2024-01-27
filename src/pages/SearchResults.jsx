// SearchResults.js
import React from "react";
import { useAppContext } from "../components/appContext";
import { NavLink } from "react-router-dom";

const SearchResults = () => {
	const { loading, error, showSearchResults, searchResults, addToFavourite } =
		useAppContext();

	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{showSearchResults && (
				<ul>
					{searchResults.results.map((result) => (
						<li key={result.id}>
							<img
								style={{ width: "100px" }}
								src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
								alt={`${result.name} Poster`}
							/>{" "}
							<button onClick={() => addToFavourite(result)}>
								<NavLink to="../favourite">Add to favourite</NavLink>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchResults;
