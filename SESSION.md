# Bukket — session handoff

Read this first in a new session. It is the working memory for the storefront as of **2026-09-11**.

> Next-session prompt: *Continue Bukket from `SESSION.md`. Repo `/Users/galmoussan/projects/grok/bukket`. Live at https://bukket.vercel.app. Do not change production/`main` until Gal agrees. Current work branch is `development`.*

---

## Snapshot

| Item | Value |
|------|--------|
| Repo | `/Users/galmoussan/projects/grok/bukket` |
| GitHub | `GalMoussan/bukket` |
| Live | https://bukket.vercel.app |
| Contact | https://bukket.vercel.app/contact |
| Checkout | https://bukket.vercel.app/checkout |
| Head | `c928013` — `feat: sage atmosphere, contact page, and order email` |
| Branches at same commit | `main`, `development`, `Developement` (typo spelling, still used) |
| Frozen snapshot | `production` @ `515423d` (pre-redesign) |
| Local branch now | `development` |
| Untracked, do not commit | `Bukket-images/` (local screenshots + original video download) |

Two commits landed this workstream:

1. `bbfd5c5` — Terms page, Rolling Stone clipping, NowThis video, wordmark **the BUKKET experience**
2. `c928013` — sage/forest atmosphere, magic-circle product stage, contact page, checkout phone + order email

---

## What the product is

Bukket is a single-product Next.js 16 (App Router) shop for the original portable gravity bong. Age-gated 21+ in the UI. Four colourways at **$39.99**, free shipping over **$50**, otherwise **$5.99**. Payment is **not live**. Placing an order emails a purchase list to the shop inbox; nothing is charged.

Brand lockup everywhere: **the BUKKET experience** (`src/components/Wordmark.tsx`).

---

## How to run locally

```bash
cd /Users/galmoussan/projects/grok/bukket
git checkout development
# confirm nothing is already on 3000
lsof -nP -iTCP:3000 -sTCP:LISTEN
npm run dev
```

Open http://localhost:3000

`.env.local` (gitignored) currently:

```
MAIL_TO=gal@gmail.com
```

Copy `.env.example` if starting fresh. Next.js 16 docs live in `node_modules/next/dist/docs/` — this version has breaking changes vs training data.

---

## Site map

Home scroll (`src/app/page.tsx`):

1. Hero + sage circle + colour picker + add to bag
2. Four colourways
3. How it works (3 steps + YouTube)
4. Why Bukket (chalkboard + tape notes)
5. Rolling Stone 2004 Hot List clipping
6. Watch This (Bukket Movie YouTube + local NowThis mp4)

Other routes:

- `/checkout` — bag + shipping form + phone; POST `/api/order`
- `/contact` — form + Kibbutz Regavim address; POST `/api/contact`
- `/terms` — legal copy as supplied (see open issues)

Shared chrome: `Header` (How it works / Terms / Contact / Bag), `Footer`, `AgeGate`, `CartDrawer`, `SmokeLayer`, `StickyBuyBar` (mobile).

---

## Visual system (agreed)

Gal liked the **dark-but-not-black forest** palette and the **summoning-circle** product stage.

Tokens in `src/app/globals.css`:

| Token | Hex | Role |
|-------|-----|------|
| night | `#1b211c` | page ground (was `#0e1014`) |
| raised | `#272e28` | panels / header |
| mist | `#222a24` | how-it-works wash |
| chalk | `#2c4034` | chalkboard |
| cream | `#e8e2d6` | text |
| muted | `#a39e93` | secondary text |
| terracotta | `#d97757` | CTA |
| sage | `#8fa88a` | circle / atmosphere |
| gold | `#c4a574` | circle accents |

Atmosphere: fixed `.site-aura` (wash + two spinning rings) in `layout.tsx`. Hero sage circle is five SVG layers with opposite spins (`SageCircle.tsx`): protractor, 8-pointed star/octagon/bezel, hexagram + node circles, seal arcs/runes, chevron teeth.

Performance already applied (do not reintroduce):

- No live `filter: hue-rotate` or live `blur` on the circle (those rasterized vectors)
- GPU `translateZ(0)` + `will-change: transform` on spin layers
- Pause sage animations when the hero is off-screen (`IntersectionObserver`)
- `background-attachment: fixed` only from `md` up

Fonts: Outfit (display), Assistant (body), Playpen Sans (notes).

---

## Mail / orders

**Before this work, Place order went nowhere.** Now:

- Recipient alias: **`gal@gmail.com`** (`MAIL_TO`, default in `src/lib/mail.ts`)
- Gal will replace this with the real inbox later
- `sendMail()` tries SMTP if `SMTP_USER` + `SMTP_PASS` are set; otherwise FormSubmit.co
- First FormSubmit delivery may require Gal to confirm the inbox from an activation mail
- Order POST `/api/order` recalculates prices from `COLOR_VARIANTS` + `PRODUCT.price` (do not trust client totals)
- Email is a listed purchase: items, colours, qty, subtotal, shipping, total, name, email, **phone**, ship-to
- Reply-To is the customer email
- Contact form uses the same mailer
- After a successful order the cart is cleared

Checkout now requires phone. Payment copy still says not charged.

---

## User-specified copy (keep unless asked to change)

How it works (`src/lib/product.ts`):

1. **Fill & Load** — Remove the head-piece and fill it up with your smoking-leaves, Place the head-piece with the smoking leaves on it's designated location on top
2. **Light & Pull down** — Light the smoking-leaves on the head-piece, and as you light it - pull up the top part of the BUKKET to slowly open the accordion and suck the smoke inside
3. **Enhale and release** — When accordion is fully open, remove the head-piece and enhale the content of the BUKKET, Enjoy an extraordinary experience

(“Enhale” and “it's designated” are as given.)

Watch This: *See the Bukket in action — the hits, how easy it is to use, the laughs - why are you waiting - go buy it now!*

Contact shop block:

```
Kibbutz Regavim
Menashe, 37820
Israel
+972(0)558859702
```

Replaceable Parts ends with a link: **contact us today** → `/contact`.

---

## Key files

```
src/app/page.tsx, layout.tsx, globals.css
src/app/checkout/page.tsx
src/app/contact/page.tsx
src/app/terms/page.tsx
src/app/api/order/route.ts
src/app/api/contact/route.ts
src/components/SageCircle.tsx     # product-stage geometry + spin
src/components/Hero.tsx
src/components/CheckoutView.tsx
src/components/ContactView.tsx
src/components/Wordmark.tsx
src/lib/product.ts                # price, copy, videos, colours
src/lib/mail.ts / order.ts / contact.ts / terms.ts
src/context/CartContext.tsx       # localStorage cart
public/videos/bukket-session.mp4
public/press/rolling-stone-2004.jpg
```

---

## Open / next (not done)

1. **Real shop inbox** — swap `MAIL_TO` off `gal@gmail.com` when Gal provides it. Optionally add Gmail SMTP (`SMTP_USER` / `SMTP_PASS`).
2. **FormSubmit confirm** — if purchase emails are missing, check `gal@gmail.com` for the activation mail.
3. **Payment** — still not live. Checkout emails a request only.
4. **Terms vs shop** — Terms say 19+ and mention accounts / Terms of Use / shipping & payment pages that do not exist. Age gate + footer say 21+. Gal supplied the Terms text as-is.
5. **Copy typos** — “Enhale”, “it's designated”; confirm whether to keep.
6. **Vercel env** — production needs `MAIL_TO=gal@gmail.com` (and SMTP later) in the Vercel project settings. `.env.local` is not deployed.
7. **Mobile header** — Watch + Terms + Contact + Bag is tight on small phones.
8. **Media licensing** — Rolling Stone scan and NowThis clip were supplied by Gal; flag if that becomes a concern.
9. **Do not commit** `Bukket-images/`.

---

## Working rules Gal set in this stream

- Visual experiments stay on **`development`** until he agrees, then merge to **`main`** for Vercel.
- `production` branch is the old live snapshot — leave it.
- Wordmark is **the BUKKET experience**, not `[[ BUKKET ]]`.
- Palette and magic-circle direction are approved; do not revert to near-black `#0e1014`.
- Functionality (cart, checkout, age gate, terms, contact) must survive visual work.

---

## Verify before claiming done

- `npx tsc --noEmit`
- Hit `/`, `/checkout`, `/contact`, `/terms`
- Place-order sends mail (check API `POST /api/order` returns `{ ok: true }`)
- Desktop + mobile for anything visual
- Confirm you are on `development` and not pushing `main` unless Gal asked
