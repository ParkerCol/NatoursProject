const fs = require('fs');

//Read the data json file and parse it an array

const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8')
);

// User Router Callbacks
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    //Use Jsend format
    status: 'success',
    results: userData.length,
    data: {
      users: userData,
    },
  });
};

exports.getUserId = (req, res) => {
  console.log(req.params);
  // Loops through array until it finds the id that matches the request and returns the object in an array
  const userFind = userData.find((el) => el._id === req.params._id);

  if (!userFind) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        user: userFind,
      },
    });
  }
};
