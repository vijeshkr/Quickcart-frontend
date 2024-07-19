import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import makeRequest from '../axios';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';

const CategoryProduct = () => {
  // State to store product data
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // Parse the query parameters
  const urlSearch = new URLSearchParams(location.search);
  // Get the list of categories from the url
  const urlCategoryListinArray = urlSearch.getAll("category");

  // Create an object with categories from the URL, setting them to true
  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });

  // State to manage selected categories
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  // State to manage filtered categories list
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  // State to manage sorting
  const [sortBy, setSortBy] = useState("");

  // State to manage visibility of sort modal and filter modal in smaller devices
  const [sortByModalVisible, setSortByModalVisible] = useState(false);
  const [filterByModalVisible, setFilterByModalVisible] = useState(false);

  // Function to fetch filtered product from the API
  const fetchData = async () => {
    try {
      const res = await makeRequest.post('/filter-product', {
        category: filterCategoryList
      });

      setData(res.data.data || []);

    } catch (error) {
      console.log(error.message);
    }
  }

  // Handle category selection
  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el);

    setFilterCategoryList(arrayOfCategory);

    // Format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  // Handle sorting option change
  const handleOnChangeSortBy = (e) => {
    const { value } = e.target

    setSortBy(value);

    if (value === 'asc') {
      setData(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }

    setSortByModalVisible(!sortByModalVisible)
  }

  useEffect(() => {

  }, [sortBy]);

  // Toggle sort by modal visibility
  const toggleSortByModal = () => {
    setSortByModalVisible(!sortByModalVisible);
  };

  // Toggle filter by model visibility
  const toggleFilterByModal = () => {
    setFilterByModalVisible(!filterByModalVisible);
  };

  return (
    <div className='container mx-auto p-4'>

      {/* Desktop version */}
      <div className='hidden sm:grid grid-cols-[200px,1fr]'>
        {/* Left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none'>
          {/* Sort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>


          {/* Filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3'>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>


        </div>


        {/* Right side ( product ) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div className='lg:hidden'>
        {/* Top bar with sort and filter buttons */}
        <div className='flex justify-between items-center p-2 bg-white'>
          <button className='text-sm font-medium text-slate-500' onClick={toggleSortByModal}>Sort by</button>
          <button className='text-sm font-medium text-slate-500' onClick={toggleFilterByModal}>Filter by</button>
        </div>

        {/* Sort by modal */}
        {sortByModalVisible && (
          <div className='bg-white p-4 fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-base uppercase font-medium text-slate-500'>Sort by</h3>
              <button className='text-sm font-medium text-slate-500' onClick={toggleSortByModal}>Close</button>
            </div>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
        )}

        {/* Filter by modal */}
        {filterByModalVisible && (
          <div className='bg-white p-4 fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-base uppercase font-medium text-slate-500'>Category</h3>
              <button className='text-sm font-medium text-slate-500' onClick={toggleFilterByModal}>Close</button>
            </div>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3' key={index}>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>
        )}

        {/* Product list */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default CategoryProduct