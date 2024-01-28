// app.jsx

// import components and dependencies
import { Routes, Route } from "react-router-dom";
import "./App.css";

// 2. import components
import HomeWrapper from "./pages/Home.jsx";
import Favorite from "./pages/Favorite.jsx";
import NotFound from "./pages/NotFound.jsx";
import Live from "./pages/Live.jsx";
import SearchResults from "./pages/SearchResults.jsx";

function App() {
   return (
      <div className="App">
         <Routes>
            {/* React Router's Routes component for defining routes */}

            <Route path="/" element={<HomeWrapper />}>
               {/* Main route for the application */}

               <Route index element={<Live />} />
               {/* Nested routes for different pages */}
               <Route path="favorite" element={<Favorite />} />
               <Route path="*" element={<NotFound />} />
               <Route path="searchResults" element={<SearchResults />} />
            </Route>
         </Routes>
      </div>
   );
}

export default App;

/*

1. **`import { Routes, Route } from "react-router-dom";`:**
   - Imports the `Routes` and `Route` components from `react-router-dom`. These are used for defining routes in the application.

2. **`import "./App.css";`:**
   - Imports a CSS file (`App.css`) that likely contains styles specific to the `App` component.

3. **`import HomeWrapper from "./pages/Home.jsx";`:**
   - Imports the `HomeWrapper` component from the "./pages/Home.jsx" file.

4. **`import Favourite from "./pages/Favourite.jsx";`:**
   - Imports the `Favourite` component from the "./pages/Favourite.jsx" file.

5. **`import NotFound from "./pages/NotFound.jsx";`:**
   - Imports the `NotFound` component from the "./pages/NotFound.jsx" file.

6. **`import Live from "./pages/Live.jsx";`:**
   - Imports the `Live` component from the "./pages/Live.jsx" file.

7. **`import SearchResults from "./pages/SearchResults.jsx";`:**
   - Imports the `SearchResults` component from the "./pages/SearchResults.jsx" file.

8. **`function App() {...}`:**
   - Defines the main `App` component, which is the entry point of the application.

9. **`<div className="App">...</div>`:**
   - Wraps the entire application with a `div` and applies the "App" class, which may have associated styles.

10. **`<Routes>...</Routes>`:**
    - Utilizes React Router's `Routes` component to define different routes in the application.

11. **`<Route path="/" element={<HomeWrapper />}>...</Route>`:**
    - Sets up the main route ("/") and specifies that it should render the `HomeWrapper` component.

12. **`<Route index element={<Live />} />`:**
    - Defines a nested route for the index page of the `HomeWrapper` component, rendering the `Live` component.

13. **`<Route path="favourite" element={<Favourite />} />`:**
    - Defines a nested route for the "favourite" page, rendering the `Favourite` component.

14. **`<Route path="*" element={<NotFound />} />`:**
    - Defines a nested route for any other path (not matched by previous routes), rendering the `NotFound` component.

15. **`<Route path="searchResults" element={<SearchResults />} />`:**
    - Defines a nested route for the "searchResults" page, rendering the `SearchResults` component.

16. **`export default App;`:**
    - Exports the `App` component as the default export of this module.

This file sets up the main structure of the React application, 
including the definition of routes using React Router. 
The `Routes` and `Route` components help in managing navigation and rendering different components based on the URL path. */
