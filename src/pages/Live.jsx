// TodayAiringList.jsx
import React, { useEffect, useState } from "react";

const Live = () => {
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

	return (
		<div>
			<h2>Today's Airing Shows</h2>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{todayAiringShows.length === 0 && !loading && (
				<p>No shows airing today.</p>
			)}
			{todayAiringShows.length > 0 && (
				<ul>
					{todayAiringShows.map((show) => (
						<li key={show.id}>
							<img
								src={`https://image.tmdb.org/t/p/w185${show.poster_path}`}
								alt={show.name}
							/>
							<h3>{show.name}</h3>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Live;
