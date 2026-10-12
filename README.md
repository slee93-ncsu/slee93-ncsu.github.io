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
| Research overview and topic pages      | `research/index.html`, `research/<topic>/index.html` |
| Research topics (menu, overview cards) | `data/research-topics.js`                          |

Each publication entry has a `type` of `journal` or `conference`, which drives the filter buttons. Wrap your own name in `<strong><u>…</u></strong>` in `authors`; entries whose author list starts with it get the "First Author" filter.

## Research pages

`/research/` is an overview with one card per topic, and each topic has its own page at `research/<topic>/`. The side menu and the overview cards are generated from `data/research-topics.js`, so to add a topic or change its title, summary, status (`completed`, `ongoing`, `planned`) or subtopics, edit that file and create `research/<topic>/index.html` by copying an existing topic page and changing `data-current` and the content.

Subtopics also have their own pages at `research/<topic>/<subtopic>/` (for example `research/outage-prediction/single-county/`). Their pages use `data-current="<topic>/<subtopic>"` and `data-root="../../../"`. The parent topic page lists them as cards, built from the `subtopics` entries; add an optional `summary` to a subtopic to show it on its card.

Pages in subfolders reuse the shared `styles.css`, `script.js` and `data/` files; `<body data-root="../../">` (or `../../../` one level deeper) tells the script where the site root is. To list publications on a page, add `<div class="related-publications publications-list" data-pubs="P5,C13"></div>`; the numbers refer to entries in `data/publications.json`.

## Browser caching

HTML pages load `styles.css`, `script.js`, and `data/research-topics.js` with a version tag (`?v=20261012a`). After editing any of those files, change the tag in every HTML page so visitors get the new file instead of a cached copy:

```bash
grep -rl '?v=' --include=*.html . | xargs sed -i 's/?v=[0-9a-z]*/?v=NEW_TAG/g'
```

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
