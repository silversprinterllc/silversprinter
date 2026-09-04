# LESSON 2.4 (UPDATED): Copy, Images & URL Structure

*Writing words and setting up URLs that scale into Module 2B*

## Production Notes
- **Format:** OBSBOT screen recording (copy decks + URL configuration) + Canon 70D (strategy)
- **Target Length:** 13-15 minutes
- **Screen Recording:** Copy deck walkthrough, image optimization in TinyPNG, URL/slug configuration in Lodgify and Next.js

---

## VIDEO SCRIPT

### HOOK (0:00 - 0:40) [CANON 70D]

"Your site's live. The structure's right. But right now, it's generic. Hotel-template-generic. Stock-photo-generic. This lesson fixes that.

Three things: the copy that makes guests feel something, the images that justify your nightly rate, and — the one most courses skip — the URL structure that lets Module 2B's SEO engine actually rank. If your URLs look like '/page?id=123,' no amount of brilliant content in Module 2B will save you. We set that up today."

### COPY: WRITE LIKE THE PROPERTY HAS A POINT OF VIEW (0:40 - 4:30) [CANON 70D + SLIDES]

"**[SLIDE: Generic vs. Voiced Copy]**

Generic: 'Beautiful lakefront home, sleeps 8, great views.'

Voiced: 'Your private Finger Lakes wine country retreat. Wake up to lake views, step onto the dock for a morning kayak, spend the afternoon at three hand-picked Seneca Lake vineyards. Return home to dinner prepared in your kitchen by a local chef while the sun sets over the water.'

Same property. Different rate bracket.

**[SLIDE: The 3-Question Copy Filter]**

Every sentence on your site should answer yes to one of these:

1. Does it create a specific feeling? (Not 'nice' — specific. Lazy mornings. Sunset dinners. First frost bonfires.)
2. Does it give a specific detail that signals quality? (Not 'modern kitchen' — a Wolf range, La Marzocco espresso machine, Yeti cooler stocked on arrival.)
3. Does it address a specific objection? ('Concerned about booking outside Airbnb? We've hosted 340 stays with a 4.97 rating since 2023.')

If a sentence doesn't do at least one of those, cut it.

**[SLIDE: The Headline Formula]**

Home page hero headline: [Experience] + [Location] + [Unique Differentiator]

Examples from the wild:
- 'Your Private Finger Lakes Wine Country Retreat — on Seneca Lake'
- 'The Lakefront Reunion Compound — Sleeps 16 on the Water'
- 'The Shoulder Season Reset — Finger Lakes, Off-Peak, All-Inclusive'

Three patterns worth noting: the retreat (romance/couple), the compound (group), the reset (wellness/off-season). lakesidelandingflx.com uses all three variations depending on the guest persona being targeted.

**[SLIDE: /about Copy Structure]**

Four paragraphs. No more, no less.

1. **Origin** — how and why you started hosting
2. **Philosophy** — what you believe about hospitality (this is where your opinionation lives)
3. **Proof** — number of stays, rating, review highlights
4. **Invitation** — 'If that sounds like your kind of host, we'd love to have you'

A face photo at the top. Real first name. Real last name. Real email. Trust is built by specificity, not polish."

### IMAGES: YOU CAN'T FIX A $300 RATE WITH A $1M VIEW (4:30 - 7:30) [CANON 70D + SCREEN RECORDING]

"**[SLIDE: Photo Philosophy]**

Three rules:

1. **Lifestyle over empty.** A made bed is hotel. A made bed with a coffee cup, a book, and morning light is home. People book lifestyle.
2. **Hero is non-negotiable.** One image justifies the rate. Usually an exterior or a killer interior moment. Hire a photographer for this one shot minimum.
3. **Order matters more than count.** First 5 images carry 80% of the decision. Hero → exterior wide → primary bedroom → living room with character → view/amenity → then the rest.

**[SLIDE: Image Specs]**

- Hero: 2400x1600px minimum
- Gallery: 1920x1280px
- File size: under 300KB per image (TinyPNG, free)
- Format: WebP if your platform supports it, otherwise JPG
- Alt text on every image (SEO signal for Module 2B)

**[SCREEN RECORDING: TinyPNG bulk compression]**

Drop your images in. Download compressed versions. Re-upload. Your site loads 2-3x faster. Every second of load time costs you 7% of conversions.

**[SLIDE: B-Roll You'll Need Later]**

Capture these on your next stay — they'll feed /packages, /add-ons, and Module 9:
- Coffee on the porch
- Kayak launching
- Wine on the deck at sunset
- Chef plating food in your kitchen
- Family around the fire pit
- The dock at golden hour

These aren't vanity. Every Module 9 package page needs hero imagery. Shoot it now."

### SETTING UP YOUR URL STRUCTURE FOR ECOSYSTEM GROWTH (7:30 - 11:00) [CANON 70D + SCREEN RECORDING]

"**[SLIDE: Why URLs Matter]**

This is the section most STR courses skip. It's also where Module 2B's entire SEO engine either succeeds or dies.

Here's the principle: your URL is a promise to Google about what the page is about. Clean, descriptive URLs get ranked. Ugly URLs get ignored.

**[SLIDE: Bad vs. Good URLs]**

Bad:
- lakesidelandingflx.com/page?id=123
- lakesidelandingflx.com/blog/post-47
- lakesidelandingflx.com/things_to_do_page

Good:
- lakesidelandingflx.com/local-guide/wineries
- lakesidelandingflx.com/local-guide/seneca-lake-restaurants
- lakesidelandingflx.com/packages/fall-wine-weekend
- lakesidelandingflx.com/add-ons/chef-dinner

**[SLIDE: 5 URL Rules]**

1. **Use hyphens, not underscores or spaces.** 'fall-wine-weekend' not 'fall_wine_weekend' or 'fall wine weekend.'
2. **Use lowercase only.** Always.
3. **Include the target keyword.** '/local-guide/wineries' is targeting 'Finger Lakes wineries' — the keyword is in the URL.
4. **Use a logical hierarchy.** Parent/child structure. '/local-guide/wineries/seneca-lake' tells Google this is a sub-topic of wineries, which is a sub-topic of the local guide.
5. **Keep them short.** 3-5 words max in the slug. 'Seneca-lake-wineries' not 'the-best-wineries-on-seneca-lake-you-need-to-visit-this-fall.'

**[SCREEN RECORDING: Lodgify URL settings]**

In Lodgify: Settings > SEO > Custom URLs. Enable clean slugs. For each page, set the slug manually. Default template slugs are garbage — override them.

**[SCREEN RECORDING: Next.js app router]**

In a Next.js custom build, your file structure IS your URL structure. A file at `app/local-guide/wineries/page.tsx` becomes /local-guide/wineries. Clean by default. This is one of the reasons custom builds scale better into Module 2B.

**[SLIDE: The URL Plan for Your Site]**

Document your URL plan now. Use this table:

| Purpose | URL | Built in Module |
|---|---|---|
| Home | / | Module 2 |
| Property page | /[property-slug] | Module 2 |
| About | /about | Module 2 |
| Book | /book | Module 2 |
| Packages hub | /packages | Module 2 (placeholder), Module 9 (full) |
| Individual package | /packages/[package-slug] | Module 9 |
| Add-ons hub | /add-ons | Module 2 (placeholder), Module 9 (full) |
| Individual add-on | /add-ons/[add-on-slug] | Module 9 |
| Insider | /insider | Module 2 |
| Refer | /refer | Module 2 |
| Gift | /gift | Module 2 |
| Local guide hub | /local-guide | Module 2 (placeholder), Module 2B (full) |
| Guide sub-pages | /local-guide/[topic-slug] | Module 2B |
| Links | /links | Module 2 (placeholder), Module 2B (full) |

**[SLIDE: Redirects]**

If you already have an old site with different URLs, set up 301 redirects from old to new. Losing your existing SEO equity because you didn't set up redirects is one of the most common self-inflicted wounds I see. Most platforms have a redirect manager — use it."

### COPY + IMAGE ASSEMBLY WALKTHROUGH (11:00 - 13:30) [OBSBOT]

"**[SCREEN RECORDING: Copy deck + assembly]**

I've provided a complete copy deck template in the course resources. 11 pages, fill-in-the-blanks, ready to customize. Let me walk through the fill-in process for /home:

[Detailed walkthrough of each field on /home — hero headline, sub-headline, 3 social proof cards, feature highlights, review module, packages preview, local guide teaser, CTA]

Same process for /about, /[property-name], /insider, /refer, and the placeholders for /packages, /add-ons, /local-guide, /gift, /links.

Don't agonize. First draft is fine. You can rewrite after you have booking data telling you what converts."

### CLOSE (13:30 - 14:30) [CANON 70D]

"Voice, images, URLs. Three things most operators do poorly and wonder why their site feels generic. Yours won't.

**[SLIDE: Homework]**

1. Write copy for all 11 pages using the provided templates
2. Apply the 3-question filter to every sentence — cut what fails
3. Shoot or gather all images, compress with TinyPNG
4. Set URL slugs for every page (use the URL plan table)
5. Document your full URL plan in the provided spreadsheet
6. Set up 301 redirects if migrating from an old site
7. Publish all updates, test on mobile

In Lesson 5, we wire up the referral program and the loyalty system — turning the URLs we placeholdered into revenue generators.

See you there."

---

## TEMPLATES PROVIDED

1. **11-Page Copy Deck** — fill-in-the-blank for every URL
2. **Headline Formula Sheet** — 20 headline variations across 4 personas
3. **/about 4-Paragraph Template**
4. **Image Checklist** — what to shoot, what order, what specs
5. **URL Plan Spreadsheet** — every URL, every slug, every target keyword
6. **Redirect Setup Guide** — Lodgify, OwnerRez, Next.js

---

## STUDENT DELIVERABLES

- [ ] Copy written for all 11 URLs
- [ ] 3-question filter applied (no generic sentences)
- [ ] Images shot/gathered, compressed
- [ ] Clean URL slugs set on every page
- [ ] URL plan documented
- [ ] 301 redirects in place (if migrating)
- [ ] All updates published and mobile-tested
