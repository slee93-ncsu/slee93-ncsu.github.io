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
| Profile photo / CV PDF                 | `assets/profile.jpg`, `assets/CV_SeungminLee.pdf`  |
| Theme colors                           | `:root` variables at the top of `styles.css`       |

Each publication entry has a `type` of `journal` or `conference`, which drives the filter buttons. Wrap your own name in `<strong><u>…</u></strong>` in `authors`; entries whose author list starts with it get the "First Author" filter.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

The page loads JSON with `fetch`, so open it through a local server rather than as a `file://` URL.
