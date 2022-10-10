const express = require("express");
const app = express();
const employeeRoute = express.Router();
let Employee = require("../model/Employee");


// Add Employee

employeeRoute.route('/add-employee').post((req, res, next) => {
    Employee.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

// get all employee

employeeRoute.route('/').get((req, res,next) => {
    Employee.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

// Get Employye by Id

employeeRoute.route('/read-employee/:id').get((req, res,next) => {
    Employee.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
});

// Update employee

employeeRoute.route('/update-employee/:id').put((req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Employee Updated successful !')
        }
    })
})


// Delete employee

employeeRoute.route('/delete-employee/:id').put((req, res, next) => {
    Employee.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = employeeRoute;