const { ObjectId } = require("mongodb");
const db = require("../db/mongo_db");

const CafeReview = {
	collection: "cafe_reviews",
	async getCafeReviewsById(cafe_id) {
		const queryJson = { cafe_id: new ObjectId(cafe_id) };
		const reviews = await db.query(this.collection, "find", queryJson);

		return reviews;
	},
	async insertCafeReview(cafe_id, reviewer, content, starring) {
		const queryJson = {
			cafe_id: new ObjectId(cafe_id),
			reviewer: reviewer,
			content: content,
			starring: starring,
			date: new Date(),
			likes: 0,
		};

		await db.query(this.collection, "insert", queryJson);
	},
	async getCafeReviewByLikeUserId(review_id, email) {
		const queryJson = {
			_id: new ObjectId(review_id),
			like_users: email,
		};
		const review = await db.query(this.collection, "findOne", queryJson);

		return review;
	},
	increaseLikeCnt(review_id, email, added_cnt) {
		const queryJson = {
			_id: new ObjectId(review_id),
		};
		const updateJson = {
			$inc: { likes: +added_cnt },
			$push: { like_users: email },
		};

		db.query(this.collection, "updateOne", queryJson, updateJson);
	},
	async insertCafeReview(cafeId, reviewer, content, starring) {
		const queryJson = {
			cafe_id: new ObjectId(cafeId),
			reviewer: reviewer,
			content: content,
			starring: starring,
			date: new Date(),
			likes: 0,
			like_users: [],
		};
		const result = await db.query(this.collection, "insertOne", queryJson);

		return result;
	},
	async deleteCafeReview(cafeId, reviewId, email) {
		const queryJson = {
			_id: new ObjectId(reviewId),
			cafe_id: new ObjectId(cafeId),
			reviewer: email, // 요청한 사용자 검증
		};
		const result = await db.query(this.collection, "deleteOne", queryJson);

		return result;
	},
};

module.exports = CafeReview;
