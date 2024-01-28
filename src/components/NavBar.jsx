//NavBar.jsx

// 1. import needed functions and dependencies
import { NavLink } from "react-router-dom";

// Styles for div and NavLink sections

const navStyle = {
	margin: "0 10px",
	textDecoration: "none", // Remove underline
	fontWeight: "bold", // Set font weight to bold
	fontSize: "20px",
	color: "white", // Set text color to black
};

const navContainerStyle = {
	margin: "1rem 0",
	display: "flex",
	alignItems: "center",
};

const NavBar = () => {
	return (
		<nav>
			<div style={navContainerStyle}>
				<NavLink to="/" style={navStyle}>
					Live
				</NavLink>
				{"  "}
				<NavLink to="favorite" style={navStyle}>
					Favorite
				</NavLink>
			</div>
		</nav>
	);
};

export default NavBar;

/*
1. **`import { NavLink } from "react-router-dom";`:**
   - Imports the `NavLink` component from the "react-router-dom" library.

2. **Styles:**
   - Defines two style objects (`navStyle` and `navContainerStyle`) for styling the navigation links and their container.

3. **`const NavBar = () => {...}`:**
   - Defines the `NavBar` functional component, representing the navigation bar of the application.

4. **`<nav>...</nav>`:**
   - Wraps the navigation content in a `<nav>` element.

5. **`<div style={navContainerStyle}>...</div>`:**
   - Contains the content of the navigation bar. Inside the `<div>`, there are two `NavLink` components:

   - **`<NavLink to="/" style={navStyle}>Live</NavLink>`:**
     - Represents a navigation link to the "Live" page. The `to="/" ` attribute specifies the destination path.

   - **`<NavLink to="favorite" style={navStyle}>Favorite</NavLink>`:**
     - Represents a navigation link to the "Favorite" page. The `to="favorite"` attribute specifies the destination path.

   - The `{"  "}` between the two `NavLink` components adds a space for better visual separation.

6. **`export default NavBar;`:**
   - Exports the `NavBar` component as the default export of this module.

Your `NavBar.jsx` component looks good, and the use of styles adds a visually appealing touch to the navigation links. 
The styling includes setting the font weight, font size, and text color, providing a clean and readable appearance.*/
