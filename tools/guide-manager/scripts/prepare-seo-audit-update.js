const audits = require('../server/services/contentAuditService');
const generations = require('../server/services/generationService');
const inventory = require('../server/services/inventoryService');
const { validateEvidence, schemaErrors } = require('../server/services/draftSchema');
const { nowIso } = require('../server/lib/utils');

const configs = {
  'cubic-moissanite-diamond-difference': {
    businessFacts: '가격, 재판매 가치, 재고와 특정 제품의 감정 문서 제공 여부는 제품 상담에서 확인한다.',
    summary: '큐빅 지르코니아와 합성 모이사나이트는 다이아몬드 모조석으로 사용될 수 있지만 다이아몬드와 화학적·물리적 특성이 다른 별도 재료다.',
    sources: [
      ['GIA Gem Imitation', 'https://www.gia.edu/gem-imitation', 'gia.edu', '다이아몬드 모조석의 정의와 큐빅 지르코니아·합성 모이사나이트의 구분을 설명합니다.'],
      ['GIA An Introduction to Synthetic Gem Materials', 'https://www.gia.edu/gem-synthetic', 'gia.edu', '합성 보석과 천연 보석이 화학적·물리적·광학적 특성을 공유한다는 정의를 설명합니다.'],
    ],
    claims: [
      ['큐빅 지르코니아와 합성 모이사나이트는 다이아몬드처럼 보이도록 쓰일 수 있지만 다이아몬드와 다른 재료다.', [0], 'high'],
      ['합성 보석은 모조석과 달리 대응하는 천연 보석과 본질적인 화학적·물리적·광학적 특성을 공유한다.', [1], 'high'],
    ],
  },
  'baby-ring-engraving-cost': {
    businessFacts: '귀족의 돌반지 각인 비용과 가능 범위는 제품 폭·표면·문구·작업 방식 확인 후 전화 또는 카카오톡 상담에서 안내한다. 확정되지 않은 가격은 본문에 쓰지 않는다.',
    summary: '각인은 제품의 형태와 소재, 선택한 방식에 따라 가능한 범위가 달라질 수 있으므로 문구·위치·방식과 수령 희망일을 제품별로 확인해야 한다.',
    sources: [
      ['Tiffany & Co. Engraving FAQ', 'https://www.tiffany.com/faq/engraving-faq/', 'tiffany.com', '각인 가능한 제품과 방식, 위치, 비용과 기간을 제품·서비스별로 확인하도록 구성된 공식 안내입니다.'],
      ['Tiffany & Co. Personalization', 'https://www.tiffany.com/client-services/personalization.html', 'tiffany.com', '제품 형태와 소재에 따라 맞춤 가능 여부가 달라지고 일부 요청은 상담이 필요하다는 제조사 안내입니다.'],
    ],
    claims: [
      ['각인 가능 여부와 방식은 제품별 조건에 따라 달라질 수 있다.', [0, 1], 'high'],
      ['기계 각인과 손 각인은 서로 다른 작업 방식이며 맞춤 요청은 별도 상담이 필요할 수 있다.', [0], 'high'],
    ],
  },
  'diamond-clarity-grades': {
    businessFacts: '특정 다이아몬드의 등급과 감정 문서 제공 여부는 실물과 문서를 확인한 뒤 상담한다.',
    summary: 'GIA 투명도 등급은 10배 확대에서 내포물과 표면 특징을 평가해 FL부터 I3까지 11개 등급으로 구분하며 위치·크기·수·성격·색 또는 선명도를 함께 본다.',
    sources: [
      ['GIA Diamond Clarity', 'https://www.gia.edu/4cs-clarity', 'gia.edu', '다이아몬드 투명도 11개 등급과 10배 확대 평가 기준을 설명합니다.'],
      ['GIA Diamond Quality Factors', 'https://www.gia.edu/diamond-quality-factor', 'gia.edu', '투명도 특징의 크기·수·위치·성격·색 또는 선명도 등 평가 요인을 설명합니다.'],
    ],
    claims: [
      ['GIA 투명도 척도는 FL, IF, VVS1·VVS2, VS1·VS2, SI1·SI2, I1·I2·I3의 11개 등급이다.', [0], 'high'],
      ['투명도 평가는 10배 확대에서 특징의 크기·수·위치·성격·색 또는 선명도 등을 함께 고려한다.', [0, 1], 'high'],
    ],
  },
  'ring-finger-meaning-guide': {
    businessFacts: '귀족은 손가락 의미를 규칙으로 강요하지 않으며 착용감과 개인 선택을 우선해 상담한다.',
    summary: '약혼반지와 결혼반지를 왼손 네 번째 손가락에 착용하는 전통이 널리 알려져 있지만 문화와 개인 선택에 따라 방식은 달라질 수 있다.',
    sources: [
      ['GIA How to Wear an Engagement Ring and Wedding Band', 'https://4cs.gia.edu/en-us/blog/how-to-wear-engagement-ring-wedding-band/', 'gia.edu', '왼손 네 번째 손가락 전통과 문화·개인 선택에 따른 착용 방식의 차이를 설명합니다.'],
    ],
    claims: [
      ['약혼반지와 결혼반지를 왼손 네 번째 손가락에 끼는 방식은 널리 알려진 전통이다.', [0], 'high'],
      ['반지 착용 순서와 손은 문화와 개인의 편안함 및 선택에 따라 달라질 수 있다.', [0], 'high'],
    ],
  },
  'diamond-ring-setting-types': {
    businessFacts: '특정 스톤과 세팅의 제작 가능 여부, 가격과 기간은 제품 사양을 확인한 뒤 상담한다.',
    summary: '프롱·베젤·파베·채널 등 세팅은 스톤을 잡는 구조와 표면 노출, 관리 확인 항목이 다르므로 명칭보다 실제 구조를 비교해야 한다.',
    sources: [
      ['GIA Guide to Ring Settings', 'https://4cs.gia.edu/en-us/blog/guide-to-ring-settings/', 'gia.edu', '프롱·베젤·파베·채널 등 대표 반지 세팅의 구조와 특징을 설명합니다.'],
      ['Jewelers of America Ring Styles', 'https://www.jewelers.org/buying-jewelry/jewelry-styles/rings', 'jewelers.org', '반지 스타일과 세팅을 제품 선택 관점에서 설명하는 업계 협회 자료입니다.'],
    ],
    claims: [
      ['프롱 세팅은 금속 발로 스톤을 잡고 베젤 세팅은 금속 테두리가 스톤 둘레를 감싸는 구조다.', [0], 'high'],
      ['파베와 채널은 여러 작은 스톤을 배치하는 방식이지만 고정 구조와 표면 형태가 다르다.', [0, 1], 'high'],
    ],
  },
  'baby-ring-production-time': {
    businessFacts: '귀족의 모든 주문제작 제품은 최소 2주가 필요하다. 돌반지도 최소 2주이며 정확한 수령 가능일은 디자인·각인·주문 확정일을 확인한 뒤 전화 또는 카카오톡 상담으로 안내한다. 14K·18K 등 소재 사양은 상세 상담이 필요하다.',
    summary: '주문제작 장신구는 설계·제작·세팅·마감 등 여러 단계를 거칠 수 있으므로 귀족의 최소 2주 원칙을 기준으로 행사일에서 역산하고 확정 수령일을 상담해야 한다.',
    sources: [
      ['Jewelers of America Bench and Manufacturing Jeweler', 'https://www.jewelers.org/jewelry-careers/career-pathways/bench-manufacturing-jeweler', 'jewelers.org', '주문제작 장신구에 설계·가공·주조·세팅·연마 등 여러 제작 작업이 포함될 수 있음을 설명합니다.'],
    ],
    claims: [
      ['주문제작 장신구는 설계, 가공, 주조, 세팅, 연마 등 여러 단계와 기술을 포함할 수 있다.', [0], 'high'],
    ],
  },
  'necklace-untangling-guide': {
    businessFacts: '심하게 엉켰거나 체인 변형·잠금장치 손상이 보이면 억지로 당기지 말고 실물 상담으로 확인한다.',
    summary: '목걸이는 서로 분리해 보관하면 엉킴과 걸림을 줄일 수 있고, 이미 엉킨 체인은 당기기보다 평평한 곳에서 매듭 중심의 여유를 조금씩 만들어야 한다.',
    sources: [
      ['Tiffany & Co. How to Store Jewelry', 'https://www.tiffany.com/faq/care-and-repair-faq/how-to-store-jewelry/', 'tiffany.com', '장신구를 서로 분리해 보관해 엉킴과 걸림을 줄이도록 안내합니다.'],
      ['Tiffany & Co. Jewelry Care', 'https://www.tiffany.com/care-and-repair/jewelry-care.html', 'tiffany.com', '장신구를 다룰 때 제품 상태와 소재에 맞는 주의가 필요하다는 제조사 관리 안내입니다.'],
    ],
    claims: [
      ['목걸이를 다른 장신구와 분리해 보관하면 엉킴과 걸림을 줄이는 데 도움이 된다.', [0], 'high'],
      ['장신구 관리 방법은 소재와 제품 상태를 고려해야 한다.', [1], 'high'],
    ],
  },
  'opal-types-guide': {
    businessFacts: '오팔의 종류·처리 여부와 천연 여부는 이름이나 사진만으로 확정하지 않고 제품 설명 또는 감별 문서를 확인한다.',
    summary: '블랙·화이트·볼더·파이어 오팔은 바탕색, 모암 포함 여부, 투명도와 유색 효과 표현이 다르며 이름만으로 품질이나 천연 여부를 확정할 수 없다.',
    sources: [
      ['GIA Opal Quality Factors', 'https://www.gia.edu/articles/opal-quality-factor', 'gia.edu', '오팔의 바탕색·유색 효과·무늬·투명도 등 품질 관찰 기준을 설명합니다.'],
      ['GIA Opal Buyer Guide', 'https://www.gia.edu/gia-website/opal/buyers-guide', 'gia.edu', '오팔 종류와 외관을 비교하고 처리·조립석 여부를 확인해야 함을 안내합니다.'],
    ],
    claims: [
      ['오팔은 바탕색, 유색 효과, 무늬, 투명도 등 여러 외관 요소를 함께 관찰한다.', [0], 'high'],
      ['오팔의 이름이나 사진만으로 처리 여부와 조립석 여부를 확정할 수 없으므로 판매 정보와 문서를 확인해야 한다.', [1], 'high'],
    ],
  },
  'wedding-band-guard-ring-guide': {
    businessFacts: '가드링 제작 가능 여부와 소재·사이즈·기간·가격은 메인 반지 실물과 희망 조합을 확인한 뒤 상담한다.',
    summary: '가드링은 메인 반지와 함께 착용할 때 곡률·세팅 높이·접촉 위치·전체 폭과 호수를 실제 조합으로 확인해야 한다.',
    sources: [
      ['GIA How to Wear an Engagement Ring and Wedding Band', 'https://4cs.gia.edu/en-us/blog/how-to-wear-engagement-ring-wedding-band/', 'gia.edu', '약혼반지와 웨딩밴드를 함께 착용할 때 조합과 개인 선택을 설명합니다.'],
      ['Jewelers of America Ring Styles', 'https://www.jewelers.org/buying-jewelry/jewelry-styles/rings', 'jewelers.org', '반지 구조와 스타일을 비교하는 업계 협회 자료입니다.'],
    ],
    claims: [
      ['약혼반지와 웨딩밴드를 함께 착용하는 방식은 조합과 개인의 편안함에 따라 달라질 수 있다.', [0], 'high'],
      ['반지는 세팅과 형태가 다양하므로 실제 구조를 기준으로 조합을 확인해야 한다.', [1], 'high'],
    ],
  },
  'ring-metal-allergy-guide': {
    businessFacts: '귀족은 제품의 K수, 확인 가능한 합금 구성과 도금 사양을 안내할 수 있지만 피부 질환을 진단하거나 증상 개선을 보장하지 않는다.',
    summary: '니켈은 알레르기성 접촉피부염의 흔한 원인이며 착용 부위에 반응이 생기면 원인 제품을 피하고 증상이 지속되거나 심하면 피부과 진료를 받아야 한다.',
    sources: [
      ['American Academy of Dermatology Nickel Allergy', 'https://www.aad.org/public/diseases/eczema/insider/nickel-allergy', 'aad.org', '니켈 알레르기의 원인, 흔한 노출 제품과 회피 원칙을 설명합니다.'],
      ['American Academy of Dermatology Contact Dermatitis', 'https://www.aad.org/public/everyday-care/itchy-skin/rash/itchy-rash-contact-dermatitis', 'aad.org', '접촉피부염이 의심될 때 원인 접촉을 피하고 지속되는 증상은 피부과 진료를 받도록 안내합니다.'],
    ],
    claims: [
      ['니켈은 알레르기성 접촉피부염을 일으킬 수 있으며 장신구가 흔한 노출원 중 하나다.', [0], 'high'],
      ['가려움이나 발진이 생기면 의심 제품과의 접촉을 피하고 증상이 지속되거나 심하면 피부과 전문의와 상담해야 한다.', [0, 1], 'high'],
    ],
  },
};

function evidenceFor(slug, config) {
  const sources = config.sources.map(([label, url, domain, reason]) => ({
    label, url, domain, reason, official: generations.officialDomain(url), selected: false,
  }));
  const claims = config.claims.map(([claim, indexes, confidence]) => ({
    claim, sourceUrls: indexes.map((index) => sources[index].url), confidence,
  }));
  return { topic: slug, summary: config.summary, sources, claims };
}

async function main() {
  const slug = process.argv[2];
  const config = configs[slug];
  if (!config) throw new Error(`지원하지 않는 작업입니다: ${slug || '(slug 없음)'}`);

  const evidence = evidenceFor(slug, config);
  if (!validateEvidence(evidence)) throw new Error(schemaErrors(validateEvidence).join('; '));
  if (!evidence.sources.every((source) => source.official)) throw new Error('권위 출처 판정에 실패한 URL이 있습니다.');

  const generation = audits.createUpdate(slug);
  generations.updateGeneration(generation.id, {
    input_json: JSON.stringify({ ...generation.input, businessFacts: config.businessFacts }),
    research_json: JSON.stringify({ official: evidence, researchedAt: nowIso(), provenance: 'manual-primary-source-review-2026-08-25' }),
    status: 'researched',
    error: null,
  });
  generations.selectSources(generation.id, evidence.sources.map((source) => source.url));
  let prepared = await generations.generateDraft(generation.id, { forceModel: 'gpt-5.6-terra' });

  const current = inventory.getGuide(slug);
  const draft = structuredClone(prepared.draft);
  draft.heroImage = { ...draft.heroImage, path: current.image };
  draft.sections = draft.sections.map((section) => ({ ...section, image: null }));
  prepared = generations.saveDraft(generation.id, draft);

  console.log(JSON.stringify({
    id: prepared.id,
    slug,
    status: prepared.status,
    title: prepared.draft.title,
    description: prepared.draft.description,
    lintBlocking: prepared.lint.blocking,
    findings: prepared.lint.findings,
    modelRuns: prepared.modelRuns,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
