const proposal = require('../src/models').proposal


module.exports = {

    //post into the database
    add(req, res){
        return proposal
            .create({
                fid: req.body.fid,
                lap_id: req.body.lap_id,
                remarks: req.body.remarks
            })
            .then((proposalData) => res.status(200).send({data:proposalData, status: 'Success'}))
            .catch((error) => res.status(400).send(error))
    },

    //get specific plot based on the unquie gid for each lap
    getSpecific(req, res){
        return proposal
            .findOne({
                where: {
                    fid: req.params.fid
                  }
            })
            .then((proposalData) => res.status(200).send({status:"success", data: proposalData}))
            .catch((error) => res.status(400).send({status:"error", error: error}))
    },

    update(req,res){
        return proposal  
            .findOne({
                where: {
                    fid: parseInt(req.params.fid)
                }
            })
            .then(proposalData => {
               proposalData
                    .update({
                        remarks: req.body.remarks
                    })
                res.send({status:"success", data:proposalData})  
            })
            .catch((error) => res.status(400).send(error))
    }

}