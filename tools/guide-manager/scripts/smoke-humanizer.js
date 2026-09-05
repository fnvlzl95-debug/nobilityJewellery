const { db } = require('../server/lib/db');
const settings = require('../server/services/settingsService');
const inventory = require('../server/services/inventoryService');
const generations = require('../server/services/generationService');
const humanizer = require('../server/services/humanizerService');
const { makeDraft } = require('../test/fixture');

async function main() {
  settings.importReferenceCredentials();
  inventory.scanInventory();
  const created = generations.createGeneration({ topic: 'Humanizer V9 로컬 연동 점검', slug: 'humanizer-v9-local-smoke', category: '관리' });
  try {
    const draft = makeDraft({
      slug: 'humanizer-v9-local-smoke',
      keyword: 'Humanizer V9 로컬 연동 점검',
      title: 'Humanizer V9 로컬 연동 점검용 임시 원고',
      lead: '이 문단은 Humanizer V9 연동을 확인하기 위한 로컬 임시 원고입니다. 14K 반지의 표기와 3.75g이라는 수치, 2026-08-05 검토일, https://www.gia.edu/example 출처 주소가 바뀌지 않는지 확인합니다. 실제 게시용 문장이 아니며 귀족 저장소에는 반영하지 않습니다. 문장 연결과 호흡만 자연스럽게 다듬고 제품의 가격, 제작 기간, 수리 가능성을 새로 단정하지 않아야 합니다. 처리 결과는 보호 사실 목록과 문단 수를 다시 대조한 뒤 테스트 작업과 함께 삭제합니다.',
      sections: [
        { title: '첫 번째 설명 문단', paragraphs: ['제품 상담에서는 사진으로 확인할 수 있는 표면 상태와 실물에서만 판단할 수 있는 구조를 나누어 설명해야 합니다. 사진만으로 가격과 기간을 확정하지 않고, 제품이 매장에 도착한 뒤 소재와 세팅, 변형 여부를 차례로 살펴본다는 조건을 유지합니다. 이 문단은 표현을 자연스럽게 다듬을 수 있지만 새로운 비용이나 완료 날짜를 추가해서는 안 됩니다.'], bullets: [], image: null },
        { title: '두 번째 설명 문단', paragraphs: ['검토 과정에서는 원문에 있는 숫자와 단위, 소재 표기, 날짜와 URL을 잠그고 결과 문단 수가 그대로인지 확인합니다. 어투가 달라지더라도 정보 범위는 넓어지지 않아야 하며, 작업 가능 여부는 제품 상태에 따라 달라진다는 조건을 남겨야 합니다. 보호 검사에서 차이가 발견되면 자동으로 해당 문단을 원문으로 되돌리는 흐름을 시험합니다.'], bullets: [], image: null },
        { title: '세 번째 설명 문단', paragraphs: ['이 진단은 관리도구의 로컬 데이터베이스에 잠시 생성되며 귀족 웹사이트 파일, Git 이력, 배포 상태를 바꾸지 않습니다. Humanizer 처리와 사실 보존 검사가 끝나면 생성 작업과 세부 실행 이력을 외래키 연쇄 삭제로 정리합니다. 남는 것은 서버 로그의 성공 여부뿐이며 운영 원고 목록에는 테스트 항목이 나타나지 않아야 합니다.'], bullets: [], image: null },
      ],
    });
    generations.saveDraft(created.id, draft);
    const result = await humanizer.humanizeGeneration(created.id);
    const runs = result.humanizeRuns || [];
    console.log(JSON.stringify({ generationId: created.id, status: result.status, warnings: result.humanizeWarnings, runs: runs.map((run) => ({ status: run.status, version: run.engineVersion, factsPass: run.facts?.pass })) }, null, 2));
    if (!runs.length || runs.some((run) => !['done', 'reverted'].includes(run.status))) process.exitCode = 1;
  } finally {
    db.prepare('DELETE FROM generations WHERE id=?').run(created.id);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
