// Favourite.jsx

// import components and dependencies
import React from "react";
import { useAppContext } from "../components/appContext";

const Favourite = () => {
	// Access global state and functions from the context
	const { favourite, removeFavourite, formatCountdown } = useAppContext();

	// Styles for the component
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
		height: "auto",
		boxSizing: "border-box", // Include padding and border in the total width and height
	};

	// JSX content for the Favourite component
	return (
		<div style={divStyle}>
			<div style={headerStyle}>
				<h2>My Favorites</h2>
			</div>

			<ul style={ulStyle}>
				{/* maps over the favourite array */}
				{favourite.map((favourite) => (
					<li style={liStyle} key={favourite.id}>
						<div style={imgButtonContainerStyle}>
							<h2>{favourite.name.substring(0, 10)}...</h2>
							<img
								style={{ height: "100%", borderRadius: "5px" }}
								src={`https://image.tmdb.org/t/p/w185${favourite.poster_path}`}
								alt={`${favourite.name} Poster`}
							/>
							<p style={{ width: "60%" }}>
								{/* utility function defined in the context */}
								{formatCountdown(
									favourite.nextEpisode?.air_date,
									favourite.showLocation?.origin_country
								)}
							</p>
							<button onClick={() => removeFavourite(favourite.id)}>
								Remove
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Favourite;

/*
1. **`import React from "react";`:**
   - Imports the `React` library, which is required for creating React components.

2. **`import { useAppContext } from "../components/appContext";`:**
   - Imports the `useAppContext` hook from the "../components/appContext" file, allowing the component to access global state and functions.

3. **`const Favourite = () => {...}`:**
   - Defines the `Favourite` functional component, representing the content of the "Favourite" page.

4. **`const { favourite, removeFavourite, formatCountdown } = useAppContext();`:**
   - Destructures values from the context, including the `favourite` list, `removeFavourite` function, and `formatCountdown` function.

5. **`const divStyle = {...}; const headerStyle = {...}; const ulStyle = {...}; const liStyle = {...}; const imgButtonContainerStyle = {...};`:**
   - Initializes styles for the component using inline CSS.

6. **`return (<>...</>);`:**
   - Renders the component using a fragment (`<>...</>`) to group multiple elements without introducing an additional parent node.

7. **`<div style={divStyle}>...</div>`:**
   - Contains the main content of the "Favourite" page, including the header and a list of favorite shows.

8. **`<div style={headerStyle}>...</div>`:**
   - Contains the header section, which displays the title "My Favorites."

9. **`<ul style={ulStyle}>...</ul>`:**
   - Contains an unordered list (`ul`) for displaying the list of favorite shows.

10. **`{favourite.map((favourite) => (...))}`:**
    - Maps over the `favourite` list and generates a list item (`li`) for each favorite show.

11. **`<li style={liStyle} key={favourite.id}>...</li>`:**
    - Represents each list item, displaying information about the favorite show.

12. **`<div style={imgButtonContainerStyle}>...</div>`:**
    - Contains the content of each list item, including the show's name, poster image, countdown, and a "Remove" button.

13. **`<button onClick={() => removeFavourite(favourite.id)}>Remove</button>`:**
    - Adds a button to remove the show from the favorites list, invoking the `removeFavourite` function.

14. **`export default Favourite;`:**
    - Exports the `Favourite` component as the default export of this module.

In summary, `Favourite.jsx` displays a list of favorite shows along with relevant information. 
Users can remove shows from their favorites list by clicking the "Remove" button. 
The component utilizes global state and functions from the context to manage the list of favorite shows.*/
