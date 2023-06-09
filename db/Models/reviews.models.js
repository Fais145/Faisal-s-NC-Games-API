const db = require("../connection");

exports.fetchAllReviews = (category,sort,order) => {
  if(!sort) sort = 'created_at'
  if(!order) order = 'desc'

  const reviewColumns = ['owner','title','designer','review_img_url','category','created_at','votes','review_id','comment_count']

  if(!reviewColumns.includes(sort)){
    return Promise.reject({status:400,msg:'Invalid sort query'})
  }

  if(!['asc','desc'].includes(order)){
    return Promise.reject({status:400,msg:'Invalid order query'})
  }
  
  let dbQueryStr = ''
  let dbParamArr = []

if(category){
 dbQueryStr = 'WHERE category = $1'
 dbParamArr.push(category)
}
  return db
    .query(
      `SELECT reviews.review_id, owner, title, designer, review_img_url, category, reviews.created_at, reviews.votes, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id ` +dbQueryStr+
    ` GROUP BY reviews.review_id 
    ORDER BY ${sort} ${order};`,dbParamArr
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchAReview = (ID) => {
  return db
    .query(`SELECT reviews.title,reviews.review_id,reviews.review_body, reviews.votes,reviews.category,reviews.designer,reviews.owner,reviews.review_img_url, reviews.created_at, COUNT(comments.comment_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;`, [ID])
    .then((data) => {
      const review = data.rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review ID ${ID}`,
        });
      }
      return data.rows[0];
    });
};

exports.updateReview = (ID, votes) => {
  return db
    .query(
      `UPDATE reviews SET votes = CASE WHEN votes + $1 < 0 THEN 0 ELSE votes + $1 END WHERE review_id = $2 RETURNING*;`,
      [votes, ID]
    )
    .then(({ rows }) => {
        if(rows.length === 0){
          return Promise.reject({status:404, msg: 'Review ID does not exist'})
        }
      return rows;
    });
};

exports.checkReviewExists = (ID) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [ID])
    .then((result) => {
      if (result.rowCount === 0) {
        return Promise.reject({
            status: 404,
            msg: `review ID ${ID} does not exist`,
          });
      }
    });
};

