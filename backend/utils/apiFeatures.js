class ApiFeatures {
  constructor(query, queryStr) {
    // query meaning anything after a ?
    this.query = query;

    // search by word keyword = "John Green"
    this.queryStr = queryStr;

    // console.log("query", query);
    // console.log("queryStr", queryStr);
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          bookName: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeItems = ["keyword", "page", "limit"];
    removeItems.forEach((item) => delete queryCopy[item]);

    // filter for price and ratings (ranges)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skipPage = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skipPage);
    return this;
  }
}

module.exports = ApiFeatures;
