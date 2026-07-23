const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tour-simple.json`)
);

exports.checkid = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

// to check body exists 
exports.checkbody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      message: 'Invalid ID'

    });
  }
  next();
};

exports.getalltours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'sucess',
    requestedat: 'req.requestTime',
    data: {
      tours
    }

  });
}

exports.gettour = (req, res) => {
  console.log(req.params);
  const newid = req.params.id;
  const tour = tours.find(el => el.id === id);
  res.status(200).json({
    status: 'sucess',
    data: {
      tour
    }
  });
}
exports.createTour = (req, res) => {
  // Generate a new ID based on the last item in the array
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  // Write the updated array back to the JSON file
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`, // Fixed path!
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  // Note: ID validation is handled by the checkID middleware from Step 1!
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deletetour = (req, res) => {
  res.status(204).json({
    status: 'sucess',
    data:
      null

  });
};