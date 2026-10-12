// 종이에 찍은 도장 사진에서 빨간 도장만 투명 배경으로 잘라낸다 (관리 화면에서만 쓴다).

const SEARCH_SIZE = 1600 // 도장 위치를 찾을 때 쓰는 사진의 긴 변
const OUTPUT_SIZE = 400 // 저장하는 직인 이미지의 긴 변
const GRID = 64 // 도장 위치를 찾을 때 사진을 나누는 칸 수 (긴 변 기준)
const INK_ALPHA = 90 // 이보다 진하면 인주로 본다
// 사진은 조명에 따라 인주가 검붉게 찍힌다. 흰 견적서 위에서는 인주 본래의 붉은색으로 찍는다.
const SEAL_RED = [196, 24, 32]

/**
 * 붉은 인주만 남긴다. 종이와 그늘은 붉은 정도가 0 근처, 명판의 파란 잉크는 음수라 모두 투명해진다.
 * 인주의 진하기는 투명도로 옮기고 색은 한 가지로 맞춘다.
 */
function keepRedInk(data: Uint8ClampedArray) {
  for (let i = 0; i < data.length; i += 4) {
    const redness = data[i] - Math.max(data[i + 1], data[i + 2])
    data[i] = SEAL_RED[0]
    data[i + 1] = SEAL_RED[1]
    data[i + 2] = SEAL_RED[2]
    // 견적서에는 작게 찍히므로 획이 흐려지지 않게 인주는 빨리 불투명해지도록 잡는다.
    data[i + 3] = Math.round(Math.min(1, Math.max(0, (redness - 30) / 30)) * 255)
  }
}

function readPixels(source: ImageBitmap, sx: number, sy: number, sw: number, sh: number, width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('canvas unavailable')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(source, sx, sy, sw, sh, 0, 0, width, height)
  return { canvas, ctx, image: ctx.getImageData(0, 0, width, height) }
}

/**
 * 사진에서 도장 하나를 찾아 잘라낸 캔버스를 돌려준다.
 * 도장이 여러 번 찍혀 있으면 가장 크고 진한 것 하나를 고른다.
 * 이미 배경이 투명한 PNG는 그대로 두고 여백만 잘라낸다.
 */
export async function extractSeal(file: Blob): Promise<HTMLCanvasElement> {
  const bitmap = await createImageBitmap(file)

  // 1) 줄인 사진에서 도장이 어디 있는지 찾는다.
  const scale = Math.min(1, SEARCH_SIZE / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))
  const search = readPixels(bitmap, 0, 0, bitmap.width, bitmap.height, width, height)
  const data = search.image.data

  let transparentPixels = 0
  for (let i = 3; i < data.length; i += 4) if (data[i] < 250) transparentPixels++
  const alreadyCutOut = transparentPixels >= width * height * 0.02
  if (!alreadyCutOut) keepRedInk(data)

  // 굵은 칸으로 나눠 인주가 있는 칸을 찾고, 서로 붙어 있는 칸 묶음 가운데 가장 큰 것을 도장 하나로 본다.
  const cell = Math.max(4, Math.ceil(Math.max(width, height) / GRID))
  const gridWidth = Math.ceil(width / cell)
  const gridHeight = Math.ceil(height / cell)
  const ink = new Uint32Array(gridWidth * gridHeight)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > INK_ALPHA) ink[Math.floor(y / cell) * gridWidth + Math.floor(x / cell)]++
    }
  }
  const marked = (index: number) => ink[index] > cell * cell * 0.03
  const seen = new Uint8Array(gridWidth * gridHeight)
  let best: { amount: number; left: number; top: number; right: number; bottom: number } | null = null
  for (let start = 0; start < ink.length; start++) {
    if (seen[start] || !marked(start)) continue
    const group = { amount: 0, left: gridWidth, top: gridHeight, right: 0, bottom: 0 }
    const queue = [start]
    seen[start] = 1
    while (queue.length) {
      const index = queue.pop()!
      const gx = index % gridWidth
      const gy = Math.floor(index / gridWidth)
      group.amount += ink[index]
      group.left = Math.min(group.left, gx); group.right = Math.max(group.right, gx)
      group.top = Math.min(group.top, gy); group.bottom = Math.max(group.bottom, gy)
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = gx + dx
          const ny = gy + dy
          if (nx < 0 || ny < 0 || nx >= gridWidth || ny >= gridHeight) continue
          const next = ny * gridWidth + nx
          if (!seen[next] && marked(next)) { seen[next] = 1; queue.push(next) }
        }
      }
    }
    if (!best || group.amount > best.amount) best = group
  }
  if (!best) throw new Error('seal not found')

  // 고른 칸 묶음 안에서 실제 인주가 있는 범위로 좁힌다.
  const area = {
    left: best.left * cell,
    top: best.top * cell,
    right: Math.min(width, (best.right + 1) * cell) - 1,
    bottom: Math.min(height, (best.bottom + 1) * cell) - 1,
  }
  let left = area.right, right = area.left, top = area.bottom, bottom = area.top
  for (let y = area.top; y <= area.bottom; y++) {
    for (let x = area.left; x <= area.right; x++) {
      if (data[(y * width + x) * 4 + 3] <= INK_ALPHA) continue
      if (x < left) left = x
      if (x > right) right = x
      if (y < top) top = y
      if (y > bottom) bottom = y
    }
  }
  if (bottom - top < 8 || right - left < 8) throw new Error('seal not found')

  // 2) 그 자리를 원본 해상도에서 다시 잘라 배경을 지운다 — 줄인 사진에서 자르면 도장이 흐려진다.
  const margin = 2
  const sx = Math.max(0, (left - margin) / scale)
  const sy = Math.max(0, (top - margin) / scale)
  const sw = Math.min(bitmap.width - sx, (right - left + 1 + margin * 2) / scale)
  const sh = Math.min(bitmap.height - sy, (bottom - top + 1 + margin * 2) / scale)
  const outputScale = Math.min(1, OUTPUT_SIZE / Math.max(sw, sh))
  const output = readPixels(bitmap, sx, sy, sw, sh, Math.max(1, Math.round(sw * outputScale)), Math.max(1, Math.round(sh * outputScale)))
  if (!alreadyCutOut) {
    keepRedInk(output.image.data)
    output.ctx.putImageData(output.image, 0, 0)
  }
  return output.canvas
}
