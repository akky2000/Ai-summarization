// utils/queryHelper.js
export function buildQueryOptions(reqQuery, allowedFilters = {}) {
    const queryObj = { ...reqQuery };
    const exclude = ["page", "limit", "sort", "fields"];
    exclude.forEach((f) => delete queryObj[f]);
  
    // Advanced filtering (gte, gt, lte, lt)
    let filterStr = JSON.stringify(queryObj);
    filterStr = filterStr.replace(/\b(gte|gt|lte|lt)\b/g, (m) => `$${m}`);
    const filters = JSON.parse(filterStr);
  
    // Override with any fixed filters
    return { ...filters, ...allowedFilters };
  }
  
  export function applyQueryFeatures(query, reqQuery) {
    // Sorting
    if (reqQuery.sort) {
      query = query.sort(reqQuery.sort.split(",").join(" "));
    } else {
      query = query.sort("-createdAt");
    }
  
    // Field limiting
    if (reqQuery.fields) {
      query = query.select(reqQuery.fields.split(",").join(" "));
    } else {
      query = query.select("-__v");
    }
  
    // Pagination
    const page = Math.max(1, parseInt(reqQuery.page) || 1);
    const limit = Math.max(1, parseInt(reqQuery.limit) || 10);
    query = query.skip((page - 1) * limit).limit(limit);
  
    return { query, page, limit };
  }
  