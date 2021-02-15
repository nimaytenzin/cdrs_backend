const building = require('../src/models').building

module.exports = {

    //get all the plots in the database Table
    list(req, res){
        return building
            .findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {res.status(400).send(error)})
    },
 //find specific
    getbuildingDetail(req,res){
        return building
            .findAll({
                where: {
                    structure_id: req.params.id
                }
            })
            .then((data) => res.status(200).send(data[0]))
            .catch((error) => res.status(400).send(error))
    },

    //post into database
    add(req, res){
        return plot
            .create({
                structure_id: req.body.structure_id,
                lap_id:  req.body.lap_id,
                owner:   req.body.owner,
                contact: req.body.contact,
                year:    req.body.year,
                status:  req.body.status,
                use:     req.body.use,
                height:  req.body.height,
                attic:   req.body.attic,
                jamthog: req.body.jamthog,
                basement:req.body.basement,
                stilts:  req.body.stilts,
                facade:  req.body.facade,
                b_wall:  req.body.b_wall,
                balcony: req.body.balcony,
                color:   req.body.color,
                parking: req.body.parking,
                res_units: req.body.res_units,
                com_units: req.body.com_units,
                off_units: req.body.off_units,
                remarks: req.body.remarks
            })
            .then((buildingData) => res.status(200).send({data:buildingData, status: 'Success'}))
            .catch((error) => res.status(400).send(error))
    },

    update(req,res){
        return building  
            .findOne({
                where: {
                    structure_id: parseInt(req.params.building_id),
                }
            })
            .then(plotData => {
               plotData
                    .update({
                        year:    req.body.year,
                        status:  req.body.status,
                        use:     req.body.use,
                        height:  req.body.height,
                        attic:   req.body.attic,
                        jamthog: req.body.jamthog,
                        basement:req.body.basement,
                        stilts:  req.body.stilts,
                        facade:  req.body.facade,
                        b_wall:  req.body.b_wall,
                        balcony: req.body.balcony,
                        color:   req.body.color,
                        parking: req.body.parking,
                        res_units: req.body.res_units,
                        com_units: req.body.com_units,
                        off_units: req.body.off_units,
                        remarks: req.body.remarks
                    })
                res.send({status:"success", data:plotData})
                
            })
           
            .catch((error) => res.status(400).send(error))
    }
}