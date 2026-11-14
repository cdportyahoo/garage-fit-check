# Search visibility checkpoint

## November 12, 2026 — America/Chicago

- Published `two-three-car-garage-layout.html` with worked two- and three-car width budgets, a depth example, practical parking checks and links back to the planner and other guides.
- Linked the guide from the planner and cabinet sizing guide; added its canonical URL to sitemap.xml. Live planner, new guide and sitemap return HTTP 200 with the updated content.
- GitHub Pages deployment for commit 077d995b2c0bdcd56cbc525d77ad8124e9a343b2 completed successfully.
- Search Console overview still says it is processing data. No search traffic or ranking results are established by this check.
- Resubmitted sitemap.xml; Google displayed 'Sitemap submitted successfully'. The sitemap table still displayed 'Couldn't fetch' and zero discovered pages immediately afterward. Submission acceptance is not proof of successful sitemap processing; recheck this later.
- URL Inspection initially reported the new guide as unknown to Google and not indexed. Requested indexing; Google confirmed 'Indexing requested' and addition to a priority crawl queue. This is not proof of indexing or ranking.

## Next checks

1. Check sitemap processing and URL inspection after Google has had time to crawl; avoid repeated indexing submissions for the same page.
2. Review actual search queries and impressions once reports populate; use those to choose the next original guide.
3. Continue useful comparisons using verified manufacturer specifications. Add affiliate tracking only after program approval and review of applicable terms.

## Affiliate inquiry checkpoint

User confirmed sending EasyGarage, FLEXIMOUNTS and Lowe's inquiries through their own mail app, and receiving Home Depot Creator support-ticket acknowledgement. These are inquiries only, not applications, approvals or accepted contracts. Replies remain pending.

Reference: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl


## November 13, 2026 — Search Console verification (America/Chicago)

### Confirmed indexed in Google's URL Inspection
- Planner: https://cdportyahoo.github.io/garage-fit-check/
- Measuring guide: https://cdportyahoo.github.io/garage-fit-check/garage-measuring-guide.html
- Two-/three-car guide: https://cdportyahoo.github.io/garage-fit-check/two-three-car-garage-layout.html

All three displayed "URL is on Google" and "Page is indexed". For the planner, the last crawl shown was Nov 11, 2026, 7:18:08 PM, Googlebot smartphone; fetch successful, crawling/indexing allowed, and Google-selected canonical matched the inspected URL. This confirms indexing, not ranking, traffic, or Google's adoption of every recent app revision.

### Newly requested indexing
The cabinet sizing guide and shallow-versus-deep cabinet comparison initially displayed "URL is unknown to Google". Requested indexing once for each. Google displayed "Indexing requested" and confirmed addition to a priority crawl queue for both. They are not claimed indexed yet. Do not repeat these requests merely because reports lag.

### Sitemap and technical checks
- Submitted sitemap report still displayed "Couldn't fetch", zero discovered pages, and last read Nov 12. This report has not been fixed or claimed successful.
- Google live URL inspection of sitemap.xml on Nov 13 succeeded: URL available to Google, crawl allowed Yes, page fetch Successful, indexing allowed Yes (Google Inspection Tool smartphone). Live fetch success is distinct from sitemap report processing.
- Direct HTTP checks returned 200 for sitemap.xml and all five listed pages. XML parsed successfully with five URLs.
- Every HTML page has its matching canonical. No robots/googlebot noindex meta or X-Robots-Tag was found. The home-page ownership verification tag remains present. Domain-root robots.txt returned 404.
- Overview performance and indexing summary reports still said "Processing data, please check again in a day or so". No impression/click numbers are established.

### Next
Allow processing time, then recheck the two requested guides, sitemap report and performance data. Use actual queries and impressions to prioritize future content. No app drawing or functionality changes were made in this check.
