const express = require('express');
const router = express.Router();
const insuranceService = require("../databaseServices/insurancedbservice");

router.get("/:id", (req, res) => {
    insuranceService.findOneById(req.params.id)
        .then(insurance => {
            console.log("insurance", insurance);

            if (insurance) {
                console.log("insu:", insurance);
                res.json(insurance);
                res.status(200).send();
            }

            else {
                res.send("Not Found");
                res.status(404);
            }
        });
});

/* THIS IS A PRELIMINARY PLAN FOR THE FEATURE
router.get("/user/:id", passport.authenticate('jwt',
{session: false}),  (req, res) => {
    if(req.user.role == "ADMIN") {
    insuranceService.findAllByUser(req.params.id)
        .then(insurances => {
            res.json(insurances);
        })
    } else {
        res.send("unauthorized")
    }
});
*/

router.get("/user/:id",  (req, res) => {
    insuranceService.findAllByUser(req.params.id)
        .then(insurances => {
            res.json(insurances);
        })
});

router.get("/", (req, res) => {
    insuranceService.findAll()
        .then (insurances => {
            res.json(insurances);
        });
});

router.post("/", (req, res) => {
    insuranceService.addOne(req.body)
        .then(result => {
            if (result.errors) {
                res.status(400);
            } else {
                res.status(201);
            }
            res.send(result);
        });
});

router.put("/", (req, res) => {
    insuranceService.updateOneById(req.body)
        .then(result => {
            console.log("RESULT", result);
            res.status(200);
            res.json(result);
        })
});

router.delete("/:id", (req, res) => {
    insuranceService.deleteOneById(req.params.id);
    res.status(204).send();
});

module.exports = router;