import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Men = () => {

  const [product, setProduct] = useState([])

  const getProducts = async () => {

    try {

      const res = await axios.get('/api/product/all')

      const allProducts = res.data.data.data

      const menProducts = allProducts.filter(
        (item) => item.category.toLowerCase() === 'men'
      )

      setProduct(menProducts)


    } catch (error) {

    
      console.log(error)

    }

  }

  useEffect(() => {

    getProducts()

  }, [])

  return (

    <div className='max-w-7xl mx-auto px-4 py-8'>

      {/* Heading */}
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Men's Collection
        </h1>

        <span className='text-sm text-gray-500'>
          {product.length} Products
        </span>
      </div>

      {/* Empty State */}
      {
        product.length === 0 ? (

          <div className='flex items-center justify-center h-40 bg-gray-100 rounded-xl'>
            <p className='text-gray-500 text-lg'>
              No products found
            </p>
          </div>

        ) : (

          /* Product Grid */
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

            {
              product.map((p) => (

                <div
                  key={p._id}
                  className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100'
                >

                  {/* Product Image */}
                  <div className='w-full h-64 bg-gray-100 overflow-hidden'>

                    <img
                      src={p.image || 'https://via.placeholder.com/300'}
                      alt={p.name}
                      className='w-full h-full object-cover hover:scale-105 transition duration-300'
                    />

                  </div>

                  {/* Product Details */}
                  <div className='p-4'>

                    {/* Category */}
                    <span className='inline-block px-3 py-1 text-xs font-medium bg-black text-white rounded-full mb-3'>
                      {p.category}
                    </span>

                    {/* Name */}
                    <h2 className='text-lg font-semibold text-gray-800 mb-2 line-clamp-1'>
                      {p.name}
                    </h2>

                    {/* Description */}
                    <p className='text-sm text-gray-500 mb-4 line-clamp-2'>
                      {p.description}
                    </p>

                    {/* Price Section */}
                    <div className='flex items-center justify-between'>

                      <div>

                        <p className='text-xl font-bold text-black'>
                          ₹{p.price}
                        </p>

                        {
                          p.discount > 0 && (
                            <p className='text-sm text-green-600 font-medium'>
                              {p.discount}% OFF
                            </p>
                          )
                        }

                      </div>

                      {/* Button */}
                      <button className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition'>
                        Buy Now
                      </button>

                    </div>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  )

}

export default Men