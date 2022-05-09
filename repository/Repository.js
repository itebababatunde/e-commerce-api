class Repository {
  constructor(model) {
    this.model = model
  }
  async create(body) {
    const data = await this.model.create(body)

    return data
  }

  async findById(id) {
    const data = await this.model.findById(id)
    return data
  }

  async findOne(filter, select) {
    let query = this.model.findOne(filter)
    if (select) query = query.select(select)

    const data = await query
    return data
  }

  async find(filter) {
    const data = await this.model.find(filter)
    return data
  }

  async findByIdAndDelete(id) {
    await this.model.findByIdAndDelete(id)
  }

  async findOndeAndDelete(filter) {
    await this.model.findOneAndDelete(filter)
  }

  async findByIdAndUpdate(id, update) {
    await this.model.findByIdAndUpdate(id, update)
  }

  async deleteMany(filter) {
    await this.model.deleteMany(filter)
  }

  //   async findAndPaginate(
  //     filter,
  //     page,
  //     limit,
  //     sort
  //     select: string | null = null
  //   ): Promise<PaginatedResult<T>> {
  //     const totalDocuments = await this.model.countDocuments(filter);
  //     const totalPages = Math.ceil(totalDocuments / limit);
  //     const currentPage = page;
  //     const nextPage = page + 1 <= totalPages ? page + 1 : null;
  //     const prevPage = page - 1 >= 0 ? page - 1 : null;

  //     let query = this.model
  //       .find(filter)
  //       .sort(sort)
  //       .skip((page - 1) * limit)
  //       .limit(limit);

  //     if (select) query = query.select(select);

  //     const data = await query;
  //     return {
  //       totalDocuments,
  //       totalPages,
  //       currentPage,
  //       nextPage,
  //       prevPage,
  //       data,
  //     };
  //   }
  // }
}

export default Repository
