import { readdir, readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const galleryDir = path.join(__dirname, '..', 'public', 'gallery')

const files = await readdir(galleryDir)
const heicFiles = files.filter(f => f.toLowerCase().endsWith('.heic'))

console.log(`Converting ${heicFiles.length} HEIC files...`)

// Dynamic import to handle CJS module
const heicConvert = (await import('heic-convert')).default

let converted = 0
for (const file of heicFiles) {
  const inPath = path.join(galleryDir, file)
  const outPath = path.join(galleryDir, file.replace(/\.heic$/i, '.jpg'))

  if (existsSync(outPath)) {
    console.log(`  Skipping (exists): ${file}`)
    continue
  }

  try {
    const inputBuffer = await readFile(inPath)
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.92,
    })
    await writeFile(outPath, Buffer.from(outputBuffer))
    converted++
    console.log(`  ✓ ${file} → ${path.basename(outPath)}`)
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`)
  }
}

console.log(`\nDone. Converted ${converted} files.`)
