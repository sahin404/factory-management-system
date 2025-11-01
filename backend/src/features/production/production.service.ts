import Product from "./production.model"

// add product
export const addProduct = async(num:number)=>{
    const product = await Product.findOne();
    if(!product) throw new Error('No Product Found!');
    
    product.product += num;
    await product.save();

    return product;
}

// get product
export const getProduct = async () => {
  const product = await Product.findOne();
  if (!product) throw new Error("No Product Found!");
  
  return product;
};