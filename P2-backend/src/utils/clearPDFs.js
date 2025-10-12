import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function clearInvoicesFolder() {
  const folderPath = path.join(__dirname, '../public/invoices')
  try {
    const files = await fs.readdir(folderPath)
    for (const file of files) {
      await fs.unlink(path.join(folderPath, file))
    }
    console.log('Invoices folder cleared successfully.')
  } catch (err) {
    console.error('Error clearing invoices folder:', err)
  }
}