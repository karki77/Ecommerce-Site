import mongoose  from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: String,
    comment: String,
    
})

const productSchema = new mongoose.Schema(
    brand: {
        type: String,
    }
)