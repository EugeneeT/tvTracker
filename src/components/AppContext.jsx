// AppContext.jsx

// 1. Import needed functions and dependencies
import React, { createContext, useContext, useState, useEffect } from "react";

// Time countdown calculation extensions
import { DateTime } from "luxon";
import { timeZoneData } from "./timeZoneData.jsx";

// Create a context to provide state and functions to components
const AppContext = createContext();

// Provide context through AppProvider
// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
	// State variables to manage various aspects of the application
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [favorite, setFavorite] = useState([]); // Renamed from 'favourite'
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [inputValue, setInputValue] = useState("");

	// - `searchQuery`: Holds the current search query entered by the user.
	// - `setSearchQuery`: A function to update the `searchQuery` state.
	// - `searchResults`: Stores the results of the TV show search.
	// - `setSearchResults`: A function to update the `searchResults` state.
	// - `loading`: Indicates whether the application is currently in a loading state.
	// - `setLoading`: A function to update the `loading` state.
	// - `error`: Stores any error that occurs during API requests or other operations.
	// - `setError`: A function to update the `error` state.
	// - `favorite`: Stores an array of favorite TV shows.
	// - `setFavorite`: A function to update the `favorite` state.
	// - `showSearchResults`: Indicates whether to display the search results.
	// - `setShowSearchResults`: A function to update the `showSearchResults` state.
	// - `inputValue`: Holds the current value of the input in the search bar.
	// - `setInputValue`: A function to update the `inputValue` state.

	// API details for making requests to themoviedb.org
	const apiUrl = "https://api.themoviedb.org/3";
	const bearerToken =
		"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmMzMTUyZjQ5ZTY3NmRmNjRmNjhhY2IzMmQ0OWU5ZCIsInN1YiI6IjY1YjIyNTM1NmVlY2VlMDE0NzM0MjM5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bMj7va5OyB-zFgBuhXjKOrsJajqCVWH3VRmN7tmf3Ac";

	// Function to handle TV show search
	const handleSearch = async () => {
		try {
			// Set loading to true to indicate that the search is in progress
			setLoading(true);
			// Clear any previous error messages
			setError(null);

			// Make a GET request to the themoviedb API to search for TV shows
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

			// Check if the response status is OK (status code 200)
			if (response.ok) {
				// Parse the response body as JSON
				const data = await response.json();
				// Update the state with the search results
				setSearchResults(data);
				// Set the flag to indicate that search results are available
				setShowSearchResults(true);
			} else {
				// If the response status is not OK, set an error message
				setError(`Error: ${response.status} - ${response.statusText}`);
			}
		} catch (error) {
			// If an error occurs during the fetch or parsing, set an error message
			setError(`Error during search: ${error.message}`);
		} finally {
			// Set loading to false, indicating that the search operation is complete
			setLoading(false);
			setInputValue("");
		}

	};

	// Function to handle input change in search bar
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	// Function to handle search button click
	const handleButtonClick = () => {
		setSearchQuery(inputValue);
		handleSearch();
	};

	// Function to add a TV show to favorites
	const addToFavorite = async (show) => {
		try {
			// Check if the show is already in the favorite list
			const isAlreadyInFavorite = favorite.some((fav) => fav.id === show.id);

			// If the show is already in the favorite list, do nothing
			if (isAlreadyInFavorite) {
				// Alert commented out for now
				alert("Show is already in favorite.");
				return;
			}

			// Fetch details of the TV show using its ID
			const response = await fetch(`${apiUrl}/tv/${show.id}?language=en-US`, {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${bearerToken}`,
				},
			});

			// If the fetch is successful (status code 200)
			if (response.ok) {
				// Alert commented out for now
				alert("Show was added to favorite.");

				// Parse the response JSON
				const data = await response.json();

				// Extract relevant information from the response
				const nextEpisode = data.next_episode_to_air;
				const showLocation = data.networks[0];
				const homepage = data.homepage;

				// Update the favorite list in state
				setFavorite((prevFavorite) => {
					// Create a new array with the existing favorites and the new show
					const updatedFavorite = [
						...prevFavorite,
						{ ...show, nextEpisode, showLocation, homepage },
					];

					// Store the updated favorite list in localStorage
					localStorage.setItem("favorite", JSON.stringify(updatedFavorite));

					// Return the updated favorite list to set the state
					return updatedFavorite;
				});
			} else {
				// If the fetch is unsuccessful, set an error
				setError(
					`Error fetching next episode details: ${response.status} - ${response.statusText}`
				);
			}
		} catch (error) {
			// If an error occurs during the process, set an error
			setError(`Error adding to favorite: ${error.message}`);
		}
	};

	// Function to remove a TV show from favorites
	const removeFavorite = (showId) => {
		// Update the 'favorite' state by filtering out the show with the specified 'showId'
		setFavorite((prevFavorite) => {
			// Use the filter method to create a new array excluding the show with the given 'showId'
			const updatedFavorite = prevFavorite.filter((fav) => fav.id !== showId);

			// Update the local storage with the updated list of favorite shows
			localStorage.setItem("favorite", JSON.stringify(updatedFavorite));

			// Return the updated favorite array to update the state
			return updatedFavorite;
		});
	};

	// Function to format the countdown to the next episode's air date
	const formatCountdown = (air_date, origin_country) => {
		try {
			// Check if the air date is not available
			if (!air_date) {
				return "Air date for upcoming episode unconfirmed.\nCheck on";
			}

			// Find the timezone for the origin country and store in timeZoneEntry
			const timeZoneEntry = timeZoneData.find(
				(entry) => entry.iso_3166_1 === origin_country
			);

			// If timezone entry is not found, return an error message
			if (!timeZoneEntry) {
				return "Error: Unable to find timezone for country code";
			}

			// Extract the timezone from the timezone entry
			const timeZone = timeZoneEntry.ianaTimeZone;

			// Get the current date and time in the target timezone
			const currentDate = DateTime.local().setZone(timeZone);
			const nextAiredDate = DateTime.fromISO(air_date).setZone(timeZone);

			// Check if the air date is in the past
			if (nextAiredDate < currentDate) {
				return "Latest episode available now\n on";
			}

			// Calculate the time difference between the current date and the next aired date
			const timeDifference = nextAiredDate
				.diff(currentDate, ["days", "hours", "minutes"])
				.toObject();

			// Extract days, hours, and minutes from the time difference
			const days = Math.floor(timeDifference.days);
			const hours = Math.floor(timeDifference.hours);
			const minutes = Math.floor(timeDifference.minutes);

			// Return a formatted string indicating the time until the next episode
			return `Origin air day in: ${days}d ${hours}h ${minutes}m \n on`;
		} catch (error) {
			// Log an error message if there's an exception
			console.error("Error in formatCountdown:", error);
			return "Error calculating countdown";
		}
	};

	// Use effect to load favorite shows from local storage on component mount
	useEffect(() => {
		const storedFavorite = localStorage.getItem("favorite");
		if (storedFavorite) {
			setFavorite(JSON.parse(storedFavorite));
		}
	}, []);

	// Provide the state and functions to the components through the context
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

// Custom hook to use the AppContext within components
const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within a AppProvider");
	}
	return context;
};

// Export the AppProvider and useAppContext for usage in other components
export { AppProvider, useAppContext };

/*

1. **`AppProvider` Component:**
   - This is a functional component named `AppProvider` that serves as the provider for the application-wide context using the `React.createContext` API.

2. **`children` Prop:**
   - The component takes a `children` prop, which is a special prop in React used to pass the component's children elements. This allows the `AppProvider` to wrap its children with the context it provides.

3. **State Variables:**
   - `searchQuery`: Holds the current search query entered by the user.
   - `setSearchQuery`: A function to update the `searchQuery` state.
   - `searchResults`: Stores the results of the TV show search.
   - `setSearchResults`: A function to update the `searchResults` state.
   - `loading`: Indicates whether the application is currently in a loading state.
   - `setLoading`: A function to update the `loading` state.
   - `error`: Stores any error that occurs during API requests or other operations.
   - `setError`: A function to update the `error` state.
   - `favorite`: Stores an array of favorite TV shows.
   - `setFavorite`: A function to update the `favorite` state.
   - `showSearchResults`: Indicates whether to display the search results.
   - `setShowSearchResults`: A function to update the `showSearchResults` state.
   - `inputValue`: Holds the current value of the input in the search bar.
   - `setInputValue`: A function to update the `inputValue` state.

These state variables collectively manage the application's state, including user input, search results, loading status, errors, favorite shows, and the visibility of search results.

4. **useState:**
   - The `useState` hook is used to initialize and manage the state variables in a functional component. It returns an array with two elements: the current state value and a function to update that value.

5. **Initial State:**
   - All the state variables are initialized with default values or empty arrays.

This `AppProvider` component will wrap the main part of your application, making the defined context and its associated state and functions available to all the components nested within it. This way, any component that needs access to the shared state and functionality can use the `useAppContext` hook to consume the provided context.


Explanation: handleSearch

1. `setLoading(true)`: This sets the `loading` state to `true`, indicating that a search operation is in progress. This is often used to display a loading spinner or any other UI element to indicate to the user that something is happening in the background.

2. `setError(null)`: Clears any previous error messages, ensuring that the error state is initially set to `null`.

3. `await fetch(...)`: This performs a GET request to the themoviedb API to search for TV shows based on the `inputValue` (the user's search query). The `encodeURIComponent` function is used to ensure that special characters in the query are properly encoded.

4. `if (response.ok) { ... } else { ... }`: Checks if the response status is OK (status code 200). If it is, it means the request was successful, and the code inside the `if` block is executed. Otherwise, the code inside the `else` block is executed to handle errors.

5. `const data = await response.json()`: Parses the response body as JSON. The data variable now contains the information about the TV shows returned from the search.

6. `setSearchResults(data)`: Updates the state with the search results, making them available to other components that use this context.

7. `setShowSearchResults(true)`: Sets the `showSearchResults` state to `true`, indicating that there are search results available. This might be used to conditionally render components based on whether search results are present.

8. `setError(`Error: ${response.status} - ${response.statusText}`)`: If the response status is not OK, sets an error message with information about the error status and status text.

9. `setError(`Error during search: ${error.message}`)`: If an error occurs during the fetch or parsing, sets an error message with details about the error.

10. `setLoading(false)`: Finally, sets `loading` to `false` to indicate that the search operation is complete. This is done in the `finally` block to ensure it happens whether the operation was successful or encountered an error.

In summary, `handleSearch` is a function responsible for initiating a search for TV shows based on user input. It handles loading states, fetches data from the API, and updates the state accordingly based on the success or failure of the operation.


Explanation: addToFavorite

1. **Check for Existing Favorite**: It checks if the TV show is already in the favorite list by comparing the `id` of the show with the `id` of shows in the current favorite list.

2. **Handle Existing Favorite**: If the show is already in the favorite list, it skips the addition process. You can see a commented-out `alert` for demonstration purposes.

3. **Fetch Show Details**: It makes a `GET` request to the TV show API endpoint using the show's ID. This fetches additional details about the TV show, including the next episode, show location, and homepage.

4. **Update Favorite List**: If the fetch is successful, it updates the `favorite` state by creating a new array (`updatedFavorite`) that includes the existing favorites (`prevFavorite`) and the new show with additional details.

5. **LocalStorage**: It stores the updated favorite list in `localStorage` so that the favorites persist even if the user reloads the page or revisits the site.

6. **Error Handling**: If there's an error during the process (e.g., network issues, API errors), it sets an error in the state (`setError`).

This function essentially handles the logic for adding a TV show to the user's favorite list, making API requests to get additional details, and updating the state and `localStorage` accordingly.


Explanation: removeFavorite

1. **Arrow Function:**
   - The `removeFavorite` function is an arrow function.

2. **Function Parameter:**
   - It takes a single parameter `showId`, which represents the unique identifier of the TV show to be removed from the favorites.

3. **Updating State with `setFavorite`:**
   - `setFavorite` is a function provided by React to update the state variable `favorite`.
   - It takes a function as an argument, which receives the previous state (`prevFavorite`) and returns the new state.
   - This pattern ensures that state updates are based on the previous state, preventing potential issues with asynchronous updates.

4. **Filtering Out the Show:**
   - Inside the function passed to `setFavorite`, the `filter` method is used on the previous favorite array (`prevFavorite`).
   - It creates a new array (`updatedFavorite`) by excluding the TV show with the specified `showId`.

5. **Updating Local Storage:**
   - The `localStorage.setItem` method is then used to update the local storage with the serialized JSON representation of the updated favorite array (`updatedFavorite`).
   - Local storage allows the application to persist the list of favorite shows even if the user refreshes the page or closes the browser.

6. **Returning Updated Favorite Array:**
   - The updated favorite array (`updatedFavorite`) is then returned from the function.
   - This returned array becomes the new state for the `favorite` variable.

In summary, the `removeFavorite` function is responsible for removing a TV show from the list of favorites. It does so by updating both the React state (`favorite`) and the local storage with the modified list of favorite shows. This ensures that the application remains consistent and provides a seamless user experience when managing favorite shows.



Explanation: formatCountdown

1. **Check for Missing Air Date:**
   - The function begins by checking if the `air_date` is not available. If it's missing, it returns a message indicating that the air date for the upcoming episode is unconfirmed.

2. **Find Timezone:**
   - It then attempts to find the timezone for the specified `origin_country` by searching for a matching entry in the `timeZoneData` array.

3. **Handle Missing Timezone:**
   - If no matching entry is found, it returns an error message indicating that it's unable to find the timezone for the country code.

4. **Set Timezone and Get Current Date:**
   - If a timezone is found, it extracts the timezone and proceeds to get the current date and time in that timezone.

5. **Check for Past Air Date:**
   - It checks if the next aired date is in the past. If it is, it returns a message indicating that the latest episode is available now.

6. **Calculate Time Difference:**
   - If the air date is in the future, it calculates the time difference between the current date and the next aired date in terms of days, hours, and minutes.

7. **Format and Return Countdown Message:**
   - It then formats and constructs a string indicating the countdown to the next episode, incorporating the calculated days, hours, and minutes.

8. **Handle Errors:**
   - The entire function is wrapped in a try-catch block to handle any potential errors during the execution. If an error occurs, it logs the error and returns a generic error message.

This function essentially takes the air date and origin country of a TV show, calculates the time remaining until the next episode, and returns a formatted message describing the countdown or any issues encountered during the process.

*/
