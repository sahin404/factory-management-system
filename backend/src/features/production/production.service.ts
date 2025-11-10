import Production from "./production.model";

// get product
export const getProduct = async (searchQuery?: string, page: number = 1) => {
  const filter = searchQuery
    ? { name: { $regex: searchQuery, $options: "i" } }
    : {};

  const limit = 5;
  const products = await Production.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Production.countDocuments(filter);
  if (!products) throw new Error("No Product Found!");

  return { products, total };
};

// get a Product by id
export const getProductById = async (productId: string) => {
  const product = await Production.findById(productId);
  return product;
};

// update quanty of a product
export const updateProductQuantity = async (productId: string, newQuantity: number) => {
  const product = await Production.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }
  product.quantity += newQuantity;

  const updatedProduct = await product.save();

  return updatedProduct;
};


// update all field of a product
export const updateProduct = async (productId: string, updatedData: any) => {
  const updatedProduct = await Production.findByIdAndUpdate(
    productId,
    updatedData,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) throw new Error("Product not found");

  return updatedProduct;
};
