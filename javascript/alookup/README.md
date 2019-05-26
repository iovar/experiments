
## Overview

This Project was bootstraped with create-react app. To get started with it, 
run:

    npm install
    npm start

Then open your browser at http://localhost:3000.

To get a quick overview, you can also visit https://iovar.github.io/alookup, 
where it is already deployed.

### Tech Stack

1. React
2. Redux, for state management
3. Redux-saga, for side-effects
4. React-router
5. Jest and Enzyme for testing.

### Additional features

**Cache** is implemented using redux-persist.

Simplified **deployment** to github pages is handled by the gh-pages package.

**Maps** of the venue locations are displayed through the Google Static Map API.

Quering the BandsInTown API is **debounced** and runs only after the user has 
stopped typing for at least 500ms.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run deploy`

Deploys to https://iovar.github.io/alookup, if user has correct permissions.

