// main.jsx

// import components and dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the root component with BrowserRouter
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

/* 
1. **`ReactDOM.createRoot(document.getElementById("root")):`**
   - `createRoot` is a method introduced in React 18 for working with the upcoming concurrent mode.
   - It creates a root instance that is used to render React components.
   - `document.getElementById("root")` specifies the root DOM element where the React app will be mounted.

2. **`<BrowserRouter>`:**
   - Provided by `react-router-dom`, it enables routing in the application by wrapping the main `App` component.
   - It utilizes the HTML5 history API to keep UI in sync with the URL.

3. **`<App />:`**
   - The main component of the application that contains the structure and routing logic.

4. **`root.render(...):`**
   - It renders the `App` component within the context of `BrowserRouter`.
   - The rendering is done using the `createRoot` API, which is part of the concurrent mode improvements in React 18.

5. **`import "./index.css";`:**
   - Imports a CSS file (`index.css`) to apply styling to the application.

This file sets up the main structure of the React application, initializes the root using `createRoot`, 
and renders the `App` component within a `BrowserRouter` for navigation. 
The `index.css` file likely contains styles that will be applied globally to the entire application.*/
