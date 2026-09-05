const { extractObjectBlocks } = require('./inventoryService');
const { stripSectionNumbering } = require('../lib/sectionTitle');
const { koreaDate } = require('../lib/utils');
const { constExpression } = require('./contentExtractorService');

function js(value) {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}

function quote(value) {
  return `'${String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')}'`;
}

function publicSources(sources) {
  return (sources || []).map(({ label, url, note }) => ({ label, url, note }));
}

function sectionData(sections) {
  return (sections || []).map((section) => ({
    ...section,
    title: stripSectionNumbering(section.title),
    image: section.image ? {
      src: section.image.path, alt: section.image.alt, caption: section.image.caption,
      width: section.image.width || 1536, height: section.image.height || 1024,
    } : undefined,
  }));
}

function managedDataBlock(draft) {
  return `// guide-manager:data:start
const gmArticleTitle = ${quote(draft.title)}
const gmArticleLead = ${quote(draft.lead)}
const gmArticleCategory = ${quote(draft.category)}
const gmArticleKeyword = ${quote(draft.keyword)}
const gmInquiryType = ${quote(draft.inquiryType)} as const
const gmInquiryTopic = ${quote(draft.inquiryTopic)}
const gmHeroAlt = ${quote(draft.heroImage.alt)}
const gmHeroCaption = ${quote(draft.heroImage.caption || '')}
const gmHeroWidth = ${Number(draft.heroImage.width || 1536)}
const gmHeroHeight = ${Number(draft.heroImage.height || 1024)}
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = ${quote(draft.sourceNote)}
const gmSources = ${js(publicSources(draft.sources))}
// guide-manager:data:end`;
}

function guideComponent() {
  return `<GuideArticleView
    :category="gmArticleCategory"
    :keyword="gmArticleKeyword"
    :inquiry-type="gmInquiryType"
    :inquiry-topic="gmInquiryTopic"
    :title="gmArticleTitle"
    :lead="gmArticleLead"
    :published-at="publishedAt"
    :updated-at="updatedAt || undefined"
    :hero-image="ogImage"
    :hero-alt="gmHeroAlt"
    :hero-caption="gmHeroCaption"
    :hero-width="gmHeroWidth"
    :hero-height="gmHeroHeight"
    :reviewed-by="gmReviewedBy"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />`;
}

function renderNewGuide(draft) {
  const pagePath = `/guide/${draft.slug}`;
  const pageTitle = `${draft.title} | 귀족`;
  const faq = draft.faqItems;
  return `<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = ${quote(pagePath)}
const pageTitle = ${quote(pageTitle)}
const pageDescription = ${quote(draft.description)}
const ogImage = \`\${siteConfig.url}${draft.heroImage.path}\`
const publishedAt = ${quote(draft.publishedAt)}
const updatedAt = ${quote(draft.updatedAt || '')}
const faqItems = ${js(faq)}
const quickAnswers = ${js(draft.quickAnswers)}
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = ${js(sectionData(draft.sections))}
const cautions = ${js(draft.cautions)}
const relatedLinks = ${js(draft.relatedLinks)}
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [\`\${siteConfig.url}\${image.src}\`] : [])]

${managedDataBlock(draft)}

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: \`\${siteConfig.url}\${pagePath}\` }],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: \`\${siteConfig.url}\${pagePath}\` },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: ogImage },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '귀금속 가이드', path: '/guide' },
        { name: gmArticleTitle, path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: articleImages,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        mainEntityOfPage: \`\${siteConfig.url}\${pagePath}\`,
        author: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: siteConfig.name, url: siteConfig.url },
        reviewedBy: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: gmReviewedBy, url: siteConfig.url },
        publisher: {
          '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: siteConfig.name, url: siteConfig.url,
          logo: { '@type': 'ImageObject', url: siteConfig.url + '/favicon.svg' },
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }),
    },
  ],
})
</script>

<template>
  ${guideComponent()}
</template>
`;
}

function replaceConstString(source, name, value) {
  const expression = constExpression(source, name);
  const declaration = new RegExp(`const\\s+${name}(?:\\s*:[^=]+)?\\s*=\\s*`).exec(source);
  if (expression && declaration) {
    const start = declaration.index + declaration[0].length;
    return source.slice(0, start) + quote(value) + source.slice(start + expression.length);
  }
  const insertion = source.indexOf('useHead(');
  if (insertion < 0) throw new Error(`${name} 상수를 추가할 위치를 찾지 못했습니다`);
  return `${source.slice(0, insertion)}const ${name} = ${quote(value)}\n${source.slice(insertion)}`;
}

function replaceConstArray(source, name, value) {
  const marker = `const ${name}`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`${name} 배열을 찾지 못했습니다`);
  const equals = source.indexOf('=', start);
  const open = source.indexOf('[', equals);
  let depth = 0;
  let quoteChar = null;
  let escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    if (quoteChar) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quoteChar) quoteChar = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { quoteChar = ch; continue; }
    if (ch === '[') depth++;
    if (ch === ']') {
      depth--;
      if (depth === 0) return `${source.slice(0, open)}${js(value)}${source.slice(i + 1)}`;
    }
  }
  throw new Error(`${name} 배열 끝을 찾지 못했습니다`);
}

function replaceOrInsertConstArray(source, name, value) {
  if (source.includes(`const ${name}`)) return replaceConstArray(source, name, value);
  const insertion = source.indexOf('useHead(');
  if (insertion < 0) throw new Error(`${name} 배열을 추가할 위치를 찾지 못했습니다`);
  return `${source.slice(0, insertion)}const ${name} = ${js(value)}\n\n${source.slice(insertion)}`;
}

function replaceManagedData(source, draft) {
  const block = managedDataBlock(draft);
  const re = /\/\/ guide-manager:data:start[\s\S]*?\/\/ guide-manager:data:end/;
  if (re.test(source)) return source.replace(re, block);
  const useHeadIndex = source.indexOf('useHead(');
  if (useHeadIndex < 0) throw new Error('useHead 위치를 찾지 못했습니다');
  return `${source.slice(0, useHeadIndex)}${block}\n\n${source.slice(useHeadIndex)}`;
}

function replaceGuideComponent(source) {
  const start = source.indexOf('<GuideArticleView');
  if (start < 0) throw new Error('GuideArticleView를 찾지 못했습니다');
  let quoteChar = null;
  let escaped = false;
  for (let i = start; i < source.length - 1; i++) {
    const ch = source[i];
    if (quoteChar) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quoteChar) quoteChar = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { quoteChar = ch; continue; }
    if (ch === '/' && source[i + 1] === '>') return `${source.slice(0, start)}${guideComponent()}${source.slice(i + 2)}`;
  }
  throw new Error('GuideArticleView 닫힘을 찾지 못했습니다');
}

function bindGuideProperty(source, property, variable) {
  const start = source.indexOf('<GuideArticleView');
  if (start < 0) throw new Error('GuideArticleView를 찾지 못했습니다');
  const prefix = source.slice(0, start);
  let template = source.slice(start);
  const re = new RegExp(`\\s+:?${property}\\s*=\\s*(["'])([\\s\\S]*?)\\1`);
  const binding = `\n    :${property}="${variable}"`;
  template = re.test(template) ? template.replace(re, binding) : template.replace('<GuideArticleView', `<GuideArticleView${binding}`);
  return prefix + template;
}

function patchScopedGuide(source, draft, policy) {
  const fields = new Set(policy.scope.fields);
  let next = source;
  const strings = [
    ['title', 'gmArticleTitle', 'title'], ['lead', 'gmArticleLead', 'lead'],
    ['sourceNote', 'gmSourceNote', 'source-note'],
  ];
  for (const [field, variable, property] of strings) {
    if (!fields.has(field)) continue;
    next = replaceConstString(next, variable, draft[field]);
    next = bindGuideProperty(next, property, variable);
  }
  if (fields.has('title')) next = replaceConstString(next, 'pageTitle', `${draft.title} | 귀족`);
  if (fields.has('description')) next = replaceConstString(next, 'pageDescription', draft.description);
  for (const [field, property] of [['quickAnswers', 'quick-answers'], ['sections', 'sections'], ['cautions', 'cautions'], ['faqItems', 'faq-items'], ['relatedLinks', 'related-links'], ['sources', 'sources']]) {
    if (!fields.has(field)) continue;
    const variable = field === 'sources' ? 'gmSources' : field;
    const value = field === 'sections' ? sectionData(draft.sections) : field === 'sources' ? publicSources(draft.sources) : draft[field];
    next = replaceOrInsertConstArray(next, variable, value);
    next = bindGuideProperty(next, property, variable);
  }
  if (!policy.scope.preserveImages && fields.has('heroImage')) {
    next = next.replace(/const\s+ogImage\s*=\s*[^\r\n]+/, `const ogImage = \`\${siteConfig.url}${draft.heroImage.path}\``);
    next = replaceConstString(next, 'gmHeroAlt', draft.heroImage.alt);
    next = replaceConstString(next, 'gmHeroCaption', draft.heroImage.caption || '');
    next = bindGuideProperty(next, 'hero-alt', 'gmHeroAlt');
    next = bindGuideProperty(next, 'hero-caption', 'gmHeroCaption');
  }
  next = replaceConstString(next, 'updatedAt', draft.updatedAt || koreaDate());
  next = bindGuideProperty(next, 'updated-at', 'updatedAt || undefined');
  next = next.replace(/dateModified:\s*publishedAt/g, 'dateModified: updatedAt || publishedAt');
  return next;
}

function patchExistingGuide(source, draft, { policy = null } = {}) {
  if (/#hero-summary|GoldWeightCalculator/.test(source)) throw new Error('커스텀 가이드는 자동 수정할 수 없습니다');
  if (policy?.scope) return patchScopedGuide(source, draft, policy);
  let next = source.replace(/\/\/ guide-manager:data:start[\s\S]*?\/\/ guide-manager:data:end\s*/, '');
  next = replaceConstString(next, 'pageTitle', `${draft.title} | 귀족`);
  next = replaceConstString(next, 'pageDescription', draft.description);
  next = replaceConstString(next, 'publishedAt', draft.publishedAt);
  next = replaceConstString(next, 'updatedAt', draft.updatedAt || koreaDate());
  next = next.replace(/const\s+ogImage\s*=\s*[^\r\n]+/, `const ogImage = \`\${siteConfig.url}${draft.heroImage.path}\``);
  next = replaceOrInsertConstArray(next, 'faqItems', draft.faqItems);
  next = replaceOrInsertConstArray(next, 'quickAnswers', draft.quickAnswers);
  next = replaceOrInsertConstArray(next, 'sections', sectionData(draft.sections));
  next = replaceOrInsertConstArray(next, 'cautions', draft.cautions);
  next = replaceOrInsertConstArray(next, 'relatedLinks', draft.relatedLinks);
  if (!next.includes('const articleImages')) {
    const insertion = next.indexOf('useHead(');
    next = `${next.slice(0, insertion)}const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [\`\${siteConfig.url}\${image.src}\`] : [])]\n\n${next.slice(insertion)}`;
  }
  next = replaceManagedData(next, draft);
  next = replaceGuideComponent(next);
  next = next.replace(/dateModified:\s*publishedAt/g, 'dateModified: updatedAt || publishedAt');
  next = next.replace(/image:\s*ogImage,/g, 'image: articleImages,');
  next = next.replace(/author:\s*\{[^\r\n]+\},/g, "author: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url },");
  next = next.replace(/publisher:\s*\{[^\r\n]+\},/g, "publisher: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/favicon.svg` } },");
  if (!next.includes('reviewedBy:')) next = next.replace(/(author:\s*\{[^\r\n]+\},)/, `$1\n        reviewedBy: { '@type': 'Organization', '@id': \`\${siteConfig.url}/#organization\`, name: gmReviewedBy, url: siteConfig.url },`);
  return next;
}

function renderGuideSummary(draft) {
  const updated = draft.updatedAt ? `\n    updatedAt: ${quote(draft.updatedAt)},` : '';
  return `{
    slug: ${quote(draft.slug)},
    path: ${quote(`/guide/${draft.slug}`)},
    title: ${quote(draft.title)},
    description: ${quote(draft.description)},
    keyword: ${quote(draft.keyword)},
    image: ${quote(draft.heroImage.path)},
    publishedAt: ${quote(draft.publishedAt)},${updated}
    category: ${quote(draft.category)},
  }`;
}

function patchGuideIndex(source, draft, { isNew }) {
  const blocks = extractObjectBlocks(source);
  const existing = blocks.find((block) => new RegExp(`\\bslug\\s*:\\s*'${draft.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`).test(block.text));
  const summary = renderGuideSummary(draft);
  if (existing) return `${source.slice(0, existing.start)}${summary}${source.slice(existing.end)}`;
  if (!isNew) throw new Error(`guide-posts.ts에서 ${draft.slug} 항목을 찾지 못했습니다`);
  const marker = 'export const guidePosts';
  const markerIndex = source.indexOf(marker);
  const assignmentIndex = markerIndex >= 0 ? source.indexOf('=', markerIndex + marker.length) : -1;
  const arrayStart = assignmentIndex >= 0 ? source.indexOf('[', assignmentIndex + 1) : -1;
  if (arrayStart < 0) throw new Error('guidePosts 배열을 찾지 못했습니다');
  return `${source.slice(0, arrayStart + 1)}\n  ${summary.replace(/\n/g, '\n  ')},${source.slice(arrayStart + 1)}`;
}

module.exports = { renderNewGuide, patchExistingGuide, renderGuideSummary, patchGuideIndex, managedDataBlock, guideComponent };
