# Deterica — the website

The public site for **Genesis**, the prosthetic hand of **DETERICA LLC**: a control method
that needs no electrodes, and the **Genesis Hand Kit** that carries that control while
the hand is built.

## The names

**Deterica is the company and the brand. The products carry the house name and no
sub-brand.**

| Name | What it is |
|---|---|
| **Deterica** / DETERICA LLC | The company, Texas. It owns the domain and the email |
| **The Deterica hand** | The prosthetic hand. In development |
| **The Deterica Kit** | The desktop kit and the free app together. The product that ships first |
| **Deterica Kit** | The name of the app under its icon, and `CFBundleDisplayName` in the simulator repository |

⚠️ **Two names were dropped, and the reasons are worth keeping.**

- **MYO TRITON** — the name of the same work until 2026-08-20. The four engineering repos
  still carry it in their names.
- **Genesis** — used for one day, on 2026-08-20, and dropped the same day. **Alt-Bionics
  of San Antonio, Texas has sold a prosthetic hand called the "Genesis Hand" since
  September 2024.** Same goods, same state, and we hold no registered mark. See question 17
  in `myotriton-company/05_Open_Questions.md`.

The bundle identifier changed with it, from `com.deterica.genesis.kit` to
`com.deterica.kit`. **An identifier cannot change after the App Store Connect record
exists**, and a record cannot be deleted, so a second record was created on 2026-08-22
and the first one stays.

**Do not invent a sub-brand for a product without a clearance search.** The Genesis episode
cost one day. It would have cost a rebuild of the site, the app, and the packaging if it
had been found later.

## Stack

Static HTML, CSS, and JavaScript. No build step and no dependency. The fonts load from
Google Fonts.

| File | Contents |
|---|---|
| `*.html` | The six pages. One page holds one topic |
| `styles.css` | The design system, in `:root` |
| `script.js` | The navigation highlight, the video players, mobile navigation, scroll reveals, and the contact form. It holds the Web3Forms key |
| `assets/` | The images, the video posters, and the app screenshot |
| `assets/brand/` | The logo pack from Drive. The header, the footer, and the favicon come from it. Read [assets/brand/README.md](assets/brand/README.md) before you change a mark |

### The navigation marks the current page

The header links to pages, not to sections. Each file writes `class="is-active"` on its own
link. See "The cost of no build step" below.

Two details are load-bearing:

- `.nav a` carries a **transparent 2px** bottom border from the start. The active state
  only adds colour, so the text never moves.
- `section[id]` carries `scroll-margin-top: 84px`. The header is sticky and it is 68px
  tall. An anchor without that margin hides its own heading behind the header.

Adding a page: copy the header and the footer from another file. Add the link to the desktop
nav and to the mobile nav in all six files.

Type: Space Grotesk for display, Inter for body text, IBM Plex Mono for data.

The palette is warm neutrals with **one** cool accent. The teal is the only saturated
colour on the page, so it always means "action" and never decoration. Keep it that way.

**Card text is justified.** `.card p` sets `text-align: justify` with `hyphens: auto`, so
a card block is flush on both edges. The hyphenation is not decoration: a card column is
about 230px wide, and without word breaks the justification opens rivers between the
words. Drop the two `hyphens` lines if you would rather have wide gaps than broken words.
The pull quote in the first `#why` card stays ragged — stretching two lines of somebody's
quotation reads as a mistake.

## Six pages, and what each one is for

The site was one page with ten sections. It became five pages on 2026-08-20. The home page
carried every topic at once, and more topics were on the way. The state of each part moved
to a sixth page on 2026-08-23. That page became `history.html` on the same day.

| File | `h1` | Its job |
|---|---|---|
| `index.html` | The hand follows your own movement | **It moves the reader through six blocks.** The claim, the story, the proof that it runs, the offer, where to read more, and the contact. Each block is a teaser, and the page behind it carries the topic |
| `control.html` | EMG control is a load the user carries all day | The method. The problem, the honest note, the control chain, the four facts, the calibration steps, and the video that proves it |
| `kit.html` | The Deterica Kit | The product that ships first. What the kit is for, the kit and the app, a real screenshot, the two coming-soon blocks, and the videos of the hand |
| `story.html` | This did not begin as a business plan | The founder's reason, and the interview |
| `history.html` | The first hand, and the one we build now | The line reads newest first, and it carries two entries: `2026 · now` and `Before 2026`. The 2026 entry holds the state of each of the four parts |
| `contact.html` | Tell us we are wrong about something | The form, the details, and the FAQ |

### The home page is a funnel, not a directory

The home page held three blocks. It ended on a card. It became six blocks on 2026-08-23.
Before that change, a reader came to the end of the page and found only the legal footer.
The page gave no next step. The order is:

1. **Hero.** One claim. The first button goes to the proof below, and the second button
   goes to the kit.
2. **Why this exists.** The story, in the founder's words. It links to `story.html`.
3. **This already runs.** The proof. Two videos of the hand that exists, and three
   statements that another page can check. It ends with a note: the hand and the kit are
   prototypes, and nothing here is for sale. Keep that note.
4. **What we offer.** The app first, then the kit. The app is built, and it needs no
   hardware. The kit is in development, and it comes last in the block. Do not change that
   order. The app is not in the App Store yet, so the block must not say "download it".
5. **Learn more.** Three doors, in rank order: the method, the history, then the story.
6. **Contact.** The closing block. The form itself stays on `contact.html`.

Keep this order. The reader doubts the method first, asks for the state second, and reads
the story last.

**The rules this follows.** A home page moves the reader forward. It does not explain a
topic in full. Each block gives one reason to continue, and the page behind the block
carries the topic. One page holds one search intent, which reads better and ranks better
than ten topics on one URL. Each block on the home page holds one call to action. Every
other page holds one call to action in total. A video sits beside the claim it proves, and
not in a gallery of its own.

**Every page carries exactly one `h1`.** Check that when you add a page.

**The navigation starts with `Home`.** The brand mark also links to the home page. A word is
easier to find than a logo, so keep both. The navigation holds five items: `Home`,
`The control`, `The Kit`, `The story`, and `History`. `Contact` is the button, and not a
navigation item.

### The cost of no build step

There is no build step, so **each of the six files holds its own copy of the header and the
footer.** If you change one of them, change it in all six files. This is the price of a
static site with no tooling. At six pages, the trade is correct.

The navigation highlight is **not** a script any more. Each file writes `class="is-active"`
on its own link. The scroll spy that did this on the single page was 59 lines; a class in
the HTML is none.

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

## The site goes up before both releases

The kit is not on sale, and the app is not in the App Store. The site publishes before
either one. So it holds no store badge, no shop badge, and no QR code. Those all went out
on 2026-08-23. A badge that leads nowhere is worse than no badge, and a QR code that scans
to nothing is worse again.

Two blocks carry the state, and both use `.download`:

| Block | Where | It says | Replace with |
|---|---|---|---|
| Get the app | `kit.html`, `#app` | Coming soon, and one address to write to | Apple's own badge artwork and the store link, from the Apple marketing guidelines |
| Get the kit | `kit.html`, `#get` | Coming soon, and one address to write to | The shop link, on the day the kit goes on sale |

Each block holds one `mailto:` link to `oleg@deterica.com`, with a subject that names what
the reader waits for. Put a real badge in only on the day the real link exists.

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
xcrun simctl launch "$UDID" com.deterica.kit
xcrun simctl io "$UDID" screenshot /tmp/app-raw.png
sips --resampleWidth 600 -s format png /tmp/app-raw.png --out assets/app-screen.png
xcrun simctl shutdown "$UDID"
```

The generated `.xcodeproj` is not in the simulator repository — ADR-017 makes `project.yml`
the source of truth — so generating it is expected and harmless.

## The images

The images come from `myotriton-legacy/prototype-2018/photos/History/`. That repository is
frozen: the files were copied out and resized, and nothing was written back.

| File | Source | Used |
|---|---|---|
| `hand-hero.jpg` | `2018_02_01.jpg` | Hero |
| `hand-controls.jpg` | `2018_01.133.jpg`, cropped | `#control` |
| `app-screen.png` | The iOS Simulator | `#app` |
| `hand-exploded.jpg`, `hand-dorsal.jpg`, `hand-profile.jpg`, `hand-palm.jpg`, `hand-cad.jpg` | The same archive | **Not used.** Kept because they are good and the sections that held them may come back |

`hand-controls.jpg` is cropped because the original image has a USB cable plugged into the
hand. **`sips` does not run its options in the order you write them** — a `-c` crop and a
`-Z` resize in one command applies the resize first and the crop lands in the wrong place.
Crop in one command, resize in a second.

On a dark surface the images use `mix-blend-mode: lighten`, so their black background
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
- [ ] Put a store badge and a QR code on `#app`, and a shop link on `#get`, as each
      becomes real. Not before.
- [ ] Make `og:image` an absolute URL. A relative path does not work in a link preview.
- [ ] Confirm the company address against
      `myotriton-company/docs/company-identity.md` on the day you publish.
