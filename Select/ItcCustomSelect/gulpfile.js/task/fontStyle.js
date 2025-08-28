const cb = () => {}
let srsFonts = $.path.fontsStyle.src
let appFonts = $.path.fontsStyle.dest

const fontsStyle = (done) => {
   let file_content = $.fs.readFileSync(srsFonts)

   $.fs.writeFile(srsFonts, '', cb)
   $.fs.readdir(appFonts, function (err, items) {
      if (items) {
         let c_fontname
         for (let i = 0; i < items.length; i++) {
            let fontname = items[i].split('.')
            fontname = fontname[0]
            if (c_fontname !== fontname) {
               $.fs.appendFile(
                  srsFonts,
                  '@include font-face("' +
                     fontname +
                     '", "' +
                     fontname +
                     '", 400,  "normal");\r\n',
                  cb
               )
            }
            c_fontname = fontname
         }
      }
   })
   done()
}
module.exports = fontsStyle
