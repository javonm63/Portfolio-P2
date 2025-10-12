import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function createInvoicePDF(invoice) {
    return new Promise((resolve, reject) => {
        try {
            const invoicesDir = path.join(__dirname, '../public/invoices')
            if (!fs.existsSync(invoicesDir)) {
                fs.mkdirSync(invoicesDir, { recursive: true })
            }

            const filename = `invoice-${invoice.id}-${Date.now()}.pdf`
            const filepath = path.join(invoicesDir, filename)

            const doc = new PDFDocument({ size: 'A4', margin: 50 })
            const stream = fs.createWriteStream(filepath)
            doc.pipe(stream)

            // --- Header ---
  doc
    .fontSize(20)
    .text(`INVOICE: #${invoice.id}`, { align: 'right' })
    .moveDown()

  // --- Company Info ---
  doc
    .fontSize(10)
    .fillColor('#333')
    .text(`From:`, 50, 50)
    .text(invoice.client)
    .text(invoice.company)
    .text(invoice.phone)
    .moveDown()

  // --- Client Info ---
  doc
    .text(`Billed To:`)
    .text(invoice.billed)
    .text(invoice.email)
    .moveDown()

  // --- Invoice Details ---
  doc
    .moveDown()
    .fontSize(12)
    .fillColor('#000')
    .text(`Invoice ID: ${invoice.id}`)
    .text(`Created On: ${invoice.date}`)
    .text(`Due Date: ${invoice.due}`)
    .moveDown(2)

  // --- Items Table Header ---
  const tableTop = 230
  doc
    .fontSize(10)
    .fillColor('#000')
    .text('Item', 50, tableTop)
    .text('Description', 150, tableTop)
    .text('Qty', 300, tableTop)
    .text('Total', 400, tableTop)

  let position = tableTop + 20

  // --- Table Rows ---
  invoice.items.forEach(item => {
    doc
      .fontSize(10)
      .text(item.item, 50, position)
      .text(`${item.descript}`, 150, position)
      .text(item.quantity, 300, position)
      .text(`$${(item.price)}`, 400, position)
    position += 20
  })

  // --- Total ---
  doc
    .moveDown()
    .fontSize(12)
    .font('Helvetica-Bold')
    .text(`Total: $${invoice.total}`, { align: 'right' })
    .moveDown()

  // --- Footer ---
  doc
    .text(`Invoice from FreelancerInnvoice.com`, { align: 'right' }, 700)


            doc.end()

            stream.on('finish', () => {
                const base = process.env.APP_BASE_URL || 'http://localhost:6001'
                const pdfUrl = `${base}/api/fl/email/${filename}`
                resolve(pdfUrl)
            })

            stream.on('error', reject)
        } catch (err) {
            reject(err)
        }
    })
}