const { Shoe } = require('../models');

module.exports = {
    get: {
        all(req, res, next) {

            Shoe
                .find({})
                .lean()
                .then((shoes) => {
                    console.log(shoes);
                    res.render('./shoes/shoes.hbs', {
                        shoes
                    });
                })
                .catch((e) => console.log(e));
        },

        create(req, res, next) {
            res.render('./shoes/create.hbs');
        },

        details(req, res, next) {

            Shoe
                .findOne({ _id: req.params.shoeId })
                .lean()
                .then((shoe) => {
                    res.render('./shoes/details.hbs', { ...shoe });
                })
        },

        edit(req, res, next) {

            Shoe
                .findOne({ _id: req.params.shoeId })
                .then((shoe) => {
                    res.render('./shoes/edit.hbs', shoe);
                });
        },

        delete(req, res, next) {

            Shoe
                .deleteOne({ _id: req.params.shoeId })
                .then((result) => {
                    res.redirect('/shoes/all');
                })
        }

    },

    post: {
        create(req, res, next) {
            Shoe
                .create({ ...req.body, salesman: req.user._id })
                .then((createdShoeOffer) => {
                    console.log(createdShoeOffer);
                    res.redirect('/shoes/all');
                });
        },

        edit(req, res, next) {

            const { shoeId } = req.params;

            Shoe
                .updateOne(
                    { _id: shoeId },
                    { $set: { ...req.body } }
                ).then((updatedShoeOffer) => {
                    res.redirect(`/shoes/details/${shoeId}`)
                })
        }
    }
}