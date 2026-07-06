// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },

//     description: String,

//     image: {
//         filename: {
//             type: String,
//             default: "listingimage"
//         },
//         url: {
//             type: String,
//             default: "https://images.pexels.com/photos/30994370/pexels-photo-30994370.jpeg?cs=srgb&dl=pexels-optical-chemist-340351297-30994370.jpg&fm=jpg"
//         },
//     owner: {
//     type: Schema.Types.ObjectId,
//     ref: "User", // This should match the name of your User model
//   },
//     },

//     price: Number,
//     location: String,
//     country: String,

//     reviews: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Review"
//         }
//     ]
// });

// const Listing = mongoose.model("Listing", listingSchema);

// module.exports = Listing;







const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.pexels.com/photos/30994370/pexels-photo-30994370.jpeg?cs=srgb&dl=pexels-optical-chemist-340351297-30994370.jpg&fm=jpg"
        },
    }, // <--- The closing brace MUST be here
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
