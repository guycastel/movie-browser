# Movie Browser App

A React-based movie browsing application that allows users to discover movies from any year using The Movie Database (TMDB) API.

## Features

- **Birth Year Selection**: Dropdown with years from 1900 to current year
- **Movie Discovery**: Fetches movies from TMDB API based on selected year
- **Responsive Grid Layout**: 
  - 4 movies per row on large screens
  - 3 movies per row on medium screens
  - 2 movies per row on small screens
  - 1 movie per row on mobile
- **Pagination**: Browse through multiple pages of results
- **Movie Information**: Each movie shows poster, title, and release year
- **Lazy Loading**: Movie posters load asynchronously with loading skeletons
- **Error Handling**: Graceful error handling for API failures

## Setup Instructions

### 1. Get TMDB API Key

1. Create an account at [The Movie Database](https://www.themoviedb.org/)
2. Go to Settings > API in your account
3. Create a new API key (v3 auth)
4. Copy your API key

### 2. Configure Environment

1. Copy `.env.example` to `.env.local` in your project root:
   ```bash
   cp .env.example .env.local
   ```
2. Edit `.env.local` and replace `your_api_key_here` with your actual TMDB API key:

```bash
VITE_TMDB_API_KEY=your_actual_api_key_here
```

### 3. Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Usage

1. **Select Birth Year**: Choose your birth year from the dropdown
2. **Click "Go!"**: The button is enabled only when a year is selected
3. **Browse Movies**: View movies in a responsive grid layout
4. **Navigate Pages**: Use Previous/Next buttons to browse through results
5. **View Details**: Each movie shows poster, title, and release year

## Technology Stack

- **React 18** with TypeScript
- **Vite** for development and building
- **Chakra UI v3** for components and styling
- **Axios** for API requests
- **React Icons** for UI icons
- **TMDB API** for movie data

## API Integration

The app uses TMDB's `/discover/movie` endpoint with the following parameters:
- `primary_release_year`: Selected birth year
- `sort_by`: popularity.desc
- `page`: Current page number

Movies are displayed 12 per page (3 rows × 4 columns on large screens).

## Responsive Design

The grid layout automatically adjusts based on screen size:
- **Large (lg)**: 4 columns
- **Medium (md)**: 3 columns  
- **Small (sm)**: 2 columns
- **Mobile (base)**: 1 column

## Error Handling

- Network errors are caught and displayed to the user
- Missing movie posters show a placeholder
- Loading states are shown during API calls
- Graceful fallbacks for missing data
