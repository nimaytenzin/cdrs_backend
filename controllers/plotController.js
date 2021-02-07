const plot = require('../src/models').plot
 

module.exports = {

    //get all the plots in the database Table
    list(req, res){
        return plot
            .findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {res.status(400).send(error)})
    },
    //post into the database
    add(req, res){
        return plot
            .create({
                fid: req.body.fid,
                lap_id: req.body.lap_id,
                plot_id:req.body.plot_id,
                d_status: req.body.d_status,
                plot_use: req.body.plot_use,
                max_height: req.body.max_height,
                setback_e: req.body.setback_e,
                parking:req.body.parking,
                remarks: req.body.remarks
            })
            .then((plotData) => res.status(200).send({data:plotData, status: 'Success'}))
            .catch((error) => res.status(400).send(error))
    },

    //get specific plot based on the unquie gid for each lap
    getSpecific(req, res){
        return plot
            .findAll({
                where: {
                    fid: req.params.fid
                  }
            })
            .then((plotData) => res.status(200).send({status:"success", data: plotData}))
            .catch((error) => res.status(400).send({status:"error", error: error}))
    },

    //get plots by lap id
    getByLapId(req,res){
        return plot
            .findAll({
                where: {
                    lap_id: req.params.lap_id
                }
            })
            .then((plotsByLap) => res.status(200).send(plotsByLap))
            .catch((error) => res.status(400).send(error))
    },
    // get road seg,emts but 

    //update doesnot works
    update(req,res){
        return plot  
            .findOne({
                where: {
                    fid: parseInt(req.params.fid)
                }
            })
            .then(plotData => {
               plotData
                    .update({
                        fid: req.body.fid,
                        lap_id: req.body.lap_id,
                        plot_id:req.body.plot_id,
                        d_status: req.body.d_status,
                        plot_use: req.body.plot_use,
                        max_height: req.body.max_height,
                        setback_e: req.body.setback_e,
                        parking:req.body.parking,
                        remarks: req.body.remarks
                    })
                res.send({status:"success", data:plotData})
                
            })
           
            .catch((error) => res.status(400).send(error))
    }
}