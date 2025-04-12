# Product Requirements Document (PRD)

## Project Name:
Powerlifting Percentage Calculator

## Objective:
To create a simple one-page web application that helps powerlifters calculate training weights based on percentages of a given value. The app will display the calculated weights in a user-friendly format, breaking down the weight distribution for each side of the barbell.

---

## Features

### 1. Input Field
- **Description:** A single text field where users can input a number (e.g., their one-rep max or target weight).
- **Validation:** 
  - Only numeric values are allowed.
  - No negative numbers.
  - Optional: Add a placeholder text like "Enter your max weight (lbs)".
- **Behavior:** 
  - When the user enters a value, the app dynamically updates the percentage cards below.

### 2. Tabs for Different Lifts
- **Description:** The app will have three tabs for different lifts:
  1. **Deadlift**
  2. **Bench Press**
  3. **Back Squat**
- **Behavior:**
  - Each tab will have its own input field and percentage cards.
  - Switching between tabs will display the respective calculations for the selected lift.

### 3. Percentage Cards
- **Description:** Cards displaying percentages from 95% to 40% in 5% increments (95%, 90%, 85%, ..., 40%).
- **Content of Each Card:**
  - **Percentage Value:** Displayed prominently (e.g., "95%").
  - **Total Weight:** The calculated weight for the percentage.
  - **Weight Breakdown:** A breakdown of how much weight to load on each side of the barbell using the formula:  
    `((total * percentage) - 45) / 2`  
    - Assume the barbell weighs 45 lbs.
    - Round the result to the nearest 0.5 lbs for practical loading.
  - **Animation:**
    - Weights slide in sequentially from their respective sides (left or right) using Material-UI's `Slide` component.
    - The animation delay is dynamically calculated to ensure sequential transitions.

### 4. Responsive Design
- The app should be mobile-friendly and work well on both desktop and mobile devices.

### 5. Settings Page
- **Description:** A dedicated page where users can modify application settings.
- **Features:**
  - Adjust animation delay (in milliseconds).
  - Change the border color for weights.
  - Select the default exercise type (Deadlift, Bench Press, or Back Squat).
- **Behavior:**
  - All settings are stored in `localStorage` and persist across sessions.
  - Changes are dynamically applied to the application.
- **UI Elements:**
  - Input fields for numeric and text values.
  - Dropdown menu for selecting exercise type.
  - Save button to confirm changes.

---

## User Flow

1. **Input Weight:**  
   The user enters their max weight in the text field.
   
2. **Dynamic Calculation:**  
   The app calculates the percentages (95% to 40%) and displays the results in cards.

3. **View Results:**  
   Each card shows:
   - The percentage (e.g., "95%").
   - The total weight (e.g., "285 lbs").
   - The weight breakdown for each side of the barbell (e.g., "120 lbs per side").
   - Animated weights sliding in from their respective sides.

---

## Technical Requirements

### Frontend
- **Framework:** React with Vite for fast development and build.
- **Styling:** Material-UI for components and animations, with Tailwind CSS for additional styling.
- **JavaScript/TypeScript:** For dynamic calculations and input validation.

### Deployment
- **Hosting:** GitHub Pages.
- **Build Process:**
  - Use `vite build` to generate production-ready files.
  - Deploy using `gh-pages` package.
  - Ensure SPA routing by renaming `index.html` to `404.html` during deployment.

---

## Acceptance Criteria

1. The app should correctly calculate percentages and display results dynamically as the user inputs a value.
2. The weight breakdown should be accurate and rounded to the nearest 0.5 lbs.
3. The app should be visually appealing and responsive on all devices.
4. Input validation should prevent invalid entries (e.g., letters, negative numbers).
5. Weights should animate sequentially from their respective sides when displayed.

---

## Future Enhancements (Optional)
- Add a dropdown to switch between pounds (lbs) and kilograms (kg).
- Allow users to customize the barbell weight (default: 45 lbs).
- Add a feature to save or share the results.
- Include additional animations or visual effects for better user experience.