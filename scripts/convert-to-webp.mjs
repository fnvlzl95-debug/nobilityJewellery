import sharp from 'sharp'
import { readdir, stat, mkdir, rename } from 'fs/promises'
import { join, extname, basename, dirname, relative } from 'path'

const PUBLIC_DIR = './public/Image'
const ORIGINAL_DIR = './assets-original'
const QUALITY = 90  // 고화질 유지

async function getAllImages(dir) {
  const files = []
  const items = await readdir(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const stats = await stat(fullPath)

    if (stats.isDirectory()) {
      files.push(...await getAllImages(fullPath))
    } else {
      const ext = extname(item).toLowerCase()
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        files.push(fullPath)
      }
    }
  }

  return files
}

async function convertToWebP(imagePath) {
  const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')

  try {
    const info = await sharp(imagePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath)

    const originalStats = await stat(imagePath)
    const savings = ((originalStats.size - info.size) / originalStats.size * 100).toFixed(1)

    // 원본 파일을 assets-original로 이동
    const relativePath = relative(PUBLIC_DIR, imagePath)
    const destPath = join(ORIGINAL_DIR, relativePath)
    const destDir = dirname(destPath)

    await mkdir(destDir, { recursive: true })
    await rename(imagePath, destPath)

    console.log(`✓ ${basename(imagePath)} → ${basename(webpPath)} (${savings}% 절약) [원본 이동됨]`)
    return { original: originalStats.size, webp: info.size }
  } catch (error) {
    console.error(`✗ ${basename(imagePath)}: ${error.message}`)
    return null
  }
}

async function main() {
  console.log('🖼️  이미지 WebP 변환 시작...\n')

  const images = await getAllImages(PUBLIC_DIR)
  console.log(`총 ${images.length}개 이미지 발견\n`)

  let totalOriginal = 0
  let totalWebP = 0

  for (const image of images) {
    const result = await convertToWebP(image)
    if (result) {
      totalOriginal += result.original
      totalWebP += result.webp
    }
  }

  const totalSavings = ((totalOriginal - totalWebP) / totalOriginal * 100).toFixed(1)
  const savedMB = ((totalOriginal - totalWebP) / 1024 / 1024).toFixed(2)

  console.log(`\n✅ 완료! 총 ${savedMB}MB 절약 (${totalSavings}%)`)
}

main()
