// SearchResults.jsx

// 1. import needed functions and dependencies
import { useAppContext } from "../components/AppContext";

// Styles for div, ul, li, img and button sections
const divStyle = {
	position: "fixed",
	top: "15vh", // Top position, 15% of the viewport height from the top
	bottom: "10vh", // Bottom position, 10% of the viewport height from the bottom
	overflowY: "auto", // Enable vertical scrolling
};

const headerStyle = {
	position: "fixed",
	marginTop: "0%", // Top margin set to 0%
	display: "flex",
	flexDirection: "column",
	justifyItems: "center", // Center the items along the cross axis (vertically in this case)
	width: "100%", // Full width
	height: "8%", // 8% of the viewport height
	background: "#242424", // Background color
};

const ulStyle = {
	listStyle: "none", // Remove default list styling (bullets/numbers)
	display: "flex", // Use flex container for the unordered list
	flexDirection: "row", // Arrange list items in a row (horizontal) direction
	alignItems: "center", // Align list items along the cross axis (vertically center them)
	flexWrap: "wrap", // Allow items to wrap to the next line if there's not enough space
	marginTop: "5%", // Top margin, 5% of the parent container's height
};

const liStyle = {
	margin: "20px", // Margin around each list item
};

const imgButtonContainerStyle = {
	display: "flex", // Use flex container for the image and button container
	flexDirection: "column", // Stack items vertically
	alignItems: "center", // Center items along the cross axis (vertically in this case)
	// Ensure images take up the full width
	height: "auto", // Automatically adjust height based on content
	boxSizing: "border-box", // Include padding and border in the total width and height
};

const SearchResults = () => {
	const { loading, error, showSearchResults, searchResults, addToFavorite } =
		useAppContext();

	// JSX content for the SearchResults component
	return (
		<div style={divStyle}>
			<div style={headerStyle}>
				<h2>Search result:</h2>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{showSearchResults && (
				<ul style={ulStyle}>
					{/* maps over the results array */}
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

/*
1. **`import React from "react";`:**
   - Imports the `React` library, which is required for creating React components.

2. **`import { useAppContext } from "../components/appContext";`:**
   - Imports the `useAppContext` hook from the "../components/appContext" file, allowing the component to access global state and functions.

3. **`const SearchResults = () => {...}`:**
   - Defines the `SearchResults` functional component, representing the content of the "Search Results" page.

4. **`const { loading, error, showSearchResults, searchResults, addToFavourite } = useAppContext();`:**
   - Destructures values from the context, including `loading`, `error`, `showSearchResults`, `searchResults`, and `addToFavourite`.

5. **`const divStyle = {...}; const headerStyle = {...}; const ulStyle = {...}; const liStyle = {...}; const imgButtonContainerStyle = {...};`:**
   - Initializes styles for the component using inline CSS.

6. **`return (<>...</>);`:**
   - Renders the component using a fragment (`<>...</>`) to group multiple elements without introducing an additional parent node.

7. **`<div style={divStyle}>...</div>`:**
   - Contains the main content of the "Search Results" page, including the header, loading/error messages, and the list of search results.

8. **`<div style={headerStyle}>...</div>`:**
   - Contains the header section, which displays the title "Search result."

9. **`{loading && <p>Loading...</p>}`:**
   - Renders a loading message (`<p>Loading...</p>`) if the `loading` state is `true`.

10. **`{error && <p style={{ color: "red" }}>{error}</p>}`:**
    - Renders an error message (`<p style={{ color: "red" }}>{error}</p>`) if the `error` state is truthy.

11. **`{showSearchResults && (...)}`:**
    - Checks if `showSearchResults` is `true` before rendering the list of search results. This is a conditional rendering approach.

12. **`<ul style={ulStyle}>...</ul>`:**
    - Contains an unordered list (`ul`) for displaying the list of search results.

13. **`{searchResults.results.map((result) => (...))}`:**
    - Maps over the `results` array of the `searchResults` object and generates a list item (`li`) for each search result.

14. **`<li key={result.id} style={liStyle}>...</li>`:**
    - Represents each list item, displaying information about the search result.

15. **`<div style={imgButtonContainerStyle}>...</div>`:**
    - Contains the content of each list item, including the result's name, poster image, and an "Add to favourite" button.

16. **`<button onClick={() => addToFavourite(result)} style={{ marginTop: "10px" }}>Add to favourite</button>`:**
    - Adds a button to add the search result to the favorites list, invoking the `addToFavourite` function.

17. **`export default SearchResults;`:**
    - Exports the `SearchResults` component as the default export of this module.

In summary, `SearchResults.jsx` displays the search results and allows users to add a search result to their favorites list. 
The component utilizes global state and functions from the context to manage the search results and handle interactions. 
The conditional rendering ensures that the list of search results is displayed only when `showSearchResults` is `true`.*/
