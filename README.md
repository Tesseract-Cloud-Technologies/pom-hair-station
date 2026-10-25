
## Publishing to GitHub Pages
1. Create a new GitHub repository (e.g. `pomcity-demo`).
2. Upload all files to the repository root.
3. Go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, click **Save**.
6. Visit `https://<username>.github.io/pomcity-demo/`.

## Notes
- All content is placeholder / sample data. No real bookings are processed.
- Forms are front-end only; they validate and show a success state with an optional prefilled WhatsApp link.
- The "Add to calendar" button generates a `.ics` file in JavaScript — no external service.
- Prices, durations, and stylist names are illustrative.
- The logo reads **POMCITY** in the demo; confirm with the owner whether the official mark is POM or POMCITY.
- Replace `images/` placeholders with real photos when ready.

---

### Self-check (6 lines)
1. No horizontal overflow at 320, 360, 390, 768, 1024, 1440, 1920px — `overflow-x: clip` on body plus clipped petals/lightbox containers.
2. Mobile nav uses Bootstrap collapse; sticky Book + WhatsApp bar appears only on phones (≤575.98px).
3. All internal links (`index.html`, `styles.html`, `prices.html`, `book.html`, `about.html`, `contact.html`) resolve correctly relative to root.
4. `prefers-reduced-motion` disables petal fall and heart pulse.
5. One `<h1>` per page, skip link, visible focus rings, ARIA labels on icon buttons and lightbox controls, semantic landmarks.
6. Masonry grid is two columns at 360px; chips scroll inside their own container; booking form auto-calculates price and duration; `.ics` download works; lightbox is keyboard-accessible.