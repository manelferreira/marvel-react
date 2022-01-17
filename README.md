# Getting Started

This project was developed using the latest node lts version (at this moment), which is v16.13.2.

To install the dependencies just run npm install on your terminal.

This project uses:
- Material UI (so it was easier to build the UI)
- React Router to control the page navigation in the SPA
- React Redux to control the shopping cart state globally in the SPA
- Axios to make HTTP requests (they are encapsulated by the code that is inside the integrations folder)
- JSON-Server to create a fake coupon api

To run the application completely, you must open 2 terminals at once. This is so because we need to start the app itself in one of them, and the coupons api on another. Check the available scripts section below so you can see how to do that.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run coupon-api`

Runs an coupon api locally on the port 4000.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
