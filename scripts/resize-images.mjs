import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'

const IMAGE_DIR = './public/Image'
const MAX_WIDTH = 1600
const MIN_SIZE_KB = 500  // 500KB 이상만 리사이즈

async function getFilesRecursively(dir) {
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getFilesRecursively(fullPath))
    } else if (extname(entry.name).toLowerCase() === '.webp') {
      files.push(fullPath)
    }
  }
  return files
}

async function resizeImage(filePath) {
  const stats = await stat(filePath)
  const sizeKB = stats.size / 1024

  if (sizeKB < MIN_SIZE_KB) {
    return null
  }

  const image = sharp(filePath)
  const metadata = await image.metadata()

  if (metadata.width <= MAX_WIDTH) {
    console.log(`⏭️  ${filePath}: 이미 ${metadata.width}px (스킵)`)
    return null
  }

  const originalSize = sizeKB.toFixed(0)

  // 리사이즈 및 덮어쓰기
  await image
    .resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: 85 })
    .toBuffer()
    .then(buffer => sharp(buffer).toFile(filePath))

  const newStats = await stat(filePath)
  const newSizeKB = (newStats.size / 1024).toFixed(0)

  console.log(`✅ ${filePath}: ${metadata.width}px → ${MAX_WIDTH}px (${originalSize}KB → ${newSizeKB}KB)`)

  return {
    file: filePath,
    before: parseInt(originalSize),
    after: parseInt(newSizeKB)
  }
}

async function main() {
  console.log('🖼️  이미지 리사이즈 시작...\n')
  console.log(`설정: 최대 너비 ${MAX_WIDTH}px, ${MIN_SIZE_KB}KB 이상만 처리\n`)

  const files = await getFilesRecursively(IMAGE_DIR)
  const results = []

  for (const file of files) {
    try {
      const result = await resizeImage(file)
      if (result) results.push(result)
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`)
    }
  }

  if (results.length > 0) {
    const totalBefore = results.reduce((sum, r) => sum + r.before, 0)
    const totalAfter = results.reduce((sum, r) => sum + r.after, 0)
    const saved = totalBefore - totalAfter

    console.log(`\n📊 결과: ${results.length}개 파일 처리`)
    console.log(`   절감: ${(saved / 1024).toFixed(1)}MB (${totalBefore}KB → ${totalAfter}KB)`)
  } else {
    console.log('\n✅ 리사이즈 필요한 이미지 없음')
  }
}

main().catch(console.error)
