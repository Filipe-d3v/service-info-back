const multer = require('multer')
const patch = require('path')

const imageStorage =  multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = ''
      if (req.baseUrl.includes('products')) {
        folder = 'products'
      }

      cb(null, `public/images/${folder}`)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + patch.extname(file.originalname)) 
  }
  })

const imageUploadLocal = multer({
  storage: imageStorage, fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|svg|JPG)$/)) {
      return cb(new Error('Apenas imagens JPG, PNG, JPEG e SVG são permitidas!'))
    }
    cb(undefined, true)
  },
})

module.exports = imageUploadLocal