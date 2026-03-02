# 💌 Project: Interactive Web-Based Wedding Invitation

This document outlines the technical requirements and implementation steps for building a premium, animated, and data-driven wedding invitation.

## 🛠 1. Tech Stack Requirements
* **Structure:** HTML5 (Semantic tags for SEO and Accessibility)
* **Styling:** Tailwind CSS (via CDN or CLI) for rapid, responsive UI design.
* **Animations:** * **Animate.css** or **GSAP** (Recommended for smooth scroll-triggered reveals).
    * **LottieFiles** (For lightweight, high-quality vector animations).
* **Interactivity:** jQuery (For easy DOM manipulation and event handling).
* **Local Storage/Database:** **Dexie.js** (To store guest RSVP data locally or cache user preferences).

## 🎨 2. Design & Visual Requirements
* **Theme:** Elegant Minimalism (Soft pastels, gold accents, and whitespace).
* **Typography:** Pair a sophisticated Serif (e.g., Playfair Display) with a clean Sans-Serif (e.g., Montserrat).
* **Responsiveness:** Must be "Mobile-First" since 90% of guests will open this on a phone.

## ⚙️ 3. Functional Sections (Technical Roadmap)

### A. The Hero Section (The "Hook")
- **Visuals:** Full-screen background image or a slow-zoom (Ken Burns effect).
- **Animation:** Use a Fade-In Up effect for the couple's names and the date.
- **Interactive Element:** A "Scroll to Open" animated icon.

### B. The Story Section (Timeline)
- **Concept:** A vertical timeline showing the couple's journey.
- **Tech:** Use Intersection Observer API (or jQuery Waypoints) to trigger animations as the user scrolls.

### C. Event Details & Map
- **Content:** Ceremony and Reception details.
- **Integration:** Google Maps API or a styled static map with a "Get Directions" button.
- **Animation:** Hover effects on buttons using Tailwind transitions.

### D. RSVP System (Powered by Dexie.js)
- **Form:** Name, Attendance Status, Food Preferences, and Song Request.
- **Logic:** 1.  On form submit, use **Dexie.js** to save the entry into an `IndexedDB` table called `rsvps`.
    2.  Show a "Success" Lottie animation upon saving.
    3.  *Note:* For real-world use, you would later sync this Dexie data to a backend like Firebase or a Google Sheet.

### E. Music Toggle
- **Feature:** A floating action button (FAB) to play/pause a romantic background track.
- **Tech:** HTML5 `<audio>` tag controlled via jQuery.

## 🚀 4. Step-by-Step Implementation Instructions

1.  **Initialize Layout:** Create `index.html` and link Tailwind CSS and Dexie.js.
2.  **Define Database:**
    ```javascript
    const db = new Dexie("WeddingDB");
    db.version(1).stores({ rsvps: '++id, name, status, food' });
    ```
3.  **Build Sections:** Code each section using Tailwind utility classes for layout (`flex`, `grid`, `padding`).
4.  **Add Magic (JS):** - Use `$(document).ready()` to initialize animations.
    - Implement a "Counting Down" timer to the big day.
5.  **Optimize:** Compress all images and ensure the JS bundle is lightweight for fast loading on mobile data.

## ⚠️ 5. Critical Notes
- **Browser Compatibility:** Ensure the CSS backdrop filters work on Safari (iOS).
- **Privacy:** Since this is web-based, avoid putting sensitive private phone numbers directly in the code.