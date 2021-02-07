const image = require('../src/models').image
const fs = require('fs')
//for image the fid corressponds to the id of the plots,footpath and roads and not the fid in their table per se

module.exports = {
    getImage(req,res){
        return image
        .findAll(
            {
                where: {
                    fid: req.params.fid,
                    ftype:req.params.ftype
                  }
            }
        )
        .then((data) => res.status(200).send(data))
        .catch((error) => {res.status(400).send(error)})
    },

    createImage(req, res){
    let fid =req.body.fid;
    let ftype = req.body.ftype;
    dataUrl = req.body.uri;
    let date = new Date()

    let filename = "images/"+ftype+"_"+fid+ "_"+ date+".jpg"
    let m = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    let b = Buffer.from(m[2],'base64')
    let createfile = false
    fs.writeFile(filename,b,function(err){
        console.log(filename)        
        console.log(process.cwd()) 
    })
    return image
        .create({
            uri:filename,
            fid: req.body.fid,
            ftype:req.body.ftype
        })
        .then((imageData) => res.status(200).send(imageData))
        .catch((error) => res.status(400).send(error))
},


  
}