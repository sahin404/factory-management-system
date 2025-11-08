import Production from "./production.model";

// get product
export const getProduct = async (searchQuery?:string, page:number=1) => {
  const filter = searchQuery? { name: { $regex: searchQuery, $options: "i" } } : {};

  const limit = 5;
  const products = await Production.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Production.countDocuments(filter);
  if (!products) throw new Error("No Product Found!");

  return {products,total};
};

