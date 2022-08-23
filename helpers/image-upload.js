const multer = require('multer')
const crypto = require('crypto')

const storageTypes = {
  local: multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = ''
      if (req.baseUrl.includes('products')) {
        folder = 'products'
      }

      cb(null, `public/images/${folder}`)
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    }
  })
}

const imageUploadLocal = multer({
  storage: storageTypes.local, fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|svg|JPG)$/)) {
      return cb(new Error('Apenas imagens JPG, PNG, JPEG e SVG são permitidas!'))
    }
    cb(undefined, true)
  },
})

module.exports = imageUploadLocal