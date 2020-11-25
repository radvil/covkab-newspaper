class Querify {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // define every req.query inside a const queryObject;
    const queryObj = { ...this.queryString };
    // define which query to be excluded;
    const excField = ["page", "sort", "limit", "fields"];
    // delete every key value pair in the query param/ queryObject;
    excField.forEach((el) => delete queryObj[el]);

    // extract queryObject into a string inside a new variable;
    let objectStr = JSON.stringify(queryObj);
    // ?? replace any match string with $matchString;
    objectStr = objectStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    // set all queries into this.query.find() method;
    this.query = this.query.find(JSON.parse(objectStr));
    // return query along with queryObject;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = Querify;
