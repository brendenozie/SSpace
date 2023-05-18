import React, { useEffect, useState } from "react";
import ContentBox from "../components/contents/ContentBox";
import ProductDisplaySection from "../components/productDisplaySection/ProductDisplaySection";
import PageWrapper from "../components/PageWrapper";
import Button from "../components/Button";
import Dropdown from '../components/productcategorydropdown/ProductCategoryDropDown';
import Dropsubdown from '../components/productsubcategorydropdown/ProductSubCategoryDropDown';
import axios from "axios";
import Compressor from 'compressorjs';
import { useParams } from "react-router-dom";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const items = [
  {
    id: 1,
    value: 'Cabinetry',
    subcat:['Bathroom cabinet',
            'Chifforobe',
            'Closet',
            'Credenza',
            'Cupboard',
            'Curio cabinet']
  },
  {
    id: 2,
    value: 'Table',
    subcat:['Coffee table',
            'Dining table',
            'Drop-leaf table',
            'End table',
            'Folding table']
  },
  {
    id: 3,
    value: 'Bed',
    subcat:['Computer desk',
            'Davenport desk',
            'Drawing board',
            'Writing desk']
  },
];

const TransactionsProductPreview = React.lazy(
  () => import("../components/products/TransactionsProductPreview")
);


const ProductEditPage= () => {

  // const [compressedPics, setCompressedPics] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [info, setInfo] = useState({});  
  const [cat, setCat] = useState(items);
  
  const [selectedCat, setSelectedCat] = useState("Select Category");
  const [selectedSubCat, setSelectedSubCat] = useState("Select Sub Category");
  
  const [subcat, setSubcat] = useState([]);
  const {productId} = useParams();

  const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_URL,
 });

  // Fetch ordered products
  useEffect(() => {
    axiosInstance.get(`products/find/${productId}`)
      .then((res) => res.data)
      .then(({ data }) => {
        
        setInfo(data[0]);
        if (data[0].pImage.length > 0 ) {
           
          const uploadedImages = [];

          data[0].pImage.map((image, idx) => {
            return uploadedImages.push({...image,status: 'uploaded'});
          });

          setImages(uploadedImages);
        }
      });
  }, [productId]);


  const DropdownFunc = (itm) =>{
    setSubcat(itm.subcat);
    setInfo((prev) => ({ ...prev, 'pCategory': itm.value }));
    setSelectedCat(itm.value);
    setSelectedSubCat("Select Sub Category");
  }

  const removeImage = async (img, iindex) =>{

    if (img.status === 'uploaded'){
        await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}products/delproduct`,
          data: {image:img.publicId},
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {          

          let formDataProfl = new FormData(); 

          const update = [...images];
          update.splice(iindex, 1);
          setImages(update);

          info.pImage = JSON.stringify(images.filter(itm => itm.status === 'uploaded'));//.forEach(itm => {return {publicId: itm.publicId ? itm.publicId : "" , url: itm.url ? itm.url : ""};});

          for (let [key, val] of Object.entries(info)) {
            // append each item to the formData (converted to JSON strings)
            formDataProfl.append(key, val);
          }

          formDataProfl.append("files", JSON.stringify(images.filter(itm => itm.status !== 'uploaded')));

          if(info._id){
            await axios({
              method: "put",
              url: `${process.env.REACT_APP_API_URL}products/${info._id}`,
              data: formDataProfl,
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then(res => {
              console.log(res);
            });
          }else{
            await axios.post(`${process.env.REACT_APP_API_URL}products`, formDataProfl)
              .then(res => {
                console.log(res);
              });
          }
          });

    }else{
        const update = [...images];
        update.splice(iindex, 1);
        setImages(update);
    }
    
  }

  const DropsubdownFunc = (itm) =>{  
    setSelectedSubCat(itm);
    setInfo((prev) => ({ ...prev, 'pSubCat': itm }));
  }
  
  const handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    } else {      
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }    
  };

  const changeHandler = async (e) => {
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {      
            validImageFiles.push(file);
      }
    }
    if (validImageFiles.length && validImageFiles.length < 4 && images.length < 4) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type\nImage Count is above allowed limit!");
  };

  useEffect(() => {
    
    const update = [...images];
    // const images = [],
    const fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {

        new Compressor(file, {
          quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
          success: (compressedResult) => {
            // compressedResult has the compressed file.
            // Use the compressed file to upload the images to your server.  
            const fileReader = new FileReader();
            fileReaders.push(fileReader);
            fileReader.onload = (e) => {
              const { result } = e.target;
              if (result) {
                update.push({url : result, status : 'local'});
              }
              if (update.length < 5 ) {
                setImages(update);
                setImageFiles([]);
              }
            }
            fileReader.readAsDataURL(compressedResult);
          },
        });
        
      })
      
    };
    return () => {
      isCancel = true;      
      fileReaders.forEach(fileReader => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imageFiles]);

  const handleClick = async (event) => {

    event.preventDefault();
    
    try {

      let formDataProfl = new FormData(); 

      info.pImage = JSON.stringify(images.filter(itm => itm.status === 'uploaded'));//.forEach(itm => {return {publicId: itm.publicId ? itm.publicId : "" , url: itm.url ? itm.url : ""};});

      for (let [key, val] of Object.entries(info)) {
        // append each item to the formData (converted to JSON strings)
        formDataProfl.append(key, val);
      }

      formDataProfl.append("files", JSON.stringify(images.filter(itm => itm.status !== 'uploaded')));

      if(info._id){
        await axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}products/${info._id}`,
          data: formDataProfl,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(res => {
          console.log(res);
        });
      }else{
        await axios.post(`${process.env.REACT_APP_API_URL}products`, formDataProfl)
          .then(res => {
            console.log(res);
          });
      }

    } catch (err) {
      console.log(err);
    }


  };

  return (
    <PageWrapper>
      <div className="w-full">
        <div>
          <h1 className="text-lg text-gray-100 font-bold leading-5">
            Product
          </h1>
          <p className="text-gray-300 leading-5">
            Edit Page
          </p>
        </div>

        {/* Payment profile */}
        <ContentBox name="Product Details">
          <div className="border-b border-b-glitch-box mb-5"></div>
          <div className="px-5 pb-5">
            <div className="text-white">
              <div className="grid grid-cols-2">
                <div className="mb-4 mr-5">
                    <label className="text-sm text-navy-700 dark:text-white font-bold" htmlFor="name">Name</label>
                    <input className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                      type="text" id="pName" name="pName" placeholder="Name" onChange={handleChange} value={info.pName}/>
                </div>
                <div className="mb-4 mr-5">
                  <label className="text-sm text-navy-700 dark:text-white font-bold" >Category</label>
                  <Dropdown title={info.pCategory? info.pCategory: selectedCat} DropdownFunc={DropdownFunc}  items={cat} multiSelect onChange={handleChange}  id="pCategory" name="pCategory"  />
                </div>
              </div>
                <div className="mb-4 mr-5">
                  <label className="text-sm text-navy-700 dark:text-white font-bold" >Sub Category</label>
                  <Dropsubdown title={info.pSubCat ? info.pSubCat : selectedSubCat} DropsubdownFunc={DropsubdownFunc}  items={subcat} multiSelect onChange={handleChange} id="pSubCat" name="pSubCat"  />
                </div>
                <div className="mb-4 mr-5">
                    <label className="text-sm text-navy-700 dark:text-white font-bold" htmlFor="price">Price</label>
                    <input className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                      type="text" id="pPrice" name="pPrice" placeholder="Price" onChange={handleChange} value={info.pPrice}/>
                </div>
                <div className="mb-4 mr-5">
                    <label className="text-sm text-navy-700 dark:text-white font-bold" htmlFor="desc">Description</label>
                    <input className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                      type="text" id="pDesc" name="pDesc" placeholder="Enter Product Description" onChange={handleChange} value={info.pDesc}/>
                </div>
                <div className="mb-4 mr-5">
                  <input type="checkbox" onChange={handleChange} id="pIsOnOffer" name="pIsOnOffer"  checked={info.pIsOnOffer}/>
                  <label htmlFor="pIsOnOffer">Is it on Offer?</label>
                </div>
                <div className="mb-4 mr-5">
                    <label className="text-sm text-navy-700 dark:text-white font-bold" htmlFor="offerPrice">Offer Price</label>
                    <input className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                      type="text" id="pOfferPrice" name="pOfferPrice" placeholder="Enter the Offer Price" onChange={handleChange} value={info.pOfferPrice}/>
                </div>
                <div className="mb-4 mr-5">
                <input type="checkbox" id="pIsActive" name="pIsActive" onChange={handleChange} checked={info.pIsActive}/>
                  <label htmlFor="pIsActive" className="text-sm text-navy-700 dark:text-white font-bold">Is it the Item Active?</label>
                </div>
                <div className="mb-4 mr-5">
                <input type="checkbox"  id="pIsInStock" name="pIsInStock" onChange={handleChange} checked={info.pIsInStock}/>
                  <label htmlFor="pIsInStock" className="text-sm text-navy-700 dark:text-white font-bold">Is item in stock?</label>
                </div>
                <div className="mb-4 mr-5">
                  <input type="checkbox" id="pFeatured" name="pFeatured" onChange={handleChange} checked={info.pFeatured}/>
                  <label htmlFor="pFeatured" className="text-sm text-navy-700 dark:text-white font-bold">Is the item featured?</label>
                </div>           
              {
                    images.length > 0 ?
                      <div className="py-2 grid grid-cols-4 gap-4 pb-5">
                        {
                          images.map((image, idx) => {
                            return   <ProductDisplaySection
                                        displayText=""
                                        subText={idx}
                                        icon={image}
                                        removeImage={removeImage}
                                        key={idx}
                                      />  
                          })
                        }
                      </div> : null
                  }
                
            <div className="mt-5 grid">
              
                <div className="mb-4 mr-5">
                        <label className="text-sm text-navy-700 dark:text-white font-bold" htmlFor="photo">Add images *4 images</label>
                        <input className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                          type="file" onChange={changeHandler} accept="image/*"
                          multiple id="photo" name="photo" placeholder=""/>
                </div>

              <Button className="hover:bg-glitch-orange mb-4 mr-5" onClick={handleClick}>
                <span className="material-icons text-lg">done</span>
                <span className="ml-1">Save Product Details</span>
              </Button>
            </div>
          </div>
          </div>
        </ContentBox>

      </div>
    </PageWrapper>
  );
};

export default ProductEditPage;
