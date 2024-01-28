// Live.jsx

// 1. import needed functions and dependencies
import React, { useEffect, useState } from "react";
import { useAppContext } from "../components/AppContext";
import { NavLink } from "react-router-dom";

// Styles for div, ul, and li sections
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

const imgContainerStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	height: "auto",
	boxSizing: "border-box", // Include padding and border in the total width and height
};

const Live = () => {
	// Access global state and functions from the context
	const { addToFavorite } = useAppContext();

	// Local state to store today's airing shows, loading state, and error state
	const [todayAiringShows, setTodayAiringShows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Fetch today's airing shows using an effect
	useEffect(() => {
		const fetchTodayAiringShows = async () => {
			try {
				setLoading(true);
				setError(null);

				// Get the current date in the required format
				const currentDate = new Date().toISOString().split("T")[0];
				// Test bearer token (replace with actual token)
				const bearerToken =
					"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmMzMTUyZjQ5ZTY3NmRmNjRmNjhhY2IzMmQ0OWU5ZCIsInN1YiI6IjY1YjIyNTM1NmVlY2VlMDE0NzM0MjM5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMj7va5OyB-zFgBuhXjKOrsJajqCVWH3VRmN7tmf3Ac";

				// Fetch today's airing shows from the API
				const response = await fetch(
					`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte=${currentDate}&air_date.gte=${currentDate}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${bearerToken}`,
							Accept: "application/json",
						},
					}
				);

				if (response.ok) {
					const { results } = await response.json();
					setTodayAiringShows(results);
				} else {
					setError(`Error: ${response.status} - ${response.statusText}`);
				}
			} catch (error) {
				setError(`Error fetching today's airing shows: ${error.message}`);
			} finally {
				setLoading(false);
			}
		};
		// Call the fetchTodayAiringShows function when the component mounts
		fetchTodayAiringShows();
	}, []); // The empty dependency array ensures the effect runs only once on mount

	// JSX content for the Live component
	return (
		<div style={divStyle}>
			<div style={headerStyle}>
				<h2>Today's Airing Shows</h2>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{todayAiringShows.length === 0 && !loading && (
				<p>No shows airing today.</p>
			)}
			{/* conditional render if shows are available */}
			{todayAiringShows.length > 0 && (
				<ul style={ulStyle}>
					{todayAiringShows.map((show) => (
						<li key={show.id} style={liStyle}>
							<div style={imgContainerStyle}>
								<img
									src={`https://image.tmdb.org/t/p/w185${show.poster_path}`}
									alt={show.name}
									style={{ borderRadius: "10px" }}
								/>
								<div style={{ marginTop: "10px" }}>
									<p>{show.name.substring(0, 20)}...</p>
									<button onClick={() => addToFavorite(show)}>
										Add to favorite
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Live;

/*
1. **`import React, { useEffect, useState } from "react";`:**
   - Imports React along with the `useEffect` and `useState` hooks for managing side effects and local component state.

2. **`import { useAppContext } from "../components/appContext";`:**
   - Imports the `useAppContext` hook from the "../components/appContext" file, allowing the component to access global state and functions.

3. **`import { NavLink } from "react-router-dom";`:**
   - Imports the `NavLink` component from `react-router-dom` for navigation.

4. **`const Live = () => {...}`:**
   - Defines the `Live` functional component, representing the content of the "Live" page.

5. **`const { addTofavorite } = useAppContext();`:**
   - Destructures the `addTofavorite` function from the context, which allows adding shows to the favorites list.

6. **`const [todayAiringShows, setTodayAiringShows] = useState([]);`:**
   - Initializes local state to store today's airing shows.

7. **`const [loading, setLoading] = useState(false); const [error, setError] = useState(null);`:**
   - Initializes local state for loading and error handling.

8. **`useEffect(() => {...}, []);`:**
   - Uses the `useEffect` hook to fetch today's airing shows when the component mounts.*/
