// Home.jsx

// import components and dependencies
import React from "react";
import { AppProvider } from "../components/appContext";
import UserInput from "../components/userInput";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar";

const Home = () => {
	// Styles for header, main, and footer sections
	const headerStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "15vh",
		background: "#333",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		zIndex: "99",
	};

	const footerStyle = {
		position: "fixed",
		bottom: 0,
		left: 0,
		width: "100%",
		height: "10vh",
		background: "#333",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		zIndex: "99",
	};

	const mainStyle = {
		position: "fixed",
		top: "15vh",
		bottom: "10vh",
		left: 0,
		width: "100%",
		maxHeight: "75vh", // Set a max height for the main container
	};

	return (
		<>
			<header style={headerStyle}>
				{/* Header section with NavBar and UserInput components */}

				<NavBar />
				<UserInput />
			</header>

			<main style={mainStyle}>
				{/* Main section with React Router Outlet for rendering nested components */}

				<Outlet />
			</main>

			<footer style={footerStyle}>
				{/* Footer section (currently empty) */}

				{/* <Footer /> */}
			</footer>
		</>
	);
};

// Wraps the Home component with AppProvider for global state management
const HomeWrapper = () => {
	return (
		<AppProvider>
			<Home />
		</AppProvider>
	);
};

export default HomeWrapper;

/*
1. **`import React from "react";`:**
   - Imports the `React` library, which is required for creating React components.

2. **`import { AppProvider } from "../components/appContext";`:**
   - Imports the `AppProvider` component from the "../components/appContext" file. 
   This suggests that the `Home` component is using some global state managed by the `AppProvider`.

3. **`import UserInput from "../components/userInput";`:**
   - Imports the `UserInput` component from the "../components/userInput" file.

4. **`import { Outlet } from "react-router-dom";`:**
   - Imports the `Outlet` component from `react-router-dom`. This component is used to render the nested child routes within the parent route.

5. **`import NavBar from "../components/navBar";`:**
   - Imports the `NavBar` component from the "../components/navBar" file.

6. **`const Home = () => {...}`:**
   - Defines the `Home` functional component, representing the main content of the home page.

7. **`const headerStyle = {...}; const footerStyle = {...}; const mainStyle = {...};`:**
   - Defines inline styles for the header, footer, and main sections.

8. **`return (<>...</>);`:**
   - Renders the component using a fragment (`<>...</>`) to group multiple elements without introducing an additional parent node.

9. **`<header style={headerStyle}>...</header>`:**
   - Contains the header section, which includes the `NavBar` and `UserInput` components.

10. **`<main style={mainStyle}>...</main>`:**
    - Contains the main section, which renders the nested components using the `Outlet` component from React Router.

11. **`<footer style={footerStyle}>...</footer>`:**
    - Contains the footer section, which is currently empty but can be extended by adding a `Footer` component or additional content.

12. **`const HomeWrapper = () => {...};`:**
    - Defines the `HomeWrapper` functional component, which wraps the `Home` component with the `AppProvider`. 
	This ensures that the `Home` component has access to global state managed by the context provided by `AppProvider`.

13. **`<AppProvider>...</AppProvider>`:**
    - Wraps the `Home` component with the `AppProvider` to provide global state management.

14. **`export default HomeWrapper;`:**
    - Exports the `HomeWrapper` component as the default export of this module.

In summary, `HomeWrapper.jsx` sets up the structure of the home page, including the header, main content with nested routes, and footer. 
It also wraps the `Home` component with the `AppProvider` to provide global state management to its child components.*/
