# urlcleaner

[![codecov](https://codecov.io/gh/macieklamberski/urlcleaner/branch/main/graph/badge.svg)](https://codecov.io/gh/macieklamberski/urlcleaner)
[![npm version](https://img.shields.io/npm/v/urlcleaner.svg)](https://www.npmjs.com/package/urlcleaner)
[![license](https://img.shields.io/npm/l/urlcleaner.svg)](https://github.com/macieklamberski/urlcleaner/blob/main/LICENSE)

Unwrap redirect, affiliate, and tracking wrapper URLs and strip tracking parameters. Turn noisy links into clean, direct URLs.

URLs collected from feeds, emails, and social platforms rarely point straight at their destination: they pass through search-engine redirects, email security gateways, affiliate networks, and AMP caches, and carry analytics parameters that bloat the link and leak data. urlcleaner ships 70+ unwrappers for known wrapper services and a list of 150+ known tracking parameters, plus a composite `cleanUrl()` that applies both. It has zero dependencies and runs in any modern JavaScript runtime, including browsers.

## Installation

```bash
npm install urlcleaner
```

## Quick Start

```typescript
import { cleanUrl } from 'urlcleaner'

cleanUrl('https://www.google.com/url?q=https%3A%2F%2Fexample.com%2Fpost%3Futm_source%3Dnewsletter')
// => 'https://example.com/post'
```

## API

### `cleanUrl(url, options?)`

Unwraps redirect wrappers (repeatedly, since wrappers can nest), then strips tracking parameters. When the input cannot be parsed as a URL or nothing applies, the input string is returned unchanged, so the result is always safe to display.

```typescript
import { cleanUrl, defaultUnwrappers, unwrapWebArchive } from 'urlcleaner'

const cleaned = cleanUrl(url, {
  // Unwrappers to apply, first match wins per pass (omit to use defaults).
  unwrappers: [...defaultUnwrappers, unwrapWebArchive],
  // Query parameter names to remove, matched case-insensitively (omit to use defaults).
  trackingParams: ['utm_source', 'utm_medium', 'fbclid'],
  // Maximum number of unwrap passes for nested wrappers. Defaults to 3.
  maxUnwrapDepth: 3,
})
```

### `unwrapUrl(url, unwrappers)`

Applies the unwrappers in order to a `URL` instance and returns the first extracted target as a string, or `undefined` when none match.

### `stripTrackingParams(url, trackingParams)`

Deletes matching query parameters from a `URL` instance in place and returns whether anything was removed.

### `createParamExtractor(config)`

Builds an unwrapper for the common case where the target URL sits in a query parameter:

```typescript
import { cleanUrl, createParamExtractor, defaultUnwrappers } from 'urlcleaner'

const unwrapExample = createParamExtractor({
  hosts: 'go.example.com', // Also accepts an array of hosts or a regex.
  params: ['target'],
})

cleanUrl(url, { unwrappers: [...defaultUnwrappers, unwrapExample] })
```

For wrappers that encode the target (base64 path segments, custom escaping), write a plain function of type `UrlUnwrapper`: it receives a `URL` and returns the target string or `undefined`.

### Defaults

`defaultTrackingParams` and `defaultUnwrappers` are exported from the package root and from the lighter `urlcleaner/defaults` subpath. `defaultUnwrappers` enables a conservative subset of the catalog (search-engine redirects and social-platform shims); everything else is exported individually for explicit opt-in.

## Unwrappers

Enabled by default:

| Unwrapper | Description |
| --- | --- |
| `unwrapBing` | Bing search-result redirect (www.bing.com/ck/a?u=a1\<base64url\>) |
| `unwrapFacebookShim` | Facebook link shim (l.facebook.com/l.php?u=\<target\>) |
| `unwrapGoogle` | Google redirect (google.\<TLD\>/url?url=\<target\> or ?q=\<target\>) |
| `unwrapGoogleAmpViewer` | Google AMP viewer (www.google.\<TLD\>/amp/s/\<host\>/\<path\>) |
| `unwrapGoogleNews` | Google News legacy redirect (news.google.\<TLD\>/news/url?url=\<target\>) |
| `unwrapGoogleNewsModern` | Google News modern article URLs (news.google.com/articles/\<base64\>) |
| `unwrapGoogleScholar` | Google Scholar search-result redirect (scholar.google.\<TLD\>/scholar_url?url=\<target\>) |
| `unwrapInstagramShim` | Instagram outbound link shim (l.instagram.com with ?u=\<target\>) |
| `unwrapRedditOut` | Reddit outbound click tracker (out.reddit.com/?url=\<target\>) |
| `unwrapVkAway` | VK away redirect (vk.com/away.php?to=\<target\>) |
| `unwrapYahooSearch` | Yahoo Search redirect (r.search.yahoo.com/.../RU=\<target\>/RK=...) |
| `unwrapYouTube` | YouTube external redirect (www.youtube.com/redirect?q=\<target\>) |

Many more are available for explicit opt-in: email security gateways (Outlook SafeLinks, Proofpoint, Mimecast), affiliate networks (Awin, Skimlinks, Commission Junction), CJK platforms, AMP caches, and others. See [src/unwraps](src/unwraps) for the full catalog, each documented in its source file.
