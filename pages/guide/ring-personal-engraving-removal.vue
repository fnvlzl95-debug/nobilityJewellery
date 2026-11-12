<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ring-personal-engraving-removal'
const pageTitle = '반지 각인 지우기, 깊이·두께부터 확인합니다 | 귀족'
const pageDescription = '반지 안쪽 개인 문구를 연마로 지우는 원리와 각인 깊이·밴드 두께·안쪽 장식을 먼저 보는 이유, 새 문구 위치를 정하는 기준과 상담 때 보낼 사진을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/ring-personal-engraving-removal-hero-bc17ed7b.webp`
const publishedAt = '2026-11-13'
const updatedAt = ''
const faqItems = [
  {
    "question": "반지 안쪽 각인을 완전히 지울 수 있나요?",
    "answer": "각인 깊이와 각인 자리 밴드 두께가 기준입니다. 글자가 얕고 밴드가 두꺼우면 주변을 글자 바닥 높이까지 갈아 낼 여유가 있고, 글자가 깊고 밴드가 얇으면 지우는 만큼 반지가 얇아집니다. 귀족은 반지 실물의 각인 깊이, 밴드 두께, 안쪽 장식과 보석 세팅을 확인한 뒤 가능 여부를 안내합니다."
  },
  {
    "question": "지운 자리에 바로 새 문구를 넣을 수 있나요?",
    "answer": "같은 자리에 넣으려면 지운 뒤 남은 두께에 새 글자의 깊이까지 더해서 봐야 합니다. 두께 여유가 적으면 다른 안쪽 면에 새 문구를 넣거나 기존 문구 옆에 추가하는 방법을 함께 비교합니다."
  },
  {
    "question": "사이즈 조절과 각인 수정을 같이 맡겨도 되나요?",
    "answer": "함께 맡길 수 있고, 오히려 한 번에 상담하는 편이 좋습니다. 사이즈 작업은 순도 각인이나 특별한 각인 자리를 피해 잡는 것이 권장되고, 작업 뒤 줄질과 연마로 표면을 정리하기 때문에 각인 위치와 작업 순서를 같이 정해야 같은 부위가 두 번 갈리지 않습니다."
  },
  {
    "question": "상담할 때 어떤 사진을 보내야 하나요?",
    "answer": "반지 전체 사진, 안쪽 각인을 가까이 찍은 사진, 반지를 세워 옆면 두께가 보이게 찍은 사진 세 가지를 카카오톡으로 보내 주세요. 원하는 작업, 새 문구 내용과 위치, 사이즈 변경 여부, 받고 싶은 날짜를 함께 적으면 바로 상담이 진행됩니다."
  },
  {
    "question": "작업 기간은 얼마나 걸리나요?",
    "answer": "기존 반지의 각인 지우기와 재각인 기간은 실물을 확인한 뒤 안내합니다. 반지 두께가 부족해 새 반지를 주문제작하는 쪽으로 정한다면 최소 3주가 필요하므로, 날짜가 정해진 경우에는 일정부터 먼저 알려 주세요."
  }
]
const quickAnswers = [
  "각인 지우기는 각인 깊이와 각인 자리 밴드 두께를 먼저 봅니다. 글자가 얕고 밴드가 두꺼우면 갈아 낼 여유가 있고, 글자가 깊고 밴드가 얇으면 여유가 줄어듭니다.",
  "새 문구를 같은 자리에 넣으려면 지운 뒤 남은 두께에 새 글자 깊이까지 감당해야 하므로, 지우기와 재각인은 하나의 계획으로 정합니다.",
  "귀족은 반지 전체, 안쪽 각인, 옆면 두께가 보이는 사진을 카카오톡으로 받아 상담을 시작하고, 작업 가능 여부와 기간은 실물을 확인한 뒤 안내합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "각인 지우기는 깊이와 밴드 두께로 먼저 판단합니다",
    "paragraphs": [
      "반지 안쪽 각인을 지울 수 있는지는 먼저 글자가 얼마나 깊게 파였는지와 그 자리 밴드가 얼마나 두꺼운지로 판단합니다. 각인은 금속 표면을 깎아 낸 자국이기 때문에, 연마로 지우려면 글자 바닥 높이까지 주변 금속을 함께 갈아 내야 합니다. 글자가 얕고 밴드가 두꺼우면 갈아 낼 여유가 있고, 글자가 깊고 밴드가 얇으면 같은 작업에도 남는 두께가 빠르게 줄어듭니다.",
      "두 번째로 보는 것은 각인 주변입니다. 안쪽 면에 무늬나 단차 같은 장식이 있거나 보석 세팅의 뒷부분이 안쪽으로 드러나 있으면, 각인 자리만 평평하게 갈아 내기 어려운 구간이 생깁니다. 글자와 장식이 가까울수록 연마 범위를 좁게 잡아야 하므로 결과 표면이 어떻게 이어질지도 함께 따져야 합니다.",
      "세 번째는 새 문구를 어디에 넣을지입니다. 같은 자리에 다시 새기려면 지운 뒤 남은 두께에 새 글자의 깊이까지 더해서 봐야 하고, 다른 자리에 넣는다면 기존 문구를 지우는 범위와 새 문구 자리가 겹치지 않는지 확인해야 합니다. 그래서 기존 문구를 지우는 일과 새 문구를 넣는 일은 따로 정하지 않고 한 번에 계획합니다.",
      "귀족은 각인을 지울 수 있는지와 새 문구를 넣을 수 있는지를 반지 실물의 각인 깊이, 밴드 두께, 안쪽 장식과 보석 세팅을 확인한 뒤 안내합니다. 사진으로 상담을 시작할 수 있지만 글자 홈의 깊이와 실제 두께는 사진만으로 정확히 재기 어렵기 때문에, 최종 판단은 실물을 보고 내립니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인 항목",
        "보는 부분",
        "판단에 주는 영향"
      ],
      "rows": [
        [
          "각인 깊이",
          "글자 바닥까지 파인 정도와 홈의 모양",
          "깊을수록 지울 때 갈아 내는 금속이 늘어납니다"
        ],
        [
          "밴드 두께",
          "각인 자리 옆면의 두께",
          "얇을수록 지운 뒤 남는 여유가 줄어듭니다"
        ],
        [
          "안쪽 장식",
          "안쪽 면의 무늬, 단차, 곡면",
          "평평하게 갈기 어려운 구간이 생깁니다"
        ],
        [
          "보석 세팅",
          "안쪽으로 드러난 세팅 뒷부분과 보석 위치",
          "연마 범위에서 피해야 할 부분이 생깁니다"
        ],
        [
          "순도 각인·상표",
          "기존 문구 옆의 순도 표기나 상표",
          "함께 지워지지 않도록 범위를 나눠야 합니다"
        ],
        [
          "새 문구 위치",
          "같은 자리 재각인인지 다른 자리인지",
          "같은 자리라면 남은 두께에 새 글자 깊이까지 더해 봅니다"
        ]
      ]
    }
  },
  {
    "title": "각인은 금속을 깎은 자국이라 지우면 금속이 줄어듭니다",
    "paragraphs": [
      "각인은 금속 위에 색을 올린 것이 아니라 표면을 깎아 낸 자국입니다. 손 각인은 날을 세운 조각정으로 금속을 밀어 깎으며 선을 만들고, 기계 각인은 회전하는 버가 선을 깎아 냅니다. 두 방식은 금속을 덜어 낸다는 점은 같지만 선의 단면과 모양이 서로 다릅니다.",
      "귀금속 표면 마감에서 흔히 쓰는 연마는 점점 고운 연마재로 표면을 갈아 낸 뒤 버프와 연마제로 다듬는 방식입니다. 금속공예 교육 자료에서도 귀금속을 연마할 때 재료 손실이 크다는 점을 문제로 꼽습니다. 각인을 연마로 지운다는 것은 결국 그 부위의 금속을 깎아 내는 작업이라는 뜻입니다.",
      "글자 하나만 깊게 파여 있어도 그 글자 바닥까지 주변을 낮춰야 하므로, 실제로 갈려 나가는 범위는 글자보다 넓어집니다. 지운 자리가 주변과 자연스럽게 이어지려면 경계를 완만하게 풀어 줘야 하고, 이 과정에서 연마 면적이 다시 늘어납니다. 그래서 지우기 판단은 글자 크기보다 가장 깊은 획을 기준으로 합니다.",
      "손 각인과 기계 각인은 홈의 모양이 다르기 때문에 같은 글자 수라도 지울 때 갈아 내야 하는 깊이가 다를 수 있습니다. 상담용 사진을 보낼 때 안쪽 글자를 비스듬한 빛에서 가까이 찍으면 홈의 모양과 깊이감이 잘 드러납니다. 정면에서 밝게만 찍은 사진은 글자가 얕아 보여 판단을 흐리게 만듭니다."
    ],
    "bullets": [],
    "image": {
      "src": "/Image/guide/ring-personal-engraving-removal-section-1-d316f31e.webp",
      "alt": "손으로 든 금 반지 밴드 바깥면을 회전하는 천 버프에 대고 연마하는 모습과 옆에 놓인 연마제 덩어리",
      "caption": "회전 버프와 연마제로 금 표면을 갈아 다듬는 공정이라 각인 자리를 지울 때도 그 부위 금속이 줄어듭니다.",
      "width": 1254,
      "height": 1254
    },
    "table": null
  },
  {
    "title": "밴드 두께와 안쪽 장식·보석 세팅을 함께 봅니다",
    "paragraphs": [
      "밴드 두께는 반지를 위에서 본 폭이 아니라 옆에서 본 금속의 높이, 즉 손가락에 닿는 안쪽 면부터 바깥 면까지의 두께를 말합니다. 각인을 지우면 이 두께가 각인 자리에서만 줄어들기 때문에, 상담 때 옆면 두께가 보이는 사진을 따로 요청합니다. 반지를 옆으로 세워 각인이 있는 쪽 단면이 보이게 찍으면 판단에 가장 도움이 됩니다.",
      "착용 기간이 긴 반지라면 처음 맞췄을 때의 두께가 아니라 지금의 두께를 기준으로 봐야 합니다. 바깥 면에 흠집을 정리하는 광택 작업을 여러 번 받은 반지는 그만큼 금속이 덜어져 있을 수 있으므로, 이전에 받은 광택 복원이나 사이즈 작업 이력이 있다면 상담 때 함께 알려 주세요.",
      "안쪽 면이 완전히 평평하지 않고 둥글게 굴려져 있거나 무늬, 단차, 홈 같은 장식이 들어간 반지는 각인 자리만 고르게 갈아 내기 어렵습니다. 장식을 살리려면 연마 범위를 좁게 잡아야 하고, 범위를 넓히면 장식 일부가 함께 흐려집니다. 이런 반지는 지우는 범위와 남길 장식을 먼저 정해야 작업 방향이 나옵니다.",
      "보석이 박힌 반지는 세팅 위치를 꼭 확인합니다. 보석을 받치는 발이나 세팅 뒷부분이 안쪽 면 가까이 드러나 있으면 그 주변은 연마 범위에서 피해야 하고, 보석이 이미 흔들린다면 각인 작업보다 세팅 점검이 먼저입니다. 큐빅이나 보석 빠짐이 의심되면 상담 때 그 부분 사진도 함께 보내 주세요."
    ],
    "bullets": [],
    "image": {
      "src": "/Image/guide/ring-personal-engraving-removal-section-2-998a9a1a.webp",
      "alt": "가죽 매트 위에 눕혀 놓은 금 반지 두 개를 위에서 본 모습으로, 왼쪽은 밴드가 얇고 오른쪽은 밴드가 두껍습니다",
      "caption": "반지를 눕혀 놓고 위에서 보면 안쪽 면에서 바깥 면까지의 밴드 두께가 드러나며, 이 두께가 각인을 지운 뒤 남는 여유를 가늠하는 기준입니다.",
      "width": 1254,
      "height": 1254
    },
    "table": null
  },
  {
    "title": "새 문구는 위치·글자 수·각인 방식을 먼저 정합니다",
    "paragraphs": [
      "새 문구를 넣을 위치는 기존 문구를 지운 바로 그 자리와 다른 안쪽 면 두 가지로 나눠 생각합니다. 같은 자리에 넣으면 문구가 보이는 위치가 그대로라는 장점이 있지만, 이미 금속을 덜어 낸 자리에 다시 홈을 파야 합니다. 다른 자리에 넣으면 두께 부담은 나눠지지만 지운 흔적과 새 문구가 함께 보이는지 확인해야 합니다.",
      "글자 수와 길이는 안쪽 둘레가 담을 수 있는 범위 안에서 정합니다. 호수가 작은 반지일수록 안쪽 둘레가 짧아 같은 문구도 글자가 작아지거나 줄어들어야 하므로, 새 문구는 꼭 넣고 싶은 단어와 줄여도 되는 부분을 나눠서 준비하면 조정이 빠릅니다. 날짜, 이름 머리글자, 짧은 문장처럼 우선순위를 정해 두세요.",
      "각인 방식도 미리 정합니다. 조각정으로 새기는 손 각인과 회전하는 버로 깎는 기계 각인은 선의 모양이 달라서, 커플링 한 쪽만 다시 새길 때는 상대 반지의 기존 각인과 느낌이 맞는지 비교해 보는 것이 좋습니다. 상대 반지 안쪽 사진을 함께 보내면 서체와 크기를 맞추는 데 참고할 수 있습니다.",
      "기존 문구 옆에 순도 각인이나 상표가 있다면 그 표기는 남기는 것을 기본으로 합니다. 순도 표기는 소재를 확인하는 단서이기도 하므로, 지울 문구와 남길 표기의 경계를 사진에 표시하거나 메시지로 분명히 적어 주세요.",
      "기존 문구를 꼭 지우지 않아도 되는 경우도 있습니다. 문구 뒤에 날짜를 덧붙이거나 다른 면에 새 문구를 추가하는 방식은 금속을 갈아 내는 범위가 없으므로 두께 부담이 적습니다. 귀족의 수리 안내에는 각인 추가와 수정이 함께 있어, 지우기와 추가 중 어느 쪽이 반지 상태에 맞는지 비교해서 정할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "사이즈 조절과 함께 맡길 때는 각인 위치를 먼저 알립니다",
    "paragraphs": [
      "각인 작업과 반지 사이즈 조절을 함께 맡길 때는 각인이 어디에 있는지를 가장 먼저 알려야 합니다. 반지 사이즈 작업 안내에서는 가능하면 순도 각인, 상표, 특별한 각인이 있는 자리를 자르지 않도록 권합니다. 지울 문구, 남길 표기, 새로 넣을 문구의 위치가 정해져 있어야 자르거나 이어 붙일 자리를 피해서 잡을 수 있습니다.",
      "사이즈 작업 뒤에는 줄질과 연마로 표면을 정리합니다. 이 정리 과정도 표면 금속을 덜어 내는 일이므로, 각인 지우기와 사이즈 조절을 따로따로 계획하면 같은 부위가 두 번 갈릴 수 있습니다. 두 작업을 한 번에 상담하면 어느 작업을 먼저 하고 마지막 마감을 언제 할지 함께 정할 수 있습니다.",
      "새 문구는 보통 사이즈와 표면 정리가 끝난 뒤에 넣는 편이 문구 손상을 피하기 쉽습니다. 문구를 먼저 새기고 사이즈를 바꾸면 이음 자리나 정리 범위가 새 문구에 걸릴 수 있기 때문입니다. 작업 순서는 반지 구조에 따라 정하므로, 원하는 사이즈와 새 문구를 한 번에 알려 주세요.",
      "사이즈를 바꾸려는 이유가 반지가 손가락에서 돌아가는 문제라면, 호수만 줄이기 전에 착용 부위와 장식 배치를 먼저 보는 것이 좋습니다. 사이즈 조절 가능 범위와 반지가 돌아가는 원인은 관련 가이드에서 따로 정리했습니다."
    ],
    "bullets": [
      "지울 문구와 남길 순도 각인·상표의 위치",
      "새 문구를 넣을 자리와 내용",
      "원하는 호수와 지금 호수",
      "보석이나 안쪽 장식이 있는 구간"
    ],
    "table": null
  },
  {
    "title": "견적은 작업 종류·소재·각인 범위와 보석 유무로 정해집니다",
    "paragraphs": [
      "각인 수리 견적은 작업 종류, 소재, 각인 범위와 깊이, 보석 유무 순으로 금액을 움직이는 요소를 짚어 정합니다. 작업 종류는 문구 지우기만 하는지, 지우고 새 문구를 넣는지, 사이즈 조절이나 광택 복원까지 함께 하는지로 나뉩니다. 작업이 겹칠수록 순서와 마감 계획이 달라지므로 한 번에 알려 주시는 편이 정확합니다.",
      "소재는 반지 안쪽 순도 표기로 먼저 확인합니다. 금 반지라면 24K는 99.9%, 18K는 75%, 14K는 58.5%의 금이 들어 있다는 뜻이고, 표기가 흐리거나 없으면 실물을 보고 확인합니다. 각인 범위와 깊이는 글자 수, 문구 길이, 가장 깊은 획을 보고, 보석 유무는 세팅 위치가 연마 범위에 걸리는지를 봅니다.",
      "견적을 받으려면 카카오톡으로 반지 전체 사진, 안쪽 각인을 가까이 찍은 사진, 옆면 두께가 보이는 사진을 보내 주세요. 사진과 함께 원하는 작업(지우기만인지, 새 문구를 넣는지), 새 문구 내용과 넣을 위치, 사이즈 변경 여부, 받고 싶은 날짜를 적어 주시면 상담이 바로 진행됩니다. 전화 상담과 종로3가 종묘귀금속백화점 101호 매장 방문도 가능합니다.",
      "이 글에 금액이나 공임 범위를 적지 않는 이유는 같은 각인 지우기라도 깊이와 두께, 장식 위치에 따라 작업량이 크게 달라지기 때문입니다. 실물을 본 뒤 작업 범위를 정하고 그에 맞춰 견적을 드립니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "금액을 움직이는 요소",
        "확인하는 내용",
        "보내면 좋은 자료"
      ],
      "rows": [
        [
          "작업 종류",
          "지우기만, 지우고 새 문구, 사이즈·광택 복원 동반 여부",
          "원하는 작업과 새 문구 내용"
        ],
        [
          "소재",
          "금 순도(24K 99.9%, 18K 75%, 14K 58.5%) 또는 다른 금속",
          "안쪽 순도 표기가 보이는 사진"
        ],
        [
          "각인 범위·깊이",
          "글자 수, 문구 길이, 가장 깊은 획",
          "비스듬한 빛에서 찍은 각인 근접 사진"
        ],
        [
          "밴드 두께",
          "각인 자리 옆면 두께",
          "반지를 세워 찍은 옆면 사진"
        ],
        [
          "보석 유무",
          "세팅 위치와 안쪽 노출 여부, 흔들림",
          "반지 전체 사진과 보석 부위 사진"
        ]
      ]
    }
  },
  {
    "title": "지우기가 부담스러우면 추가 각인이나 새 반지와 비교합니다",
    "paragraphs": [
      "밴드가 얇거나 각인이 깊어 지우기 부담이 크다고 판단되면, 지우기 대신 할 수 있는 방법을 함께 비교합니다. 기존 문구를 그대로 두고 다른 면에 새 문구를 추가하는 방법, 기존 문구 뒤에 날짜나 이름을 덧붙여 의미를 바꾸는 방법이 대표적입니다. 두 방법 모두 금속을 넓게 갈아 내지 않으므로 반지 두께를 지키는 쪽에 가깝습니다.",
      "문구를 꼭 없애야 하고 반지 두께에 여유가 없다면 새 반지 주문제작도 선택지가 됩니다. 금 반지 주문제작 가격은 금값(중량 × 당일 시세 × 순도 비율: 24K 99.9%, 18K 75%, 14K 58.5%)에 공임, 보석 세팅과 각인 같은 추가 작업을 더하는 구조입니다. 새 반지 주문제작은 최소 3주가 필요하므로 기념일이나 선물 날짜가 정해져 있다면 일정부터 맞춰 보세요.",
      "기존 반지 각인 작업의 기간은 실물을 확인한 뒤 안내합니다. 지우기만 하는지, 새 문구와 사이즈 조절까지 함께 하는지에 따라 작업 순서가 달라지기 때문입니다. 받고 싶은 날짜가 있다면 사진을 보낼 때 처음부터 함께 적어 주시면 가능한 작업 범위를 그 날짜에 맞춰 검토합니다.",
      "결혼예물처럼 처음부터 문구를 정해 새로 맞추는 경우라면 각인 위치와 글자 수를 제작 단계에서 정해 두는 편이 나중에 수정할 일을 줄입니다. 예물 상담 전에 확인할 항목은 별도 체크리스트에 정리해 두었습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "각인을 집에서 사포나 줄로 직접 갈아 지우지 마세요. 한 부위만 얇아지고 표면이 고르지 않게 남아 이후 재각인이나 광택 작업 범위가 더 커집니다.",
  "순도 각인이나 상표가 기존 문구 옆에 있다면 지울 범위와 남길 표기를 사진에 표시해 분명히 알려 주세요.",
  "지운 자리는 이미 금속이 덜어진 상태입니다. 같은 자리에 문구를 여러 번 바꿔 새기면 그때마다 두께 여유가 줄어듭니다.",
  "사진으로 상담을 시작할 수 있지만 각인 깊이와 실제 밴드 두께는 실물에서 최종 확인합니다.",
  "보석이 흔들리거나 빠진 흔적이 있으면 각인 작업 전에 세팅 상태부터 알려 주세요."
]
const relatedLinks = [
  {
    "to": "/guide/jongno-ring-size-repair",
    "label": "종로 반지 사이즈 줄이기·늘리기, 수리 맡기기 전 확인할 것",
    "description": "반지 폭, 소재, 보석 세팅, 각인 위치에 따라 사이즈 조절 가능 범위가 달라집니다. 방문 전 상담 기준을 정리했습니다."
  },
  {
    "to": "/guide/ring-cubic-stone-repair",
    "label": "반지 큐빅 빠짐 수리, 종로에 맡기기 전 확인할 것",
    "description": "반지 큐빅 빠짐 수리 전 착용을 멈춰야 하는 이유와 빠진 스톤 보관, 재사용·교체 판단, 세팅 발 점검, 종로 수리 상담 준비"
  },
  {
    "to": "/guide/ring-spinning-fit-balance-guide",
    "label": "반지가 돌아가는 이유, 줄이기 전에 확인할 것",
    "description": "반지가 자꾸 돌아간다면 마디와 착용 부위의 차이, 장식 배치부터 확인하세요. 전체 회전과 보석 흔들림을 구분하고, 호수 조정과"
  },
  {
    "to": "/guide/jongno-wedding-jewelry-consultation-checklist",
    "label": "결혼예물 상담 전 확인할 체크리스트",
    "description": "종로에서 결혼예물을 상담하기 전 예산, 금속과 보석 사양, 반지 치수, 계약 조건, 증빙자료를 확인하는 방법을 정리했습니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '반지 각인 지우기, 깊이·두께부터 확인합니다'
const gmArticleLead = '반지 각인을 지울 수 있는지는 먼저 각인 깊이와 밴드 두께를 보고, 이어서 안쪽 장식·보석 세팅과 새 문구를 넣을 위치를 확인하는 순서로 판단합니다. 각인은 금속 표면을 깎아 낸 자국이고, 연마로 지우는 작업은 글자 주변 금속을 글자 바닥 높이까지 갈아 내는 일입니다. 그래서 지운 뒤에 남는 두께가 가장 중요한 기준이 됩니다. 이 글은 기존 개인 문구를 지우고 새 문구를 넣기 전에 반지에서 무엇을 확인해야 하는지, 사이즈 조절과 함께 맡길 때 순서는 어떻게 잡는지, 견적을 받으려면 어떤 사진을 보내야 하는지 정리했습니다.'
const gmArticleCategory = '수리'
const gmArticleKeyword = '반지 각인 지우기'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '반지 안쪽 개인 각인 삭제와 새 문구 재각인 상담'
const gmHeroAlt = '작업대 위 금 반지 안쪽에 덩굴무늬 각인이 새겨져 있고 옆에 조각정, 루페, 캘리퍼스가 놓여 있는 모습'
const gmHeroCaption = '반지 안쪽에 새겨진 각인 홈과 밴드 옆면 두께를 한 장면에서 볼 수 있습니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '손 각인과 기계 각인의 차이, 연마가 표면 금속을 갈아 내는 공정이라는 점, 사이즈 작업 때 각인 자리를 피하라는 권고는 Ganoksin에 실린 금속공예 교육 자료를 근거로 했습니다. 상담 방법, 수리 항목, 새 반지 주문제작 최소 3주, 금 순도 비율은 귀족이 제공한 사실입니다. 개별 반지의 작업 가능 여부, 기간, 금액은 실물을 확인한 뒤 안내합니다.'
const gmSources = [
  {
    "label": "Erhard Brepohl, 「Engraving Methods and Techniques」 (The Theory and Practice of Goldsmithing 발췌, Ganoksin)",
    "url": "https://www.ganoksin.com/article/engraving-methods-and-techniques/",
    "note": "손 각인은 조각정으로 금속을 밀어 깎고 기계 각인은 회전하는 버로 깎아 선의 모양이 다르다는 설명의 근거입니다."
  },
  {
    "label": "Gary Dawson, 「Perfect Finishing Tools and Techniques」 (Ganoksin)",
    "url": "https://www.ganoksin.com/article/perfect-finishing-tools-techniques/",
    "note": "연마가 점점 고운 연마재로 표면을 갈아 낸 뒤 버프와 연마제로 다듬는 공정이며 귀금속에서는 재료 손실이 문제로 꼽힌다는 설명의 근거입니다."
  },
  {
    "label": "Tina Wojtkielo Snyder, 「Ring Sizing Tips and Tricks」 (Ganoksin)",
    "url": "https://www.ganoksin.com/article/ring-sizing-tips-tricks/",
    "note": "사이즈 작업 때 순도 각인, 상표, 특별한 각인 자리를 가능하면 자르지 않고 작업 뒤 줄질과 연마로 정리한다는 설명의 근거입니다."
  }
]
// guide-manager:data:end

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: `${siteConfig.url}${pagePath}` }],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `${siteConfig.url}${pagePath}` },
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
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
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
  <GuideArticleView
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
  />
</template>
