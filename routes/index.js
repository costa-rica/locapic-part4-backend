var express = require('express');
var router = express.Router();

const Place = require('../models/place');

/* GET home page. */
router.get('/ca_marche', function (req, res, next) {
    console.log("- dans GET ca_marche 📢")
    res.json({ reponse: "Oui !" })
});


/* POST */
router.post('/places', (req, res) => {
    console.log("- dans POST /places 📝")
    // const data = req.body;
    // for (let key in data) {
    //     console.log(`${key}: ${data[key]}`);
    // }
    
    console.log(`req.body.newPlaces: ${req.body.newPlace}`);

    const { nickname, name, latitude, longitude } = req.body
    console.log(`nickname: ${nickname}`)
    console.log(`name: ${name}`)
    console.log(`latitude: ${latitude}`)
    console.log(`longitude: ${longitude}`)

    if (nickname, name, latitude, longitude) {
        console.log(`on a arrivé 🚩`)

        const newPlace = new Place({
            nickname: nickname,
            name: name,
            latitude: latitude,
            longitude: longitude
        })

        newPlace.save().then(data => {
            console.log('reussi a sauvgaruder 👀')
            console.log(data)
        })
    } else {
        console.log(`on n'a PAS arrivé 🚩`)
    }
    res.json({ result: true })
});


router.get('/places/:nickname', (req, res) => {
    console.log(`- dans GET /places/:${req.params.nickname} 🚩`)
    const nickname = req.params.nickname

    Place.find({ nickname: { $regex : new RegExp(nickname, "i")  } }).then(data => {
        console.log(`- found nickname data`)
        let placesData=[]
        data.map(elem =>{
            placesData.push({nickname:elem.nickname, name:elem.name, latitude:elem.latitude, longitude:elem.longitude})
        })
        res.json({ result: true, places: placesData })
    })
})


router.delete('/places', (req,res) => {
    console.log(`- dans DELETE /places 📢`)
    const { nickname, name } = req.body
    console.log(`nickname: ${nickname}`)
    console.log(`name: ${name}`)

    if (nickname, name){
        Place.deleteOne({nickname:nickname,name:name})
            .then(() =>{
                console.log(`- delete reussite 🔴`)
                res.json({result:true})
            })
    } else {
        res.json({result: false})
    }

})




module.exports = router;
