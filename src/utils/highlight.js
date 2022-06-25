import hljs from 'highlight.js/lib/core'
import html from 'highlight.js/lib/languages/vbscript-html'
import 'highlight.js/styles/atom-one-dark-reasonable.css'

hljs.registerLanguage('html', html)

if (typeof window !== 'undefined') {
  window.hljs = hljs
}
