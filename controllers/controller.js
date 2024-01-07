import Dev from '../models/programuotojas.js'

const handleErrors = (err) => {
    let errors = {vardas: '', tech: '', laisvas: '', location: ''}
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
}

export const prog_get = (req, res) => {
    const lng = parseFloat(req.query.lng)
    const lat = parseFloat(req.query.lat)

    console.log('Parsed Coordinates:', lng, lat)

    Dev.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                distanceField: 'distance',
                spherical: true,
                maxDistance: 100000

            }
        }
    ])
    .then(devs => {
        console.log('Found Developers:', devs)
        res.send(devs)
    })
    .catch(error => {
        console.error('Error:', error)
        res.status(500).send(error.message)
    })
}

export const prog_post = async (req, res) => {
    const {vardas, tech, laisvas, location} = req.body
    try {
        const dev = await Dev.create({vardas, tech, laisvas, location})
        res.status(201).json({dev: dev._id})
    } catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

export const prog_put = (req, res) => {
    Dev.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Dev.findOne({_id: req.params.id})
                .then(dev => res.send(dev))
        })
        .catch(err => console.log(err))
}

export const prog_details_get = (req, res) => {
    Dev.findById(req.params.id)
        .then(async (result) => res.render('edit', { dev: result}))
        .catch(err => console.log(err));
}

export const prog_delete = (req, res) => {
    Dev.findByIdAndDelete({_id: req.params.id})
        .then(dev => res.send(dev))
        .catch(err => console.log(err))
}