# The brand assets

The source is `Deterica logo.zip` on Google Drive, file id
`1LaAArdLvZEezwbuIq_Z-3QywqBYmISHk`, owned by `ogaltsev@gmail.com`. The archive
went to Drive on 2024-01-12. The files inside it carry the date 2021-06-28, and
the markup shows a logo builder made them (`SvgjsDefs`, a `nameFeature` group,
and a `monogramFeature` group).

Copied here on 2026-08-23, so the pack lives with the code and not only in
Drive.

## What is here

| File | Use |
|---|---|
| `svg/logo-black.svg` | The full lockup, on a light surface |
| `svg/logo-white.svg` | The full lockup, on a dark surface |
| `svg/wordmark-light.svg` | **In use.** The word alone, on a dark surface |
| `svg/wordmark-dark.svg` | The word alone, on a light surface |
| `svg/monogram-d.svg` | The letter D alone, in `currentColor` |
| `mark.svg` | **In use.** The letter D on a rounded square. The favicon |
| `svg/logo-on-grey.svg` | The lockup with its own grey panel, `#323232` |
| `logo-black-3177.png` | 3177 x 2210, for a place that takes no SVG |
| `logo-on-grey-3177.png` | 3177 x 2210, the same lockup with the panel |
| `print/*.pdf`, `print/*.eps` | Print, black and white |

## Three faults in the original pack

1. **Two PNG files are not images.** "Color logo - no background.png" and
   "White logo - no background.png" hold six bytes each. They are not copied
   here. Export them again if a PNG on a transparent background is needed.
2. **The "colour" SVG is white.** Every fill in
   "Color logo - no background.svg" is `#ffffff`. It is the white logo under
   another name, so it is not copied here.
3. **The lockup is one piece.** A frame holds a monogram above and the word
   DETERICA below, in a box of 3176 x 2210, so the aspect is 1.44 to 1.

## What the site uses now

The site carried its own mark until 2026-08-23: a rounded square with a letter
D, drawn as inline SVG, in the header, the footer, and the favicon of every page
— 18 copies of one path. It is gone. The pack drives the identity now, from two
files, and each one is referenced and not copied.

| File | Where | Size |
|---|---|---|
| `svg/wordmark-light.svg` | The header and the footer of every page | 20px tall in the header, 18px in the footer |
| `favicon.svg` | The tab icon, in a browser that reads SVG | 32 x 32 |
| `favicon-32.png` | The tab icon, in a browser that does not | 32 x 32 |
| `apple-touch-icon.png` | The icon of a page saved to a home screen | 180 x 180 |
| `mark.svg` | Nothing yet. The same letter with a smaller glyph, kept for a place that needs a square mark | 32 x 32 |

### The icons

Three files, and the order in the `<head>` matters. The PNG comes first, the SVG
second with its `type`, and the apple icon last. A browser that reads SVG takes
the SVG; one that does not falls back to the PNG.

The glyph fills **22 of the 32 units, so 69 percent** of the box. The first
version of the mark gave it 15 units, which is 47 percent, and at 16px the
letter was too small to read. Do not go back to 47 percent.

The PNG files are not drawn by hand. Chrome rasterises `favicon.svg` at 32 and
at 180, with `--force-device-scale-factor=1`. Regenerate them whenever
`favicon.svg` changes, or the tab and the SVG stop agreeing.

**Do not use the full lockup in the header.** The header gives 20px of height.
The lockup is 1.44 to 1, so at that height it is 29 x 20 px and the word inside
it falls under 6px. The wordmark alone is 7.85 to 1, so the same height gives
157 x 20 px and it reads.

### How the two files were made

Both come out of `svg/logo-black.svg`, and a path parser measured them:

- `mark.svg` holds the **letter D**, which is the first two contours of the
  `nameFeature-0` group: the outer contour and the counter of the bowl. The
  glyph is 23.672 x 28.223, so the aspect is 0.839. It sits on a rounded square
  of `#151D28` in teal `#37C8BC`, at `scale(0.53148) translate(7.768 2.241)`,
  which gives the glyph 15 units of the 32, the size the earlier mark had.
- `svg/wordmark-light.svg` and `svg/wordmark-dark.svg` hold the **whole
  `nameFeature-0` group**, which is the word DETERICA in 11 contours. The bbox
  is 227.72 x 29.00 and the viewBox adds 0.6 of padding.

⚠️ **The `monogramFeature-0` group is not a D.** It is an angular mark of
horizontal strokes, 47.52 x 30.54, so it is wider than it is tall. Nothing uses
it. Do not mistake it for the letter.

⚠️ **A path parser must handle the `s` command.** The first one written for this
job did not, and it measured the D as 23.67 x 32.0 instead of 23.67 x 28.22. The
mark came out squeezed and off centre. The script now asserts the bbox against
the value read by hand.

## Which business does this mark belong to

`myotriton-company/07_Corporate_Cleanup_Steps.md` records that the DETERICA mark,
registration 6,941,809, is in Class 21 for bottle sleeves, that it belongs to the
retail business, and that it is **not an asset of this project**. The same file
discusses MYO TRITON as the name for the project.

This pack carries the date 2021, which is the retail period. So it is very
probably the mark of that business. Ask the founder before the prosthetics site
carries it.
