# Surag Homestay Website

This is the official website for Surag Homestay, featuring information about accommodations, attractions, gallery, and contact details.

## Project Structure

```
surag_homestay/
├── index.html          # Home page
├── about.html         # About page
├── attractions.html   # Local attractions
├── contact.html      # Contact information
├── gallery.html      # Photo gallery
├── faq.html         # Frequently asked questions
├── admin.html       # Admin panel
├── admin2.html      # Secondary admin panel
├── components/      # Reusable HTML components
├── assets/         # Images and other media files
├── css/           # Stylesheets
├── js/           # JavaScript files
└── styles.css    # Main stylesheet
```

## Local Development Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (recommended for proper functionality)

### Option 1: Using Python's Built-in Server

1. Open your terminal
2. Navigate to the project directory:
   ```bash
   cd path/to/surag_homestay
   ```
3. If you have Python 3 installed, run:
   ```bash
   python3 -m http.server 8000
   ```
   For Python 2, use:
   ```bash
   python -m SimpleHTTPServer 8000
   ```
4. Open your web browser and visit:
   ```
   http://localhost:8000
   ```

### Option 2: Using VS Code Live Server

1. Install Visual Studio Code
2. Install the "Live Server" extension from the VS Code marketplace
3. Open the project folder in VS Code
4. Right-click on `index.html` and select "Open with Live Server"
5. The website will automatically open in your default browser

### Option 3: Using Node.js http-server

1. Install Node.js from https://nodejs.org/
2. Install http-server globally:
   ```bash
   npm install -g http-server
   ```
3. Navigate to the project directory:
   ```bash
   cd path/to/surag_homestay
   ```
4. Run the server:
   ```bash
   http-server
   ```
5. Open your web browser and visit the URL shown in the terminal (typically http://localhost:8080)

## Making Changes

1. Edit the HTML files directly to modify content
2. Modify `styles.css` for styling changes
3. Update JavaScript files in the `js/` directory for functionality changes
4. Add new images to the `assets/` directory

## Browser Compatibility

The website is compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)

## Contributing

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes
4. Submit a pull request

## Support

For any issues or questions, please contact the development team or create an issue in the repository.
