import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
  },
  filename: function (req, file, cb) {
    const fileExtensionParts = file.originalname.split('.')
    const fileExtension = fileExtensionParts[fileExtensionParts.length - 1]
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension)
  },
})

export const upload = multer({ storage })
