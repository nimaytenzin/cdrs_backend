const point = require('../src/models').point

module.exports = {

    //get all the plots in the database Table
    list(req, res){
        return point
            .findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {res.status(400).send(error)})
    },
 //find specific
    findSpecific(req, res){
        return point
            .findAll({
                where: {
                    id: parseInt(req.params.id)
                }
            })
            .then((data) => res.status(200).send({data:data[0], status: 'Success'}))
            .catch((error) => res.status(400).send(error))
    },
    getByLap(req,res){
        return point
            .findAll({
                where: {
                    lap_id: req.params.lap_id
                }
            })
            .then((data) => {
                const result = data.map((row)=>{
                    let geojson = {"type":"Point"}
                    geojson.properties = {id:row.id,type:row.type,remarks:row.remarks}
                    geojson.coordinates = [row.lng,row.lat]
                    return geojson
                })
                res.status(200).send(result)
            })           
            .catch((error) => res.status(400).send(error))
    },

    //post into database
    add(req, res){
        return point
            .create({
                type: req.body.type,
                remarks:req.body.remarks,
                lat:req.body.lat,
                lng:req.body.lng,
                lap_id:  req.body.lap_id
            })
            .then((pointData) => res.status(200).send({data:pointData, status: 'Success'}))
            .catch((error) => res.status(400).send(error))
    },

    update(req,res){
        return point  
            .findOne({
                where: {
                    id: parseInt(req.params.id),
                }
            })
            .then(pointData => {
                pointData
                    .update({
                        type: req.body.type,
                        remarks:req.body.remarks,
                    })
                res.send({status:"success", data:pointData})
                
            })
           
            .catch((error) => res.status(400).send(error))
    }
}