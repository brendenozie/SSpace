import { createWriteStream } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import BusBoy from 'busboy';

export default async function extractFiles(req, res, next) {
  
  const multipart = req.method === 'POST' && req.headers['enctype'].startsWith('multipart/form-data')
  if (!multipart) return next()
  //
  const busboy = new BusBoy({ headers: req.headers })
  const incomingFields = {}
  const incomingFiles = {}
  const writes = []
  // Process fields
  busboy.on('field', (name, value) => {
    try {
      // This will keep a field created like so form.append('product', JSON.stringify(product)) intact
      incomingFields[name] = JSON.parse(value)
    } catch (e) {
      // Numbers will still be strings here (i.e 1 will be '1')
      incomingFields[name] = value
    }
  })
  // Process files
  busboy.on('file', (field, file, filename, encoding, contentType) => {
    // Doing this to not have to deal with duplicate file names
    // (i.e. TIMESTAMP-originalName. Hmm what are the odds that I'll still have dups?)
    const path = join(tmpdir(), `${(new Date()).toISOString()}-${filename}`)
    // NOTE: Multiple files could have same fieldname (which is y I'm using arrays here)
    incomingFiles[field] = incomingFiles[field] || []
    incomingFiles[field].push({ path, encoding, contentType })
    //
    const writeStream = createWriteStream(path)
    //
    writes.push(new Promise((resolve, reject) => {
      file.on('end', () => { writeStream.end() })
      writeStream.on('finish', resolve)
      writeStream.on('error', reject)
    }))
    //
    file.pipe(writeStream)
  })
  //
  busboy.on('finish', async () => {
    await Promise.all(writes)
    req.files = incomingFiles
    req.body = incomingFields
    next()
  })
  busboy.end(req.rawBody)
}