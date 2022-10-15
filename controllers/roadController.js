const road = require('../src/models').road

module.exports = {
    //get all class room - READ/ GET ALL
    list(req, res){
        return road
            .findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {res.status(400).send(error)})
    },    
    add(req, res){
        return road
            .create({
                fid: req.body.fid,
                lap_id: req.body.lap_id,
                d_status: req.body.d_status,
                t_flow:req.body.t_flow,
                row: req.body.row,
                lanes: req.body.lanes,
                carriage_width: req.body.carriage_width,
                median: req.body.median,
                parking_left: req.body.parking_left,
                parking_right: req.body.parking_right,
                path_left:req.body.path_left,
                path_right: req.body.path_right,
                light_left: req.body.light_left,
                light_right: req.body.light_right,
                drains_left: req.body.drains_left,
                drains_right: req.body.drains_right,
                remarks: req.body.remarks
            })
            .then((roadsegmentData) => res.status(200).send(roadsegmentData))
            .catch((error) => res.status(400).send(error))
    },

    update(req,res){
        console.log("UPDARING ROADS\n")
        console.log(req.body)
        console.log(req.params.fid)
        console.log("\n")
        return road  
            .findOne({
                where: {
                    fid: Number(req.params.fid)
                  }
            })
            .then(data => {
                    data
                    .update({
                        d_status: req.body.d_status,
                        t_flow:req.body.t_flow,
                        row: req.body.row,
                        lanes: req.body.lanes,
                        carriage_width: req.body.carriage_width,
                        median: req.body.median,
                        parking_left: req.body.parking_left,
                        parking_right: req.body.parking_right,
                        path_left:req.body.path_left,
                        path_right: req.body.path_right,
                        light_left: req.body.light_left,
                        light_right: req.body.light_right,
                        drains_left: req.body.drains_left,
                        drains_right: req.body.drains_right,
                        remarks: req.body.remarks
                    })
                res.send({status:"success", data:data})
                
            })
           
            .catch((error) => res.status(400).send(error))
    },

    getSpecific(req, res){
        return road
            .findOne({
                where: {
                    fid: parseInt(req.params.fid)
                  }
            })
            .then((roadsegmentData) => res.status(200).send(roadsegmentData))
            .catch((error) => res.status(400).send(error))
    },
    getByLap(req,res) {
        return roadsegment
            .findAll({
                where: {
                    lap_id: req.params.lap_id
                }
            })
            .then((roadsInLap) => res.status(200).send(roadsInLap))
            .catch((error) => res.status(400).send(error))
    }
}