
exports.fetchApiInstructions = () => {
    const JSON = 
    {
        "GET /api": {
          "description": "serves up a json representation of all the available endpoints of the api"
        },
        "GET /api/categories": {
          "description": "serves an array of all categories",
          "queries": [],
          "exampleResponse": {
            "categories": [
              {
                "description": "Players attempt to uncover each other's hidden role",
                "slug": "Social deduction"
              }
            ]
          }
        },
        "GET /api/reviews": {
          "description": "serves an array of all reviews",
          "queries": ["category", "sort_by", "order"],
          "exampleResponse": {
            "reviews": [
              {
                "title": "One Night Ultimate Werewolf",
                "designer": "Akihisa Okui",
                "owner": "happyamy2016",
                "review_img_url": "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "category": "hidden-roles",
                "created_at": 1610964101251,
                "votes": 5
              }
            ]
          }
        }
      }
          
}