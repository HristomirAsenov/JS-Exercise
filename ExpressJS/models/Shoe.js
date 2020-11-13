module.exports = (mongoose) => {

    const { Schema, model: Model } = mongoose;
    const { String, ObjectId, Number } = Schema.Types;

    const shoeSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        salesman: {
            type: ObjectId,
            required: true
        },
        buyers: [
            {
                type: ObjectId,
                ref: "User"
            }
        ]
    });

    return Model('Shoe', shoeSchema);
};