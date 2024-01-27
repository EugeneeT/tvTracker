// FavoritesList.js
import React from "react";
import { useAppContext } from "../components/appContext";

const Favourite = () => {
	const { favourite, removeFavourite, formatCountdown } = useAppContext();

	return (
		<div>
			<h2>My Favorites</h2>
			<ul>
				{favourite.map((favourite) => (
					<li style={{ listStyle: "none" }} key={favourite.id}>
						<p>{favourite.name}</p>
						<img
							style={{ width: "100px" }}
							src={`https://image.tmdb.org/t/p/w185${favourite.poster_path}`}
							alt={`${favourite.name} Poster`}
						/>
						<p>
							{formatCountdown(
								favourite.nextEpisode?.air_date,
								favourite.showLocation?.origin_country
							)}
						</p>
						<button onClick={() => removeFavourite(favourite.id)}>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Favourite;
