# Show Tracker App

This is a React-based web application for tracking your favorite TV shows. The app allows you to search for shows, view today's airing shows, and manage your favorite shows. It uses the [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api) to fetch TV show data.

The main purpose of this app is to provide a centralized platform for users to track the release of the next episode of their favourite shows. In the "Favourite" section, the app displays a countdown to the release of the next episode for each show, helping users stay informed about upcoming episodes.

## Getting Started

Follow these steps to set up and run the Show Tracker app locally:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/show-tracker-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd show-tracker-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   ```bash
   npm install react-router-dom@6
   ```

   ```bash
   npm install luxon
   ```

### API Key

To access the TMDb API, you need to obtain an API key. You can get one by [creating an account on TMDb](https://www.themoviedb.org/signup) and generating an API key [here](https://www.themoviedb.org/settings/api). Replace the `bearerToken` variable in `AppContext.js` with your API key.

### Run the App

Run the following command to start the development server:

```bash
npm run dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- **App.js**: Main component rendering the application routes using React Router.
- **AppContext.js**: Context provider for managing state related to show tracking, searching, and favorites.
- **HomeWrapper.js**: Wrapper component using the `ShowTrackerProvider` to provide context to the entire application.
- **Live.js**: Component displaying today's airing shows fetched from the TMDb API.
- **SearchResults.js**: Component displaying search results and allowing users to add shows to favorites.
- **Favourite.js**: Component displaying user's favorite shows.
- **UserInput.js**: Component for user input, allowing users to search for TV shows.
- **NavBar.js**: Navigation bar component with links to the live shows and favorites pages.
- **timeZoneData.js**: Data file containing timezone information for different countries.

## Usage

- Navigate to the "Live" page to see today's airing TV shows.
- Use the search bar to search for your favorite TV shows.
- Add shows to your favorites list.
- View and manage your favorite shows on the "Favorites" page.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
