import { createParamExtractor } from '../utils.js'

// Firebase Dynamic Links (<project>.page.link/?link=<canonical>&ofl=<fallback>).
// `link` is the canonical destination; `ofl` is the web fallback used when no
// app handler is available. They're often identical, but when they differ
// `link` is the more correct choice.
export const unwrapFirebaseDynamicLinks = createParamExtractor({
  hosts: /\.page\.link$/,
  params: ['link', 'ofl'],
})
