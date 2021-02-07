const thromdes = require('../src/models').thromdes
const lap = require('../src/models').lap

module.exports = {
    list(req, res){
        return thromdes
            .findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) => {res.status(400).send(error)})
    },

    getAllLaps(req, res){
        return lap
            .findAll()
            .then((data) => res.status(200).send(data))
            .catch((error) =>{res.status(400).send(error)} )
    },

    getLapbyThromde(req,res){
        return lap  
            .findAll({
                where: {
                    thromde_id: req.params.thromde_id
                  }
            })
            .then((data) => res.status(200).send(data))
            .catch((error) => {res.status(400).send(error)})
    }

}