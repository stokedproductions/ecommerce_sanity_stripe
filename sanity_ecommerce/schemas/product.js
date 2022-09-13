export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      }
    },
    { 
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'subname',
      title: 'Sub Name',
      type: 'string',
    },
    { 
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'string',
    },
    { 
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'benifits',
      title: 'Benifits',
      type: 'array',
      of: [
        {
          type: 'benifitObject',
        }
      ]
    },
    { 
      name: 'details',
      title: 'Details',
      type: 'string',
    },
    {
      name: 'suggested_use',
      title: 'Suggested Use',
      type: 'string',
    },
    {
      name: 'side_effects',
      title: 'Side Effects',
      type: 'string'
    },
    {
      title: 'Brand',
      name: 'brand',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'brand'},
          ]
        }
      ]
    },
    {
      title: 'Categories',
      name: 'category',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'category'},
            // etc
          ]
        }
      ]
    },
  ]
}

const options = ['Strength', 'Muscle Gain', 'Sexual Aid', 
  'Fat/Water Loss', 'Side Effects', 'Keep Gains', 'Anti-Estrogen']
  
const benifitObject = {
  name: 'benifitObject',
  title: 'Product',
  type: 'document',
  fields: [
    {
      title: 'Benifit',
      name: 'name',
      type: 'string',
      options: {
        list: options,
        layout: 'checkbox'
      }
    },
    {
      type: 'Rating',
      name: 'rating',
      type: 'number',
    }
  ],
  initialValue: {
    name: '',
    rating: 0
  }
} 

export {benifitObject};