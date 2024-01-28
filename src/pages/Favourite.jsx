// FavoritesList.js
import React from "react";
import { useAppContext } from "../components/appContext";

const Favourite = () => {
	const { favourite, removeFavourite, formatCountdown } = useAppContext();

	// *** Style ***

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

	return (
		<div style={divStyle}>
			<div style={headerStyle}>
				<h2>My Favorites</h2>
			</div>

			<ul style={ulStyle}>
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
