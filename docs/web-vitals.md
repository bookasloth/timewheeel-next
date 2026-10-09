# Real-visitor Core Web Vitals

`components/web-vitals.tsx` reports each visitor's Core Web Vitals through the
analytics bus (`analytics.vital`). They go to:

- **GA4, via GTM**, only after the visitor accepts cookies. Vitals from the
  current page are held and sent at that moment, because the tap on "Accept"
  is itself what finalises LCP on a first visit.
- **PostHog**, as a `web_vital` event, if `NEXT_PUBLIC_POSTHOG_KEY` is set.
- **Never** the Meta pixel or Clarity (they don't implement `vital()`).

| Metric | Meaning | Good | Poor |
| --- | --- | --- | --- |
| LCP | Main content visible | ≤ 2.5 s | > 4 s |
| INP | Delay responding to taps/clicks | ≤ 200 ms | > 500 ms |
| CLS | Layout jumping around (unitless) | ≤ 0.1 | > 0.25 |
| FCP | First content painted | ≤ 1.8 s | > 3 s |
| TTFB | Server response time | ≤ 0.8 s | > 1.8 s |

`metric_page` is the page that was loaded. A metric always belongs to the hard
load, even if the visitor has clicked through to other pages by the time CLS or
INP report.

## GTM setup (one time)

Each reading is pushed to `dataLayer` as:

```js
{ event: "web_vitals", metric_name: "LCP", metric_value: 1840.2, metric_delta: 1840.2,
  metric_id: "v5-...", metric_rating: "good", metric_page: "/seo-company-in-nagpur",
  navigation_type: "navigate", value: 1840 }
```

In the GTM container (GTM-W8T4XS6B):

1. **Variables → New → Data Layer Variable**, one for each of: `metric_name`,
   `metric_value`, `metric_delta`, `metric_id`, `metric_rating`, `metric_page`,
   `navigation_type`, `value`.
2. **Triggers → New → Custom Event**, event name `web_vitals`.
3. **Tags → New → Google Analytics: GA4 Event**, using the site's existing GA4
   measurement ID. Event name: `{{metric_name}}`. Event parameters: the eight
   variables above, under the same names. Trigger: the `web_vitals` trigger.
4. Preview on the live site, accept cookies, click once, and check that `LCP`,
   `FCP` and `TTFB` events appear. `CLS` and `INP` arrive when the tab is hidden
   or closed. Then **Submit**.

## GA4 setup (one time)

**Admin → Custom definitions**:

- Custom dimensions (event scope): `metric_rating`, `metric_page`,
  `navigation_type`, `metric_id`.
- Custom metric: `metric_value` (unit: milliseconds).

Data appears in reports 24 to 48 hours after the first events arrive.

## Reading it

**Explore → Free form**:

- Rows: `metric_page`.
- Columns: `metric_rating`.
- Values: Event count.
- Filter: event name exactly `LCP` (then repeat for `INP` and `CLS`).

That gives the share of good / needs-improvement / poor visits per landing page.
Add **Device category** to the rows to split mobile from desktop. GA4 can't
compute percentiles (p75, which is what Google grades on); for that, enable the
BigQuery export.

CLS and INP can report more than once per page load with the same `metric_id`.
The `value` parameter carries the change since the last report (CLS × 1000), so
summing `value` per `metric_id` gives the final number.
