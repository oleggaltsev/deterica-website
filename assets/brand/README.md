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

On 2026-09-02 the tab icon stopped being the letter D. It is now a photograph:
the studio render of the hand, the same model that the `assets/hand-*.jpg` files
show. The four `favicon*`/`apple-touch-icon*` files of the D mark stay in this
folder, unreferenced, so the change is one edit to undo.

| File | Where | Size |
|---|---|---|
| `svg/wordmark-light.svg` | The header and the footer of every page | 20px tall in the header, 18px in the footer |
| `hand-favicon-32.png` | The tab icon | 32 x 32 |
| `hand-favicon-16.png` | The tab icon, at the smaller size | 16 x 16 |
| `hand-favicon-192.png` | The icon of a page saved to an Android home screen | 192 x 192 |
| `hand-apple-touch-icon.png` | The icon of a page saved to an iOS home screen | 180 x 180 |
| `hand-icon-512.png` | Nothing. The master the others come from | 512 x 512 |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `mark.svg` | **No longer referenced.** The D mark, kept for the record | 32 and 180 |

### The icons

Four PNG files, and no SVG. The head of every page carries the 32, the 16 and
the 192, each with its `sizes`, then the apple icon. The SVG line is gone: it
pointed at the D mark, and a browser that reads SVG would have kept showing the
letter.

`hand-icon-512.png` is the master. The 16 came out of it with
`sips -z 16 16`; the 32, the 192 and the 180 were supplied at their own sizes
and are not downscales made here.

The corners are rounded in the image itself, and the four corners are
transparent. That is what makes the icon read on a dark tab bar as well as a
light one: a square photograph would sit in the tab as a pale block.

⚠️ **`hand-apple-touch-icon.png` is rounded too, and iOS rounds it again.** The
system masks a home-screen icon with its own superellipse and fills any
transparency with black, so the corners can carry a thin dark edge. Apple asks
for a square, opaque image at this one size. The square version is in the
history of this file, at the commit before the rounded set: recover it with
`git show <commit>:assets/brand/hand-apple-touch-icon.png`. This was chosen
knowing that.

⚠️ **A photograph does not hold up at 16px.** The render carries the finger
segments, the knuckle shine and the wrist seam, and at 16 they blur into one
warm patch. The mark is still legible as a pale shape on a pale ground, but it
does not read as a hand. This was chosen with that known.

The same render, at 1024, is the icon of the iOS app, in
`myotriton-simulator/ios/App/Resources/Assets.xcassets/AppIcon.appiconset/icon-1024.png`.

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
