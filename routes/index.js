var express = require('express');
var router = express.Router();


const plotController = require('../controllers/plotController');
const roadController = require('../controllers/roadController');
const thromdeController = require('../controllers/thromdeController')
const footpathController = require('../controllers/footpathController')
const imageController = require('../controllers/imageController')
const { pool } = require('../dbconfig');
const buildingController = require('../controllers/buildingController');
const pointController = require('../controllers/pointController');
const point = require('../src/models/point');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'CDRS' });
});


/************** LAP SELECTION ROUTES *********************** */
router.get('/api/get-thromdes', (req, res) => {
  pool.query('SELECT * FROM thromdes', (err, results) => {
    res.send(results.rows)
  })
})
router.get('/api/get-laps/:thromde_id', thromdeController.getLapbyThromde)

/*************** POINT FEATURE ROUTES *****************************************/
router.post('/api/points/add-point', pointController.add)
router.get('/api/points/get-all/:lap_id', pointController.getByLap)
router.get('/api/points/get-point/:id', pointController.findSpecific)
router.put('/api/points/update-point/:id', pointController.update)

/********************** PLOT TABLE ROUTES ******************************************** */
router.get('/api/plots/get-plot/:fid', plotController.getSpecific)
router.post('/api/plots/add-plot', plotController.add);
router.put('/api/plots/update-plot/:fid', plotController.update)

/********************** FOOTPATH TABLE ROUTES ******************************************** */
router.get('/api/footpaths/get-all', footpathController.list);
router.post('/api/footpaths/add-path', footpathController.add);
router.get('/api/footpaths/get-path/:fid', footpathController.getSpecific);
router.put('/api/footpaths/update-path/:fid', footpathController.update)


//
router.get('/api/buildings/get-all/:lap_id', (req, res) => {
  let lap_id = parseInt(req.params.lap_id)
  pool.query(`SELECT * FROM buildings WHERE lap_id = ${lap_id}`)
})

/********************** ROAD TABLE ROUTES ******************************************** */
router.get('/api/roads/get-all', roadController.list);
router.post('/api/roads/add-road', roadController.add);
router.get('/api/roads/get-road/:fid', roadController.getSpecific)
router.put('/api/roads/update-road/:fid', roadController.update)

/********************** IMAGE TABLE ROUTES ******************************************** */
router.post('/api/images/add-image', imageController.createImage)
router.get('/api/images/get-image/:ftype/:fid', imageController.getImage)



/********************** IMAGE TABLE ROUTES ******************************************** */
router.get('/api/buildings/get-all', buildingController.list);
router.get('/api/buildings/get-building/:id', buildingController.getbuildingDetail);
router.post('/api/buildings/add-building', buildingController.add)
router.put('/api/buildings/update-building/:building_id', buildingController.update)


/********************** Set Status Done on Shapefiles******************** */

router.put('/api/plots/set-done/:object_id', (req, res) => {
  let object_id = parseInt(req.params.object_id)
  pool.query(`
  UPDATE plots_shape SET done = 'true' WHERE  gid = ${object_id}
  `, (err, ress) => {
    if (err) {
      throw err
    }
    res.send(ress)
  });
})

router.put('/api/roads/set-done/:object_id', (req, res) => {
  let object_id = parseInt(req.params.object_id)
  pool.query(`
  UPDATE roads_shape SET done = 'true' WHERE  gid = ${object_id}
  `, (err, ress) => {
    if (err) {
      throw err
    }
    res.send(ress)
  });
})

router.put('/api/buildings/set-done/:building_id', (req, res) => {
  let building_id = parseInt(req.params.building_id)
  pool.query(`
  UPDATE buildings_shape SET done = 'true' WHERE  structure_ = ${building_id} 
  `, (err, ress) => {
    if (err) {
      throw err
    }
    res.send(ress)
  });
})

router.put('/api/footpaths/set-done/:object_id', (req, res) => {
  let object_id = parseInt(req.params.object_id)
  pool.query(`
  UPDATE footpaths_shape SET done = 'true' WHERE  gid = ${object_id}
  `, (err, ress) => {
    if (err) {
      throw err
    }
    res.send(ress)
  });
})



/************************** Get SHAPEFILE BY LAPs************************************* */

router.get('/api/shapefile/get-plots/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs)  - 'geom'
      ) AS feature  
      FROM (SELECT * FROM plots_shape where lap_id= ${lap_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})


//get PRopoposals Shape
router.get('/api/shapefile/get-proposals/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs)  - 'geom'
      ) AS feature  
      FROM (SELECT * FROM proposals_shape where lap_id= ${lap_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

//setProposals Done
router.put('/api/proposals/set-done/:gid', (req, res) => {
  let object_id = parseInt(req.params.object_id)
  pool.query(`
  UPDATE proposals_shape SET done = 'true' WHERE  gid = ${object_id}
  `, (err, ress) => {
    if (err) {
      throw err
    }
    res.send(ress)
  });
})

router.put('/api/proposals/updateRemarks', (req, res) => {
  pool.query(`
  UPDATE proposals_shape SET remarks = '${req.body.remarks}' WHERE  gid = ${Number(req.body.fid)}
  `, (err, ress) => {
    if (err) {
      throw err
    }
    res.send(ress)
  });
})



//get Wetlands Shape
router.get('/api/shapefile/get-wetlands/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs)  - 'geom'
      ) AS feature  
      FROM (SELECT * FROM proposals_shape where lap_id= ${lap_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})


router.get('/api/shapefile/get-plots/:gid', (req, res) => {
  let gid = req.params.gid
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM plots_shape where gid= ${gid}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

//building Shapefile routes
router.get('/api/shapefile/get-buildings/:lap_id', (req, res) => {
  let lap_id = parseInt(req.params.lap_id)
  pool.query(`SELECT jsonb_build_object(
    'type',     'FeatureCollection',
    'features', jsonb_agg(features.feature)
)
FROM (
  SELECT jsonb_build_object(
    'type',       'Feature',
    'geometry',   ST_AsGeoJSON(geom)::jsonb,
    'properties', to_jsonb(inputs)  - 'geom'
  ) AS feature  
  FROM (SELECT * FROM buildings_shape where lap_id= ${lap_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})


//get roads by lapID
router.get('/api/shapefile/get-roads/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM roads_shape where lap_id= ${lap_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

router.get('/api/shapefile/get-footpaths/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM footpaths_shape where lap_id= ${lap_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})



/************************** Charts Data Api ************************************* */

//Get total plot count and plot area details
router.get('/api/charts/plot_details/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`
  SELECT 
  COUNT(plots_shape.area_acres),SUM(plots_shape.area_acres)
  FROM plots_shape  
    WHERE plots_shape.lap_id = ${lap_id}`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0])
  })
})


// Get development status summary of laps --> plot counts 
router.get('/api/charts/d_status_precinct/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`
  SELECT 
  plots.d_status, COUNT(plots.d_status), SUM(plots_shape.area_acres)
  FROM plots INNER JOIN plots_shape 
    ON plots.fid = plots_shape.gid  
    WHERE plots.lap_id = ${lap_id} AND plots.d_status IS NOT NULL 
  GROUP BY plots.d_status`, (err, results) => {
    if (err) {
      throw err
    }
    let labels = [];
    let plotCounts = [];
    let totalArea = [];
    results.rows.forEach(element => {
      labels.push(element.d_status);
      plotCounts.push(element.count)
      totalArea.push(parseFloat(element.sum).toFixed(2))
    });
    res.send([labels, plotCounts, totalArea])
  })
})

//Get precinct details-> plot counts by percinct and areaa
router.get('/api/charts/precinct_stats/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`
  SELECT 
   precinct, COUNT(precinct) as count, SUM(area_acres)
  FROM plots_shape
    WHERE lap_id = ${lap_id} AND precinct IS NOT NULL 
  GROUP BY precinct ORDER BY count DESC `, (err, results) => {
    if (err) {
      throw err
    }
    let labels = [];
    let plotCounts = [];
    let totalArea = [];
    results.rows.forEach(element => {
      labels.push(element.precinct);
      plotCounts.push(element.count)
      totalArea.push(parseFloat(element.sum).toFixed(2))
    });
    console.log(totalArea)
    res.send([labels, plotCounts, totalArea])
  })
})

// Joined shapefile and exel table data
router.get('/api/analysis/plots/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM plots_shape FULL OUTER JOIN plots on plots.fid = plots_shape.gid where  plots_shape.lap_id= ${lap_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

router.get('/api/analysis/roads/:lap_id', (req, res) => {
  let lap_id = req.params.lap_id
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM roads_shape FULL OUTER JOIN roads on roads.fid = roads_shape.gid where  roads_shape.lap_id= ${lap_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

router.get('/api/shapefile/get-chiwogs/:dzo_id', (req, res) => {
  let dzo_id = req.params.dzo_id
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM chiwogs where dzo_id= ${dzo_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

router.get('/api/shapefile/get-test-center/:dzo_id', (req, res) => {
  let dzo_id = req.params.dzo_id
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM testcenters where dzo_id= ${dzo_id}) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

router.get('/api/shapefile/get-dzongkhags', (req, res) => {
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM dzongkhags) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

router.get('/api/shapefile/get-sheets/:dzoId', (req, res) => {
  let dzo_id = req.params.dzoId;
  pool.query(`SELECT sheetslink,name  FROM dzongkhags where dzo_id= ${dzo_id}`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0])
  })
})

router.get('/api/shapefile/get-redcluster/dzo/:dzo_id', (req, res) => {
  let dzo_id = req.params.dzo_id
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM redclusters where dzo_id= ${dzo_id} AND status ='ACTIVE') inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

router.get('/api/shapefile/get-redcluster/zone/:subzoneId', (req, res) => {
  let subZoneId = req.params.subzoneId
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM redclusters where  zone_id = ${subZoneId} AND status ='ACTIVE') inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})



router.get('/api/shapefile/get-redcluster/megazone/:megazone', (req, res) => {
  let megazone = req.params.megazone
  pool.query(`SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(features.feature)
  )
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(inputs)  - 'geom'
    ) AS feature  
    FROM (SELECT * FROM redclusters where megazone = ${megazone} AND status ='ACTIVE') inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

// REDCLUSTER STATS

router.get('/api/redcluster/get-stats/zone/:subzoneId', (req, res) => {
  let subZoneId = req.params.subzoneId
  pool.query(`Select id,name,status from public.redclusters where zone_id = ${subZoneId} AND status = 'ACTIVE'; `, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0])
  })
})

router.get('/api/redcluster/get-stats/megazone/:megazone', (req, res) => {
  let megazone = req.params.megazone
  pool.query(`Select id,name,status from public.redclusters where megazone = ${megazone} AND status = 'ACTIVE'; `, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0])
  })
})
router.get('/api/redcluster/get-stats/dzo/:dzo', (req, res) => {
  let dzo_id = req.params.dzo_id
  pool.query(`Select id,name,status from public.redclusters where dzo_id = ${dzo_id} AND status = 'ACTIVE'; `, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0])
  })
})

module.exports = router;


