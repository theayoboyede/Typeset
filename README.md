# Typeset

Pick two fonts, see them work together, copy the CSS.

Typeset is a small font pairing lab for designers and developers. Choose a headline font and a body font from Google Fonts, watch them on a live sample page, tune the type scale, then copy the CSS, an HTML link tag or a Tailwind config.

**Live demo:** https://theayoboyede.github.io/Typeset/

## Features

- **39 Google Fonts** grouped as sans serif, display, serif and monospace, each with only the weights it really offers.
- **Eight starting points.** Editorial, Modern, Classic, Friendly, Technical, Bold, Soft and Code-minded pairings.
- **Live sample page.** A nav, headline, lede, button, subheadings, pull quote and caption, in a light or dark page. Type your own headline text.
- **Type scale controls.** Base size, scale ratio (major second to perfect fifth), line height and headline letter spacing.
- **Shuffle with locks.** Press Space or Shuffle for a new pairing, and lock the headline or body font to keep it while the other changes.
- **Pairing note.** A short hint about how the two fonts relate, such as serif with sans contrast or two serifs competing.
- **Export.** Copy ready-to-use CSS (with `@import`, variables and a full scale), an HTML link tag, or a Tailwind `fontFamily` config.
- **Saved pairings.** Favourites are kept in the browser with `localStorage`.
- **Shareable links.** The pairing and settings live in the page address, so you can send a link to the exact setup.
- **Themes and layout.** Light and dark themes follow the system setting, and the layout is responsive.

## Tech stack

- HTML, CSS and vanilla JavaScript, with no frameworks, dependencies or build step.
- Google Fonts, loaded on demand for the two fonts you pick. Without internet access the page uses system fonts.
- Project files: `index.html`, `styles.css` and `script.js`.

## Run it

Clone or download the repo, keep the three files in one folder, and open `index.html` in a browser.

To host it, turn on GitHub Pages in the repo settings and deploy from the main branch.

## How it works

- A `state` object holds the fonts, weights, scale settings, theme, export format and saved pairings. Each change calls `render()` to update the interface.
- The page keeps one `<link>` element for Google Fonts. Its address is rebuilt from the chosen fonts and weights, so only the files you need are requested.
- Weights are checked against each font's real weight list before the address is built, which avoids requests Google would reject.
- The preview is styled with CSS custom properties set on the sample article, so the controls change one set of variables.
- Type sizes come from the base size multiplied by the scale ratio: the headline is four steps up, the subheadings three and two, the lede one, and the caption one step down.

## Customize

- Add a font by adding an entry to the `FONTS` array in `script.js` with its name, group and available weights.
- Add a starting point by adding an entry to the `PRESETS` array.
- Adjust the colours and fonts of the tool itself in the variables at the top of `styles.css`.

## Author

Built by Ayoboyede. [GitHub](https://github.com/theayoboyede) · [Instagram](https://instagram.com/robinswago)
