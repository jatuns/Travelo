# Travelo ✈️

A travel agency website built with HTML, CSS, and JavaScript using the Materialize CSS framework. The site showcases tour packages, a photo gallery, a travel blog, a booking form, and an interactive packing mini-game.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero section and popular destination cards |
| Tour Packages | `packages.html` | Tabbed layout with packages by region |
| Book Now | `reservation.html` | Multi-step reservation form with price summary |
| Gallery | `gallery.html` | Filterable photo gallery with lightbox |
| Blog | `blog.html` | Travel articles with a live comment system |
| Packing Game | `game.html` | Drag-and-drop suitcase packing mini-game |

---

## Project Structure

```
travelo/
├── index.html
├── packages.html
├── reservation.html
├── gallery.html
├── blog.html
├── game.html
├── css/
│   └── style.css
├── scripts/
│   ├── main.js
│   ├── reservation.js
│   ├── gallery.js
│   ├── blog.js
│   └── game.js
└── images/
    ├── hero-bg.jpg
    ├── blog-bg.jpg
    ├── gallery-bg.jpg
    ├── package-bg.jpg
    ├── reservation-bg.jpg
    ├── placeholder1-3.jpg
    ├── blog1-2.jpg
    ├── gallery1-9.jpg
    ├── europe1-3.jpg
    ├── asia1-2.jpg
    ├── america1.jpg
    ├── africa1.jpg
    └── game/
        └── game-bg.jpg
```

---

## Features

### Tour Packages
- Tabbed interface with four regions: Europe, Asia, America, Africa
- Each card shows duration, price, inclusions, and a Book Now link

### Reservation Form
- Selectable tour package with dynamic pricing
- Datepicker for departure date
- Optional travel insurance add-on (+$99/person)
- Booking summary preview before confirmation
- Terms & Conditions modal

### Photo Gallery
- Filter buttons by continent (Europe, Asia, America, Africa)
- Lightbox viewer with fade and wrap-around navigation
- Hover captions and staggered fade-in on scroll

### Blog
- Two articles with author, date, and location metadata
- Live comment system — comments are prepended to the list on submit
- Basic blog post search by title and content

### Packing Mini-Game
- Choose a destination: Beach, Mountain, City, or Safari
- 60-second countdown timer
- Drag items from the available list into the suitcase
- Scoring: +20 for essential items, +10 for optional, −10 for unnecessary
- Penalty for removing already-packed items
- Time bonus added to final score
- End-of-game modal with score breakdown and missed essentials

---

## Dependencies

All dependencies are loaded via CDN — no build step required.

| Library | Version | Used In |
|---------|---------|---------|
| [Materialize CSS](https://materializecss.com/) | 1.0.0 | All pages |
| [jQuery](https://jquery.com/) | 3.6.0 | All pages |
| [jQuery UI](https://jqueryui.com/) | 1.13.2 | `game.html` (drag & drop) |
| [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/) | 2.11.3 | `gallery.html` |
| [Font Awesome](https://fontawesome.com/) | 6.4.0 | `game.html` (item icons) |
| [Google Material Icons](https://fonts.google.com/icons) | — | All pages |

---

## Getting Started

Since this is a static site with no backend, you can run it directly in a browser.

**Option 1 — Open directly:**
```
Open index.html in any modern browser.
```

**Option 2 — Local server (recommended to avoid CORS issues with images):**
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```
Then visit `http://localhost:8000`.

---

## Notes

- Images are not included in the repository. Add your own to the `images/` folder following the naming conventions in the structure above.
- Comments submitted on the blog are not persisted — they exist only for the current session.
- The reservation form does not connect to a backend; the confirmation modal is simulated.
