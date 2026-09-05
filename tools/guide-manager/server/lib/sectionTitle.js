const SECTION_NUMBER_PREFIX = /^\s*(?:\d{1,2}\s*[.)．:：-]\s+|[①-⑳]\s*)/u;

function stripSectionNumbering(value) {
  return String(value || '').replace(SECTION_NUMBER_PREFIX, '').trim();
}

function hasSectionNumbering(value) {
  return SECTION_NUMBER_PREFIX.test(String(value || ''));
}

function stripDraftSectionNumbering(draft) {
  if (!draft || typeof draft !== 'object') return draft;
  return {
    ...draft,
    sections: (draft.sections || []).map((section) => ({
      ...section,
      title: stripSectionNumbering(section.title),
    })),
  };
}

module.exports = { stripSectionNumbering, hasSectionNumbering, stripDraftSectionNumbering };
