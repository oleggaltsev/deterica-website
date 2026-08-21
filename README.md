# Deterica — the Genesis website

The public site for **Genesis**, the prosthetic hand of **DETERICA LLC**: a control method
that needs no electrodes, and the **Genesis Developer Kit** that carries that control while
the hand is built.

## The names, and which is which

| Name | What it is | Where it must match |
|---|---|---|
| **Deterica** | The company. DETERICA LLC, Texas. It owns the domain and the email | The brand word in the header and the footer |
| **Genesis** | The hand, and the programme that builds it. A project name, not a registered mark | Section headings, the hero eyebrow, the mail subject in `script.js` |
| **Genesis Developer Kit** | The desktop kit and the app together — the product that ships first | The `#kit` section |
| **MYO TRITON** | The **earlier** name of the same work. It is no longer on the page | Nowhere. The four engineering repos still carry it in their names |

The bundle identifier of the app already carries this structure:
`com.deterica.genesis.kit` — the company, the hand, then the kit.

⚠️ **One name does not match yet.** The app's display name in
`myotriton/simulator/ios/App/project.yml` is `Simulator Kit`, and the Bluetooth permission
string names it too. Change `CFBundleDisplayName` and
`NSBluetoothAlwaysUsageDescription` there before the store listing opens, or the store and
this site will disagree.

## Stack

Static HTML, CSS, and JavaScript. No build step and no dependency. The fonts load from
Google Fonts.

| File | Contents |
|---|---|
| `index.html` | The whole page. One document, with anchors |
| `styles.css` | The design system, in `:root` |
| `script.js` | The navigation highlight, the video players, mobile navigation, scroll reveals, and the contact form. It holds the Web3Forms key |
| `assets/` | The images, the video posters, the app screenshot, and the QR placeholder |

### The navigation follows the reader

Every section is in the header, and `script.js` underlines the one the reader is in. The
rule is deliberately simple: **the current section is the one that covers the line just
under the sticky header.** That is what a reader sees — the heading under the header is the
heading they are reading — and it needs no thresholds to tune.

Two details are load-bearing:

- `.nav a` carries a **transparent 2px** bottom border from the start. The active state
  only adds colour, so the text never moves.
- The handler runs on every scroll event with no `requestAnimationFrame` throttle. It reads
  nine rectangles, which costs less than the bookkeeping, and a frame-based throttle drops
  updates whenever the frame callback does not run.

Adding a section: give it an `id`, add a link in both the desktop nav and the mobile nav.
The highlight picks it up with no further change.

Type: Space Grotesk for display, Inter for body text, IBM Plex Mono for data.

The palette is warm neutrals with **one** cool accent. The teal is the only saturated
colour on the page, so it always means "action" and never decoration. Keep it that way.

**Card text is justified.** `.card p` sets `text-align: justify` with `hyphens: auto`, so
a card block is flush on both edges. The hyphenation is not decoration: a card column is
about 230px wide, and without word breaks the justification opens rivers between the
words. Drop the two `hyphens` lines if you would rather have wide gaps than broken words.
The pull quote in the first `#why` card stays ragged — stretching two lines of somebody's
quotation reads as a mistake.

## The page, in order

| # | Section | What it does |
|---|---|---|
| 1 | Hero | The control in four sentences |
| 2 | `#why` | EMG control as a documented load, plus the note that states what the project does **not** claim |
| 3 | `#story` | The founder's own reason for building this, and the interview |
| 4 | `#control` | The control chain, the four calibration steps, and the facts about the hand |
| 5 | `#kit` | Where each part stands, and what the kit and the app are |
| 6 | `#app` | One control logic, two places it can run. A real screenshot |
| 7 | `#video` | Three recordings of the hand working |
| 8 | `#get` | The two purchase placeholders, right before the questions |
| 9 | `#faq` | Five questions |
| 10 | `#contact` | One form, and the direct details |

The dark and light surfaces alternate on purpose: paper, tint, dark, paper, dark, paper,
dark, tint, dark. **A block that moves between surfaces needs its colours checked.** The
copy in `#get` carried an inline `color: var(--text-soft)` while it lived in `#kit`, and
that grey went unreadable the moment the block landed on ink. It is a `.download-lede`
class now, with a `.dark` variant. Put no colour in a `style` attribute.

## A title carries no full stop

No heading on the page ends in a period — `h1`, `h2`, `h3`, and the display lead of the
story section. A period inside a title stays: "One control logic. Two places it can run".
Keep the rule when you add a section.

## Three rules the copy obeys

**No patent claim.** The page names no patent and no patent number. Per
`myotriton-company/IP_status.md`, US 10,912,662 is expired for an unpaid maintenance fee,
CA 3,009,219 was deemed expired on 2026-03-19, and the status of IL 261473 is unconfirmed.
A public claim of protection that does not exist is the one mistake on this page that could
cost money. **Do not put a patent back on the site until a revival is done and the register
shows it.**

**No medical claim.** The kit is a demonstration kit and a training kit. It is not a medical
device. The words *therapy*, *rehabilitation*, *treatment*, *patient*, *prescribed*, and
*diagnosis* appear only inside the disclaimer that denies the claim. The rule and the term
list are in `myotriton/simulator/docs/architecture/glossary.md`.

**No claim the evidence does not support.** The page does **not** say that people abandon
EMG devices more often than body-powered ones, because the literature does not show it. The
narrow claim it does make — EMG control is a documented problem of cognitive load and
usability — comes from `myotriton-company/research-emg-abandonment.md`. Read that file
before you change the `#why` section.

## Two names on this page belong to living people

`#story` names **Siarhei Arefyev** as the engineer who built the control in hardware and
who develops the hand with the founder. The spelling comes from
`myotriton-company/docs/ownership-cap-table.md`, which is the project's own record — not
from a transliteration guess.

Two cautions before this goes public:

- **His consent.** `docs/ownership-cap-table.md` still lists "the position of Arefyev, 20%,
  and their readiness to sign" as an open item, and `IP_recovery_plan.md` plans to approach
  him as the probable ally in the IP recovery. A public claim that he develops the hand,
  made before that conversation, could complicate it. Get his agreement first.
- **He is a co-owner of the original IP,** at 20%. That is a live legal matter, so the page
  says what he does and claims nothing about who owns what.

## The founder's story is the founder's

`#story` carries a personal statement about the founder's father. The frame came from the
founder: it began with his father, and it is not only for his father. **Everything else in
those four paragraphs is a draft.** Replace it with his own words, and never add a fact
about that family that he has not written himself. The section carries an HTML comment
saying the same thing.

## The videos

Four videos, from the founder's own channel. Each tile is a **local poster image and a
button**. The page ships no YouTube code: `script.js` builds the player on the first click.
That keeps the page fast and sends nothing to YouTube before somebody asks for it.

| Video ID | Poster | Where | Caption |
|---|---|---|---|
| `9EDitzRrm04` | `assets/video-interview.jpg` | `#story`, above the signature rule | (no caption) |
| `-qElkciA-kw` | `assets/video-control.jpg` | `#video` | How the control works |
| `htbFSBFnRUU` | `assets/video-moulded.jpg` | `#video` | First test of the moulded hand |
| `Kx1t_u0Xl38` | `assets/video-testing.jpg` | `#video` | Building it, and testing it |

**Why a poster and not a plain `<iframe>`.** A YouTube embed refuses to play when the page
itself came from a `file://` URL — the player has no origin to check and it reports
"Error 153, Video player configuration error". That is not a fault in the page, but it
makes a local copy look broken. So `script.js` checks the protocol:

- `http:` or `https:` — the click swaps the poster for the player, and it plays in place.
- `file:` — the click opens the video on YouTube in a new tab.

Both paths are tested. Serve the page over HTTP when you want to see the real behaviour.

To add a video: copy one `.video-item`, set `data-yt` to the id, and put a poster at
`assets/video-<slug>.jpg`. The posters came from YouTube itself:

```bash
curl -s "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg" -o /tmp/t.jpg
sips -Z 900 -s format jpeg -s formatOptions 70 /tmp/t.jpg --out assets/video-slug.jpg
```

If `maxresdefault.jpg` returns 404, use `hqdefault.jpg`; `object-fit: cover` crops its 4:3
frame to the 16:9 box.

## The three placeholders

Each one says on the page that it is a placeholder.

| Placeholder | Where | Replace with |
|---|---|---|
| Buy the kit | `#kit`, the first `.store-badge` | The shop link, when the kit goes on sale |
| App Store badge | `#kit`, the second `.store-badge` | Apple's own badge artwork and the store link, from the Apple marketing guidelines |
| QR code | `assets/qr-placeholder.svg` | A QR code of the store link. The file is a stand-in graphic and it scans to nothing |

Both badges are `<button>` and not links, on purpose: a dead link is worse than a control
that says it is not ready.

## The app screenshot is real

`assets/app-screen.png` is a screenshot of the app running in the iOS Simulator, not a
mock-up. To take a fresh one after the app changes:

```bash
cd ~/myotriton/simulator/ios/App && xcodegen generate
xcodebuild -project HandKitApp.xcodeproj -scheme HandKitApp \
  -sdk iphonesimulator -configuration Debug \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  -derivedDataPath /tmp/dd build
UDID=$(xcrun simctl list devices available | grep -m1 'iPhone 17 Pro (' | sed 's/.*(\([A-F0-9-]*\)).*/\1/')
xcrun simctl boot "$UDID"; xcrun simctl bootstatus "$UDID" -b
xcrun simctl install "$UDID" /tmp/dd/Build/Products/Debug-iphonesimulator/HandKitApp.app
xcrun simctl launch "$UDID" com.deterica.genesis.kit
xcrun simctl io "$UDID" screenshot /tmp/app-raw.png
sips --resampleWidth 600 -s format png /tmp/app-raw.png --out assets/app-screen.png
xcrun simctl shutdown "$UDID"
```

The generated `.xcodeproj` is not in the simulator repository — ADR-017 makes `project.yml`
the source of truth — so generating it is expected and harmless.

## The images

The renders come from `myotriton-legacy/prototype-2018/photos/History/`. That repository is
frozen: the files were copied out and resized, and nothing was written back.

| File | Source | Used |
|---|---|---|
| `hand-hero.jpg` | `2018_02_01.jpg` | Hero |
| `hand-controls.jpg` | `2018_01.133.jpg`, cropped | `#control` |
| `app-screen.png` | The iOS Simulator | `#app` |
| `qr-placeholder.svg` | Generated | `#kit` |
| `hand-exploded.jpg`, `hand-dorsal.jpg`, `hand-profile.jpg`, `hand-palm.jpg`, `hand-cad.jpg` | The same archive | **Not used.** Kept because they are good and the sections that held them may come back |

`hand-controls.jpg` is cropped because the original render has a USB cable plugged into the
hand. **`sips` does not run its options in the order you write them** — a `-c` crop and a
`-Z` resize in one command applies the resize first and the crop lands in the wrong place.
Crop in one command, resize in a second.

On a dark surface the renders use `mix-blend-mode: lighten`, so their black background
disappears and the hand reads as a cut-out.

**Every `<img>` needs `height: auto`.** The `width` and `height` attributes are
presentational hints, so an image with `width: 100%` in CSS and a `height` attribute is
stretched vertically without it. The global `img` rule holds the fix.

## The form

The contact form posts to **Web3Forms**, which delivers the message to the address on the
account. The page stays a static file: no server of ours sits in the path. Delivery is
confirmed working from a browser.

Two constants at the top of `script.js` hold the wiring: `FORM_ENDPOINT` and `FORM_KEY`.

**The access key is public.** It travels in `script.js` to every visitor's browser, and
Web3Forms is built that way. The consequence is that anybody can post to the key, so the
form carries a honeypot: `<input name="botcheck">`, hidden by `display:none`, which a
person never sees and never ticks. Web3Forms drops any submission that arrives with it set.

**A failed request does not lose the message.** On any error the status line offers the same
message as a `mailto:` link, so the visitor sends it from their own client instead. The
address for that path is the `EMAIL` constant, and it is also a plain link under the form.

### Testing it

Web3Forms accepts a submission only from the origin the form is registered for, which is
`deterica.com`. Two consequences:

- **A submission from `localhost` fails at CORS,** and `fetch` throws "Failed to fetch".
  That is the registration, not a fault in the page. To test locally, add `localhost` to
  the allowed addresses in the Web3Forms form settings.
- **A submission from a server is refused** on the free plan: "This method is not allowed.
  Use our API in client side." So `curl` cannot verify this form. Use a browser.

An empty required field stops the submission and names the field, before any request goes
out.

## Run it

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

`index.html` also opens straight from the filesystem.

Full-page screenshot, with the browser that is already installed:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --force-prefers-reduced-motion \
  --window-size=1440,9000 --screenshot=/tmp/site.png --virtual-time-budget=5000 \
  "file://$PWD/index.html"
```

`--force-prefers-reduced-motion` matters: without it the scroll reveals leave the lower
sections at zero opacity in the capture.

## Deploy to GitHub Pages

1. Push these files to `main`.
2. **Settings → Pages**, source `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. The custom domain is already set: `CNAME` holds `deterica.com`. GitHub Pages reads that
   file, so keep it in the repository root — a commit that drops it drops the domain.

## Before launch

- [ ] Replace the story with the founder's own words.
- [x] The domain is decided. `CNAME` holds **deterica.com**, the root, which matches the
      brand the page carries. Note what that means: the root no longer serves the retail
      business, so nothing on the old listing-intelligence site is reachable there.
- [ ] Settle the app's display name against this site — see the ⚠️ note above.
- [ ] Fill the three placeholders as each becomes real.
- [ ] Make `og:image` an absolute URL. A relative path does not work in a link preview.
- [ ] Confirm the company address against
      `myotriton-company/docs/company-identity.md` on the day you publish.
