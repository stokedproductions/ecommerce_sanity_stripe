import { client } from "../../lib/client"

export default async function handler(req, res) {
  const brandQuery = `*[_type == 'brand']{title, "slug": slug.current, _id}`;
  const brandData = await client.fetch(brandQuery);
  const categoryQuery = `*[_type == 'category']{title, "slug": slug.current, _id}`;
  const categoryData = await client.fetch(categoryQuery);
  res.status(200).json({ brandData, categoryData })
}
