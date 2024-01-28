// TodayAiringList.jsx
import React, { useEffect, useState } from "react";
import { useAppContext } from "../components/appContext";
import { NavLink } from "react-router-dom";

const Live = () => {
	const { addToFavourite } = useAppContext();
	const [todayAiringShows, setTodayAiringShows] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTodayAiringShows = async () => {
			try {
				setLoading(true);
				setError(null);

				const currentDate = new Date().toISOString().split("T")[0];
				const bearerToken =
					"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmMzMTUyZjQ5ZTY3NmRmNjRmNjhhY2IzMmQ0OWU5ZCIsInN1YiI6IjY1YjIyNTM1NmVlY2VlMDE0NzM0MjM5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMj7va5OyB-zFgBuhXjKOrsJajqCVWH3VRmN7tmf3Ac";

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

		fetchTodayAiringShows();
	}, []);

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

	const imgContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: "auto",
		boxSizing: "border-box", // Include padding and border in the total width and height
	};


	return (
		<div style={divStyle}>

			<div style={headerStyle}><h2 >Today's Airing Shows</h2></div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{todayAiringShows.length === 0 && !loading && (
				<p>No shows airing today.</p>
			)}
			{todayAiringShows.length > 0 && (
				<ul style={ulStyle}>
					{todayAiringShows.map((show) => (
						<li key={show.id}
							style={liStyle}
						>
							<div style={imgContainerStyle}>
								<img
									src={`https://image.tmdb.org/t/p/w185${show.poster_path}`}
									alt={show.name}
									style={{ borderRadius: '10px', }}
								/>
								<div style={{ marginTop: '10px' }}>
									<p>{show.name.substring(0, 20)}...</p>
									<button onClick={() => addToFavourite(show)}>
										<NavLink to="../favourite">Add to favourite</NavLink>
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
