# Professional Calculator

A modern, professional calculator built with React and Tailwind CSS featuring advanced mathematical functions, calculation history, and a beautiful user interface.

## Features

### 🧮 Core Calculator Functions
- Basic arithmetic operations (+, -, ×, ÷)
- Percentage calculations
- Square and square root functions
- Mathematical constants (π)
- Negative/positive toggle
- Memory functions (MS, MR, M+, M-, MC)

### 📚 History Management
- Automatic calculation history
- Persistent storage using localStorage
- Copy results to clipboard
- Reuse previous calculations
- Clear history functionality

### 🎨 Modern UI/UX
- Glass morphism design
- Responsive layout
- Smooth animations and transitions
- Dark theme with gradient backgrounds
- Professional button interactions

### ⌨️ Keyboard Support
- Number keys (0-9)
- Operators (+, -, *, /)
- Enter/= for calculation
- Escape for clear all
- Backspace for delete last digit
- Decimal point (.)

### 📱 Responsive Design
- Works on desktop, tablet, and mobile
- Adaptive layout for different screen sizes
- Touch-friendly button sizes

## Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── components/
│   ├── Calculator.js      # Main calculator component
│   └── History.js         # History panel component
├── App.js                 # Main app component
├── index.js              # React entry point
└── index.css             # Global styles with Tailwind
```

## Usage

### Basic Calculations
1. Click number buttons to input values
2. Use operator buttons (+, -, ×, ÷) for calculations
3. Press = or Enter to see the result
4. Use AC to clear all or DEL to delete last digit

### Advanced Functions
- **Square (x²)**: Calculate the square of the current number
- **Square Root (√)**: Calculate the square root of the current number
- **Percentage (%)**: Convert the current number to percentage
- **Pi (π)**: Insert the mathematical constant π
- **Negate (±)**: Change the sign of the current number

### Memory Functions
- **MS**: Store current value in memory
- **MR**: Recall value from memory
- **M+**: Add current value to memory
- **M-**: Subtract current value from memory
- **MC**: Clear memory

### History Features
- Click the history icon to toggle the history panel
- View all previous calculations with timestamps
- Copy results to clipboard
- Reuse previous calculations
- Clear entire history

## Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **LocalStorage** - Persistent data storage

## Customization

### Styling
The calculator uses Tailwind CSS classes. You can customize the appearance by modifying:
- `src/index.css` - Global styles and custom components
- `tailwind.config.js` - Tailwind configuration and custom colors

### Adding New Functions
To add new mathematical functions:
1. Add the function logic in `Calculator.js`
2. Create a new button in the calculator layout
3. Update the calculation history if needed

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests! 