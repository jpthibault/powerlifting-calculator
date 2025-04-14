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
  - The label displays the current exercise type: "Enter your max weight for [Exercise Type] (lbs)"
- **Behavior:** 
  - When the user enters a value, the app dynamically updates the percentage table below.
  - Values are saved in localStorage and persist across sessions per exercise.

### 2. Tabs for Different Lifts
- **Description:** The app has buttons for different lifts:
  1. **Deadlift**
  2. **Bench Press** (displayed as "BenchPress" in the UI)
  3. **Back Squat** (displayed as "BackSquat" in the UI)
- **Behavior:**
  - Each tab maintains its own input value that persists across tab switches.
  - Switching between tabs will display the respective calculations for the selected lift.
  - Exercise types can be customized in the settings.

### 3. Percentage Table
- **Description:** A table displaying percentages from 100% to 40% in 5% increments (100%, 95%, 90%, ..., 40%).
- **Content of Each Row:**
  - **Percentage Value:** Displayed prominently (e.g., "95%").
  - **Weight Information:**
    - The raw calculated weight (rounded to nearest pound)
    - The total bar load (after rounding to nearest loadable weight)
  - **Barbell Plates:** A visual representation of the plates to load on one side of the barbell, showing:
    - Plates stacked visually with skewed appearance for 3D effect
    - Plate weight and count (e.g., "45 x2")
    - Color-coded borders based on user settings

### 4. Responsive Design
- The app is optimized for desktop with a minimum width of 900px.

### 5. Barbell Weight Toggle
- **Description:** A toggle button in the top-left corner of the main interface for selecting barbell weight.
- **Options:** 
  - 45 lbs (standard barbell)
  - 35 lbs (women's barbell)
- **Behavior:**
  - Selection is saved in settings and persists across sessions.
  - Changes immediately affect all weight calculations.

### 6. Settings Page
- **Description:** A modal dialog accessible via a gear icon in the top-right corner.
- **Features:**
  - Customize border colors for different weight plates.
  - Add, edit, or remove exercise types.
  - Select barbell weight (45 lbs or 35 lbs).
- **Behavior:**
  - All settings are stored in `localStorage` and persist across sessions.
  - Changes are dynamically applied to the application.
- **UI Elements:**
  - Text fields for color values.
  - Text fields for exercise types with delete buttons.
  - Toggle buttons for barbell weight.
  - Save button to confirm changes and close dialog.
  - Reset button to restore default settings.

---

## User Flow

1. **Input Weight:**  
   The user enters their max weight in the text field.
   
2. **Dynamic Calculation:**  
   The app calculates the percentages (100% to 40%) and displays the results in a table.

3. **View Results:**  
   Each row shows:
   - The percentage (e.g., "95%").
   - The calculated weight and bar load.
   - The barbell plates visualization for each side of the barbell.

4. **Change Settings:**
   The user can access settings to customize colors, exercise types, and barbell weight.

---

## Technical Requirements

### Frontend
- **Framework:** React with Vite for fast development and build.
- **Styling:** Material-UI for components and layout, with CSS for additional styling.
- **TypeScript:** For type safety and better developer experience.
- **State Management:** Context API for settings management.

### Deployment
- **Hosting:** GitHub Pages.
- **Build Process:**
  - Use `vite build` to generate production-ready files.
  - Deploy using `gh-pages` package.
  - Ensure SPA routing by renaming `index.html` to `404.html` during deployment.

---

## Acceptance Criteria

1. The app should correctly calculate percentages and display results dynamically as the user inputs a value.
2. The weight breakdown should be accurate and rounded to the nearest 0.5 lbs for calculation, with final weights that can be loaded on a barbell.
3. The app should be visually appealing with intuitive UI.
4. Input validation should prevent invalid entries (e.g., letters, negative numbers).
5. Settings should be easily accessible and changes should be immediately reflected.

---

## Future Enhancements
- Add support for metric units (kilograms).
- Implement mobile-responsive design for better experience on smaller screens.
- Add a feature to save or share the results.
- Include additional animations or visual effects for better user experience.