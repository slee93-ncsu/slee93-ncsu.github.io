# Seungmin Lee — Academic Homepage

Source for <https://slee93-ncsu.github.io/>.

This is a static site (no build step) based on the
[academic-homepage-modernism](https://github.com/dl-m9/academic-homepage-modernism) template (MIT License, see `LICENSE`).

## Updating content

| What                                   | Where                                              |
| -------------------------------------- | -------------------------------------------------- |
| Name, affiliation, email/CV links      | `data/profile-info.json`                           |
| Publications                           | `data/publications.json`                           |
| Biography, research, projects, experience, education, honors | `index.html` (one `<section>` each) |
| CV PDF                                 | `assets/CV_SeungminLee.pdf`                        |
| Theme colors                           | `:root` variables at the top of `styles.css`       |
| Ongoing research page                  | `research/index.html` (served at `/research/`)     |

Each publication entry has a `type` of `journal` or `conference`, which drives the filter buttons. Wrap your own name in `<strong><u>…</u></strong>` in `authors`; entries whose author list starts with it get the "First Author" filter.

## Pages in subfolders

A page in a subfolder (like `research/index.html`) reuses the shared `styles.css`, `script.js` and `data/` files. Set `<body data-root="../">` so those paths resolve from the subfolder. To list publications on such a page, add `<div class="related-publications publications-list" data-pubs="P5,C13"></div>`; the numbers refer to entries in `data/publications.json`.

## Adding a profile photo

1. Save the photo as `assets/profile.jpg` (a portrait around 600×800 px works well).
2. In `index.html`, add this right after the `<div class="profile-info">…</div>` block inside `.header-content`:

   ```html
   <div class="profile-image">
       <img src="assets/profile.jpg" id="profile-img" alt="Seungmin Lee">
   </div>
   ```

3. In `data/profile-info.json`, add `"profileImage": "assets/profile.jpg"`.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

The page loads JSON with `fetch`, so open it through a local server rather than as a `file://` URL.
