// middleware.js
import Busboy from 'busboy';
import { join } from 'path';
import { tmpdir as _tmpdir } from 'os';
import { createWriteStream, readFile, unlinkSync } from 'fs';

export default function  filesUpload (req, res, next) {
    // See https://cloud.google.com/functions/docs/writing/http#multipart_data
    const busboy = new Busboy({
      headers: req.headers,
      limits: {
        // Cloud functions impose this restriction anyway
        fileSize: 10 * 1024 * 1024,
      },
    });
  
    const fields = {};
    const files = [];
    const fileWrites = [];
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    const tmpdir = _tmpdir();
  
    busboy.on("field", (key, value) => {
      // You could do additional deserialization logic here, values will just be
      // strings
      // console.log(value);
      fields[key] = value;
    });
  
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = join(tmpdir, filename);
      console.log(
        `Handling file upload field ${fieldname}: ${filename} (${filepath})`
      );
      const writeStream = createWriteStream(filepath);
      file.pipe(writeStream);
  
      fileWrites.push(
        new Promise((resolve, reject) => {
          file.on("end", () => writeStream.end());
          writeStream.on("finish", () => {
            readFile(filepath, (err, buffer) => {
              const size = Buffer.byteLength(buffer);
            //   console.log(`${filename} is ${size} bytes`);
              if (err) {
                return reject(err);
              }
  
              files.push({
                fieldname,
                originalname: filename,
                encoding,
                mimetype,
                buffer,
                size,
              });
  
              try {
                unlinkSync(filepath);
              } catch (error) {
                return reject(error);
              }
  
              resolve();
            });
          });
          writeStream.on("error", reject);
        })
      );
    });
  
    busboy.on("finish", () => {
      Promise.all(fileWrites)
        .then(() => {
          req.body = fields;
          req.files = files;
          next();
        })
        .catch(next);
    });
  
    busboy.end(req.rawBody);
  }