import mongodb from "mongodb"
// const ObjectId = mongodb.ObjectId
import { ObjectId } from 'mongodb';


let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if(reviews) return
        try {
            reviews = await conn.db("reviews").collection("reviews")
        } catch (error) {
            console.error(`Unable to establish collection handles in userDAO: ${error}`);
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId,
                user,
                review
            }

            return await reviews.insertOne(reviewDoc)
        } catch (error) {
            console.error(`Unable to post review: ${error}`);
            return { error: error }
        }
    }

    static async getReview(reviewId) {
        console.log(reviewId);
        try {
            return await reviews.findOne({
                _id: new ObjectId(reviewId)
            })
        } catch (error) {
            console.error(`Unable to get review: ${error}`);
            return { error: error } 
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user, review } }
            )

            return updateResponse
        } catch (error) {
            console.error(`Unable to update review: ${error}`);
            return { error: error }
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
            })

            return deleteResponse
        } catch (error) {
            console.error(`Unable to delete review: ${error}`);
            return { error: error }
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({
                movieId: parseInt(movieId)
            })

            return cursor.toArray()
        } catch (error) {
            console.error(`Unable to get review: ${error}`);
            return { error: error }
        }
    }
}
