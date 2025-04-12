# Powerlifting Percentage Calculator

A simple and user-friendly web application designed for powerlifters to calculate training weights based on percentages of a given value (e.g., one-rep max). The app dynamically calculates and displays the weight breakdown for each side of the barbell, helping users load the barbell efficiently.

## Features

- **Input Field:** Enter your max weight or target weight.
- **Tabs for Different Lifts:** Separate tabs for Deadlift, Bench Press, and Back Squat, each with its own input and calculations.
- **Percentage Cards:** Displays percentages from 95% to 40% in 5% increments, showing:
  - The percentage value (e.g., "95%").
  - The total weight for the percentage.
  - A visual breakdown of how to load the barbell.
- **Responsive Design:** Works seamlessly on both desktop and mobile devices.

## Usage

```bash
$ npm install # or pnpm install or yarn install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles the application in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [Vite documentation](https://vite.dev/guide/static-deploy.html).

## Future Enhancements

- Add a dropdown to switch between pounds (lbs) and kilograms (kg).
- Allow users to customize the barbell weight (default: 45 lbs).
- Add a feature to save or share the results.
