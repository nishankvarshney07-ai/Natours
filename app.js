const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
// app.get('/',(req,res) =>{
//     res
//     .status(200)
//     .json({message: "hello from the server side!", app :'natours'});
// });
// app.post('/',(req,res) =>{
//     res.send('you can get post to this endpoint')
// });
const tour = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tour-simple.json`)
);
app.get('/api/v1/tours/:id', (req, res) => {
 console.log(req.params);
 const x = tour.find(el => el.id === req.params.id*1);
 if(!x){
    res.status(404).json({
        status: 'fail',
        message:'invalid id'
    });
 }

    res.status(200).json({
        status: 'success',
        results: tour.length,
        data: {
            x
        }
    });
});
app.post('/api/v1/tours', (req, res) => {
    const newId = tour[tour.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tour.push(newTour);

    fs.writeFile
        (`${__dirname}/dev-data/data/tour-simple.json`,
            JSON.stringify(tour),
            err => {
                res.status(201).json({
                    status: 'sucess',
                    data: {
                        tour: newTour
                    }
                });

            }
        );
})
const port = 3000;

app.listen(port, () => {
    console.log(`app running on port ${port}....`);
});