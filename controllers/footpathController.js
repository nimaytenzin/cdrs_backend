const footpath = require('../src/models').footpath

module.exports = {

    //get all the plots in the database Table
    list(req, res){
        return footpath
            .findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {res.status(400).send(error)})
    },
    //post into the database
    add(req, res){
        return footpath
            .create({
                fid: req.body.fid,
                lap_id:req.body.lap_id,
                d_status: req.body.d_status,
                width: req.body.width,
                lighting: req.body.lighting,
                friendliness: req.body.friendliness,
                remarks: req.body.remarks
            })
            .then((plotData) => res.status(200).send(plotData))
            .catch((error) => res.status(400).send(error))
    },

    getSpecific(req, res){
        return footpath
            .findOne({
                where: {
                    fid: req.params.fid
                  }
            })
            .then((pathData) => res.status(200).send(pathData))
            .catch((error) => res.status(400).send(error))
    },

    update(req,res){
        return footpath  
            .findOne({
                where: {
                    fid: parseInt(req.params.fid)
                }
            })
            .then(footpathData => {
                footpathData
                    .update({
                        fid: req.body.fid,
                        lap_id:req.body.lap_id,
                        d_status: req.body.d_status,
                        width: req.body.width,
                        lighting: req.body.lighting,
                        friendliness: req.body.friendliness,
                        remarks: req.body.remarks
                    })
                res.send({status:"success", data:plotData})
                
            })
           
            .catch((error) => res.status(400).send(error))
    }

}