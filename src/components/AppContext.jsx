// AppContext.jsx

// 1. import needed functions and dependencies
import React, { createContext, useContext, useState, useEffect } from "react";

// Time countdown calculation extensions
import { DateTime } from "luxon";
import { timeZoneData } from "./timeZoneData.jsx";


const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [favorite, setFavorite] = useState([]);
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

	const addToFavorite = async (show) => {
		try {
			const isAlreadyInFavorite = favorite.some((fav) => fav.id === show.id);

			if (isAlreadyInFavorite) {
				// alert("Show is already in favorite.");
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
				// alert("Show was added to favorite.");
				const data = await response.json();
				const nextEpisode = data.next_episode_to_air;
				const showLocation = data.networks[0];
				const homepage = data.homepage;
				console.log(data)

				setFavorite((prevFavorite) => {
					const updatedFavorite = [
						...prevFavorite,
						{ ...show, nextEpisode, showLocation, homepage, },
					];
					localStorage.setItem("favorite", JSON.stringify(updatedFavorite));
					return updatedFavorite;
				});
			} else {
				setError(
					`Error fetching next episode details: ${response.status} - ${response.statusText}`
				);
			}
		} catch (error) {
			setError(`Error adding to favorite: ${error.message}`);
		}
	};

	const removeFavorite = (showId) => {
		setFavorite((prevFavorite) => {
			const updatedFavorite = prevFavorite.filter((fav) => fav.id !== showId);
			localStorage.setItem("favorite", JSON.stringify(updatedFavorite));
			return updatedFavorite;
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
		const storedFavorite = localStorage.getItem("favorite");
		if (storedFavorite) {
			setFavorite(JSON.parse(storedFavorite));
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
				favorite,
				setFavorite,
				showSearchResults,
				setShowSearchResults,
				inputValue,
				setInputValue,
				handleSearch,
				handleButtonClick,
				handleInputChange,
				addToFavorite,
				removeFavorite,
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
