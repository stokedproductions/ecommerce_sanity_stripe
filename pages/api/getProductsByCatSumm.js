import { client } from "../../lib/client"

export default async function handler(req, res) {    
    const productsByCategoryQuery = `*[_type == 'category']{
        _id,
        type,
        slug,
        title,
        "products" : *[_type == 'product' && references(^._id)][0...5]{
                  "brand": brand[]->{title, slug}, 
                  "category": category[]->{title, slug},
                  image, name, slug, price, _id
                }
      }`
    const error = 'Something when wrong :(';
    const productByCatergory = await client.fetch(productsByCategoryQuery);
    res.status(productByCatergory ? 200 : 400).json(productByCatergory ? { productByCatergory } : { error })
}
