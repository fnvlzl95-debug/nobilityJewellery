const fs = require('fs');

const OFFICIAL_DOMAINS = ['gia.edu', 'igi.org', 'cibjo.org', 'iso.org', 'ftc.go.kr', 'kats.go.kr', 'law.go.kr', 'krx.co.kr'];

function decodeString(raw, quote) {
  let value = '';
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] !== '\\') { value += raw[i]; continue; }
    const next = raw[++i];
    if (next === undefined) break;
    const escapes = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' };
    if (next === 'u' && /^[0-9a-fA-F]{4}$/.test(raw.slice(i + 1, i + 5))) {
      value += String.fromCharCode(parseInt(raw.slice(i + 1, i + 5), 16)); i += 4;
    } else if (next === 'x' && /^[0-9a-fA-F]{2}$/.test(raw.slice(i + 1, i + 3))) {
      value += String.fromCharCode(parseInt(raw.slice(i + 1, i + 3), 16)); i += 2;
    } else value += escapes[next] ?? (next === quote ? quote : next);
  }
  return value;
}

class LiteralParser {
  constructor(source) { this.source = String(source || ''); this.index = 0; }

  skip() {
    while (this.index < this.source.length) {
      if (/\s/.test(this.source[this.index])) { this.index++; continue; }
      if (this.source.startsWith('//', this.index)) {
        this.index = this.source.indexOf('\n', this.index + 2);
        if (this.index < 0) this.index = this.source.length;
        continue;
      }
      if (this.source.startsWith('/*', this.index)) {
        const end = this.source.indexOf('*/', this.index + 2);
        this.index = end < 0 ? this.source.length : end + 2;
        continue;
      }
      break;
    }
  }

  string() {
    const quote = this.source[this.index++];
    const start = this.index;
    let escaped = false;
    let raw = '';
    for (; this.index < this.source.length; this.index++) {
      const ch = this.source[this.index];
      if (!escaped && ch === quote) {
        this.index++;
        if (quote === '`' && /\$\{/.test(raw)) throw new Error('템플릿 표현식은 데이터 리터럴로 처리하지 않습니다');
        return decodeString(raw, quote);
      }
      raw += ch;
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
    }
    this.index = start;
    throw new Error('문자열 닫힘을 찾지 못했습니다');
  }

  identifier() {
    const match = this.source.slice(this.index).match(/^[A-Za-z_$][\w$-]*/);
    if (!match) throw new Error(`식별자를 읽을 수 없습니다: ${this.source.slice(this.index, this.index + 20)}`);
    this.index += match[0].length;
    return match[0];
  }

  number() {
    const match = this.source.slice(this.index).match(/^-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i);
    if (!match) throw new Error('숫자를 읽을 수 없습니다');
    this.index += match[0].length;
    return Number(match[0]);
  }

  array() {
    const result = [];
    this.index++;
    while (this.index < this.source.length) {
      this.skip();
      if (this.source[this.index] === ']') { this.index++; return result; }
      result.push(this.value());
      this.skip();
      if (this.source[this.index] === ',') { this.index++; continue; }
      if (this.source[this.index] !== ']') throw new Error('배열 구분자가 올바르지 않습니다');
    }
    throw new Error('배열 닫힘을 찾지 못했습니다');
  }

  object() {
    const result = {};
    this.index++;
    while (this.index < this.source.length) {
      this.skip();
      if (this.source[this.index] === '}') { this.index++; return result; }
      const key = ['\'', '"', '`'].includes(this.source[this.index]) ? this.string() : this.identifier();
      this.skip();
      if (this.source[this.index++] !== ':') throw new Error('객체 속성의 콜론을 찾지 못했습니다');
      result[key] = this.value();
      this.skip();
      if (this.source[this.index] === ',') { this.index++; continue; }
      if (this.source[this.index] !== '}') throw new Error('객체 구분자가 올바르지 않습니다');
    }
    throw new Error('객체 닫힘을 찾지 못했습니다');
  }

  value() {
    this.skip();
    const ch = this.source[this.index];
    if (['\'', '"', '`'].includes(ch)) return this.string();
    if (ch === '[') return this.array();
    if (ch === '{') return this.object();
    if (ch === '-' || /\d/.test(ch)) return this.number();
    const id = this.identifier();
    if (id === 'true') return true;
    if (id === 'false') return false;
    if (id === 'null' || id === 'undefined') return null;
    throw new Error(`동적 식별자 ${id}는 데이터 리터럴로 처리하지 않습니다`);
  }

  parse() {
    const result = this.value();
    this.skip();
    return result;
  }
}

function parseLiteral(source, fallback = null) {
  try { return new LiteralParser(source).parse(); }
  catch (_) { return fallback; }
}

function balancedExpression(source, start) {
  const pairs = { '[': ']', '{': '}', '(': ')' };
  if (!pairs[source[start]]) return '';
  const stack = [];
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let i = start; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];
    if (lineComment) { if (ch === '\n') lineComment = false; continue; }
    if (blockComment) { if (ch === '*' && next === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
    if (['\'', '"', '`'].includes(ch)) { quote = ch; continue; }
    if (pairs[ch]) stack.push(pairs[ch]);
    else if (stack.at(-1) === ch) {
      stack.pop();
      if (!stack.length) return source.slice(start, i + 1);
    }
  }
  return '';
}

function constExpression(source, name) {
  const escaped = String(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`\\bconst\\s+${escaped}(?:\\s*:[^=]+)?\\s*=`).exec(source);
  if (!match) return '';
  let index = match.index + match[0].length;
  while (/\s/.test(source[index])) index++;
  if (['[', '{', '('].includes(source[index])) return balancedExpression(source, index);
  if (['\'', '"', '`'].includes(source[index])) {
    const parser = new LiteralParser(source.slice(index));
    try { parser.value(); return source.slice(index, index + parser.index); } catch (_) { return ''; }
  }
  return '';
}

function boundArray(source, name) {
  const kebab = String(name).replace(/[A-Z]/g, (value) => `-${value.toLowerCase()}`);
  const names = [...new Set([String(name), kebab])].map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const match = new RegExp(`:(?:${names.join('|')})\\s*=\\s*["']`).exec(source);
  if (!match) return '';
  const open = source.indexOf('[', match.index + match[0].length);
  return open < 0 ? '' : balancedExpression(source, open);
}

function dataArray(source, name) {
  const expression = constExpression(source, name) || boundArray(source, name);
  const result = expression ? parseLiteral(expression, []) : [];
  return Array.isArray(result) ? result : [];
}

function stringConst(source, name) {
  const expression = constExpression(source, name);
  const value = expression ? parseLiteral(expression, '') : '';
  return typeof value === 'string' ? value : '';
}

function plainAttribute(source, name) {
  const kebab = String(name).replace(/[A-Z]/g, (value) => `-${value.toLowerCase()}`);
  const names = [...new Set([String(name), kebab])].map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const match = new RegExp(`(?:^|\\s)(?:${names.join('|')})\\s*=\\s*(["'])((?:\\.|(?!\\1)[\\s\\S])*?)\\1`).exec(source);
  return match ? decodeString(match[2], match[1]) : '';
}

function isOfficial(url) {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
    return /(?:\.go\.kr|\.gov|\.edu|\.ac\.kr)$/.test(host)
      || OFFICIAL_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
  } catch (_) { return false; }
}

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function extractGuideContent(guide, source = null) {
  const code = source == null && guide?.sourcePath && fs.existsSync(guide.sourcePath)
    ? fs.readFileSync(guide.sourcePath, 'utf8') : String(source || '');
  const sections = dataArray(code, 'sections').length ? dataArray(code, 'sections') : dataArray(code, 'gmSections');
  const quickAnswers = dataArray(code, 'quickAnswers');
  const cautions = dataArray(code, 'cautions');
  const faqItems = dataArray(code, 'faqItems');
  const relatedLinks = dataArray(code, 'relatedLinks');
  const rawSources = dataArray(code, 'gmSources').length ? dataArray(code, 'gmSources') : dataArray(code, 'sources');
  const title = stringConst(code, 'gmArticleTitle') || plainAttribute(code, 'title') || guide?.title || '';
  const lead = stringConst(code, 'gmArticleLead') || plainAttribute(code, 'lead');
  const keyword = stringConst(code, 'gmArticleKeyword') || plainAttribute(code, 'keyword') || guide?.keyword || '';
  const category = stringConst(code, 'gmArticleCategory') || plainAttribute(code, 'category') || guide?.category || '';
  const sources = rawSources.map((item) => ({
    label: cleanText(item?.label), url: cleanText(item?.url), note: cleanText(item?.note), official: item?.official === true || isOfficial(item?.url),
  })).filter((item) => item.url);
  const normalizedSections = sections.map((section) => ({
    title: cleanText(section?.title),
    paragraphs: Array.isArray(section?.paragraphs) ? section.paragraphs.map(cleanText).filter(Boolean) : [],
    bullets: Array.isArray(section?.bullets) ? section.bullets.map(cleanText).filter(Boolean) : [],
    hasImage: !!section?.image,
  })).filter((section) => section.title || section.paragraphs.length || section.bullets.length);
  const textParts = [title, lead, ...quickAnswers, ...normalizedSections.flatMap((section) => [section.title, ...section.paragraphs, ...section.bullets]), ...cautions,
    ...faqItems.flatMap((item) => [item?.question, item?.answer])].map(cleanText).filter(Boolean);
  const bodyText = textParts.join('\n');
  const pagePath = stringConst(code, 'pagePath');
  const pageTitle = stringConst(code, 'pageTitle') || guide?.pageTitle || '';
  const description = stringConst(code, 'pageDescription') || guide?.description || '';
  const canonicalDeclared = /rel\s*:\s*['"]canonical['"]/.test(code);
  const canonicalUsesPagePath = /href\s*:\s*`\$\{siteConfig\.url\}\$\{pagePath\}`/.test(code);
  const articleSchema = /['"]@type['"]\s*:\s*['"]Article['"]/.test(code);
  const faqSchema = /['"]@type['"]\s*:\s*['"]FAQPage['"]/.test(code);
  return {
    title: cleanText(title), pageTitle: cleanText(pageTitle), description: cleanText(description), lead: cleanText(lead),
    keyword: cleanText(keyword), category: cleanText(category), quickAnswers: quickAnswers.map(cleanText).filter(Boolean),
    sections: normalizedSections, cautions: cautions.map(cleanText).filter(Boolean),
    faqItems: faqItems.map((item) => ({ question: cleanText(item?.question), answer: cleanText(item?.answer) })).filter((item) => item.question),
    relatedLinks: relatedLinks.map((item) => ({ to: cleanText(item?.to), label: cleanText(item?.label), description: cleanText(item?.description) })).filter((item) => item.to),
    sources, sourceNote: stringConst(code, 'gmSourceNote'), bodyText: bodyText.slice(0, 24000),
    wordCount: bodyText ? bodyText.split(/\s+/).filter(Boolean).length : 0, characterCount: bodyText.length,
    structure: {
      sectionCount: normalizedSections.length, paragraphCount: normalizedSections.reduce((sum, item) => sum + item.paragraphs.length, 0),
      bulletCount: normalizedSections.reduce((sum, item) => sum + item.bullets.length, 0), quickAnswerCount: quickAnswers.length,
      faqCount: faqItems.length, cautionCount: cautions.length, relatedLinkCount: relatedLinks.length,
      sourceCount: sources.length, officialSourceCount: sources.filter((item) => item.official).length,
    },
    technical: {
      pagePath, pathMatches: pagePath === guide?.path, canonicalDeclared, canonicalUsesPagePath,
      selfCanonical: canonicalDeclared && canonicalUsesPagePath && pagePath === guide?.path,
      hasPageTitle: !!pageTitle, hasDescription: !!description, articleSchema, faqSchema,
    },
  };
}

module.exports = { LiteralParser, parseLiteral, balancedExpression, constExpression, boundArray, dataArray, extractGuideContent, isOfficial };
