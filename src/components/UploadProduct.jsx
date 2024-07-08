import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import makeRequest from '../axios';

const UploadProduct = ({
    onClose,
    fetchdata
}) => {
    // State to manage form data
    const [data, setData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: 0,
        sellingPrice: 0,
    });
    // State to manage uploaded product image
    const [productImages, setProductImages] = useState([]);
    // State to manage full screen image view
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState('');

    // Handle input change in the form
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // Handle file upload for product image
    const handleUploadProduct = (e) => {
        const files = Array.from(e.target.files);
        setProductImages((prevImages) => [...prevImages, ...files]);

        
    };

    // Handle deletion for a product image
    const handleDeleteProductImage = (index) => {
        setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload images
            const formData = new FormData();
            productImages.forEach((file) => formData.append('files', file));
            const uploadRes = await makeRequest.post('/upload', formData);
            const productImagesUrls = uploadRes.data.fileUrls;

            // Submit product data with image URLs
            const productData = { ...data, productImage: productImagesUrls };
            const productRes = await makeRequest.post('/products', productData);
            console.log('Product created:', productRes.data);

            // Refresh data and close modal
            fetchdata();
            onClose();
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };
    return (
        <div className='fixed w-full h-full bg-bgRose bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-semibold'>Upload Product</h2>
                    <div onClick={onClose} className='w-fit ml-auto text-xl hover:text-primaryColor cursor-pointer'>
                        <CgClose />
                    </div>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        value={data.productName}
                        onChange={handleOnChange}
                        type='text'
                        id='productName'
                        placeholder='Enter product name'
                        name='productName'
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
                    <input
                        value={data.brandName}
                        onChange={handleOnChange}
                        type='text'
                        id='brandName'
                        placeholder='Enter brand name'
                        name='brandName'
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select
                        value={data.category}
                        onChange={handleOnChange}
                        required
                        name='category'
                        className='p-2 bg-slate-100 border rounded'
                    >
                        <option value=''>Select Category</option>
                        {productCategory.map((item, index) => (
                            <option value={item.value} key={item.value + index}>{item.label}</option>
                        ))}
                    </select>

                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input
                                    type='file'
                                    id='uploadImageInput'
                                    className='hidden'
                                    onChange={handleUploadProduct}
                                    multiple
                                />
                            </div>
                        </div>
                    </label>
                    <div>
                        {productImages.length > 0 ? (
                            <div className='flex items-center gap-2'>
                                {productImages.map((el, index) => (
                                    <div className='relative group' key={index}>
                                        <img
                                            src={URL.createObjectURL(el)}
                                            alt='product'
                                            width={80}
                                            height={80}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(URL.createObjectURL(el));
                                            }}
                                        />
                                        <div
                                            className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                            onClick={() => handleDeleteProductImage(index)}
                                        >
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs'>*Please upload product image</p>
                        )}
                    </div>

                    <label htmlFor='price' className='mt-3'>Price :</label>
                    <input
                        value={data.price}
                        onChange={handleOnChange}
                        type='number'
                        id='price'
                        placeholder='Enter price'
                        name='price'
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        type='number'
                        id='sellingPrice'
                        placeholder='Enter selling price'
                        name='sellingPrice'
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='description' className='mt-3'>Description :</label>
                    <textarea
                        value={data.description}
                        onChange={handleOnChange}
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='Enter product description'
                        rows={3}
                        name='description'
                    >
                    </textarea>

                    <button className='px-3 py-2 bg-primaryColor text-white mb-10 hover:bg-rose-600'>Upload Product</button>
                </form>
                {openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )}
            </div>
        </div>
    );
};

export default UploadProduct;