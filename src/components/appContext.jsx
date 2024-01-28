// AppContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

import { DateTime } from "luxon";
import { timeZoneData } from "./timeZoneData.jsx";

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [favourite, setFavourite] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [inputValue, setInputValue] = useState("");

	const apiUrl = "https://api.themoviedb.org/3";
	const bearerToken =
		"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmMzMTUyZjQ5ZTY3NmRmNjRmNjhhY2IzMmQ0OWU5ZCIsInN1YiI6IjY1YjIyNTM1NmVlY2VlMDE0NzM0MjM5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMj7va5OyB-zFgBuhXjKOrsJajqCVWH3VRmN7tmf3Ac";

	const handleSearch = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(
				`${apiUrl}/search/tv?query=${encodeURIComponent(
					inputValue
				)}&include_adult=false&language=en-US&page=1`,
				{
					method: "GET",
					headers: {
						accept: "application/json",
						Authorization: `Bearer ${bearerToken}`,
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setSearchResults(data);
				setShowSearchResults(true);
			} else {
				setError(`Error: ${response.status} - ${response.statusText}`);
			}
		} catch (error) {
			setError(`Error during search: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleButtonClick = () => {
		setSearchQuery(inputValue);
		handleSearch();
	};

	const addToFavourite = async (show) => {
		try {
			const isAlreadyInFavourite = favourite.some((fav) => fav.id === show.id);

			if (isAlreadyInFavourite) {
				alert("Show is already in favourite.");
				return;
			}

			const response = await fetch(`${apiUrl}/tv/${show.id}?language=en-US`, {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${bearerToken}`,
				},
			});

			if (response.ok) {
				alert("Show was added to favourite.");
				const data = await response.json();

				const nextEpisode = data.next_episode_to_air;
				const showLocation = data.networks[0];

				setFavourite((prevFavourite) => {
					const updatedFavourite = [
						...prevFavourite,
						{ ...show, nextEpisode, showLocation },
					];
					localStorage.setItem("favourite", JSON.stringify(updatedFavourite));
					return updatedFavourite;
				});
			} else {
				setError(
					`Error fetching next episode details: ${response.status} - ${response.statusText}`
				);
			}
		} catch (error) {
			setError(`Error adding to favourite: ${error.message}`);
		}
	};

	const removeFavourite = (showId) => {
		setFavourite((prevFavourite) => {
			const updatedFavourite = prevFavourite.filter((fav) => fav.id !== showId);
			localStorage.setItem("favourite", JSON.stringify(updatedFavourite));
			return updatedFavourite;
		});
	};

	const formatCountdown = (air_date, origin_country) => {
		try {
			if (!air_date) {
				return "Air date for upcoming episode unconfirmed";
			}

			// Find the timezone for the origin country
			const timeZoneEntry = timeZoneData.find(
				(entry) => entry.iso_3166_1 === origin_country
			);
			if (!timeZoneEntry) {
				return "Error: Unable to find timezone for country code";
			}
			const timeZone = timeZoneEntry.ianaTimeZone;

			// Get the current date and time in the target timezone
			const currentDate = DateTime.local().setZone(timeZone);
			const nextAiredDate = DateTime.fromISO(air_date).setZone(timeZone);

			// Check if the air date is in the past
			if (nextAiredDate < currentDate) {
				return "Latest episode available now";
			}

			const timeDifference = nextAiredDate
				.diff(currentDate, ["days", "hours", "minutes"])
				.toObject();
			const days = Math.floor(timeDifference.days);
			const hours = Math.floor(timeDifference.hours);
			const minutes = Math.floor(timeDifference.minutes);

			return `Origin air day in: ${days}d ${hours}h ${minutes}m`;
		} catch (error) {
			console.error("Error in formatCountdown:", error);
			return "Error calculating countdown";
		}
	};

	useEffect(() => {
		const storedFavourite = localStorage.getItem("favourite");
		if (storedFavourite) {
			setFavourite(JSON.parse(storedFavourite));
		}
	}, []);

	return (
		<AppContext.Provider
			value={{
				searchQuery,
				setSearchQuery,
				searchResults,
				setSearchResults,
				loading,
				setLoading,
				error,
				setError,
				favourite,
				setFavourite,
				showSearchResults,
				setShowSearchResults,
				inputValue,
				setInputValue,
				handleSearch,
				handleButtonClick,
				handleInputChange,
				addToFavourite,
				removeFavourite,
				formatCountdown,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within a AppProvider");
	}
	return context;
};

export { AppProvider, useAppContext };
