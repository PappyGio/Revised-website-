# LapuGo Travel & Tours — Revised Front-End Website

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- JSON data files
- Google Fonts
- Wikimedia Commons destination photography

## Pages
- `index.html` — Homepage
- `destinations.html` — Destination discovery + search/filter
- `packages.html` — Tour package search
- `package.html?id=oslob-moalboal` — Detailed package page
- `package.html?id=three-island` — Detailed island-hopping page
- `booking.html` — Booking/inquiry form
- `services.html` — Services
- `gallery.html` — Gallery
- `blog.html` — Blog/travel tips
- `about.html` — About LapuGo
- `contact.html` — Contact + inquiry form

## Logo
The provided LapuGo logo is stored at `assets/images/lapugo-logo.png` and appears above the navigation on every page, with the tagline “Lakaw Ta, Go Beyond!”.

## Run locally
Use any static server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

Do not open the HTML files directly with `file://` because the JSON files are loaded with `fetch()`.

## Deploy to Vercel
This is a static site. Upload the folder/repository to Vercel with no build command and no output directory required. The root directory contains the HTML files.

## Important prototype note
The booking/contact forms are front-end demonstrations. They save the booking inquiry locally in the browser and display confirmation UI; they do not send email, process payments, or create real reservations.
