import React, { useState } from 'react';
import ImageCropDialog from "./ImageCropDialog";
import convertImageToBase64 from "./convertImageToBase64"
import GetDefaultImg from './DefaultImg'
import "./styles.css";

export default function App() {

  const defaultImg = GetDefaultImg();

  const initData = {
    originalImage:null,
    croppedImage:defaultImg
  }

  const [ selectedImage, setSelectedImage ] = useState(initData)

  const handleFileChange = (event) => {

    const file = event.target.files[0];
    event.target.value = null;
    convertImageToBase64(file)
      .then((base64Image) => {
        setSelectedImage((prevValue)=>{
          return {...prevValue,originalImage:base64Image}
        })
        
      })
      .catch((error) => {
        console.error('Error converting image to base64:', error);
    });
    
  };

  function onCancel(){
    setSelectedImage((prevValue)=>{
      return {...prevValue,originalImage:null}
    })
  }
  
  function genCroppedImg(croppedImageURL){
    setSelectedImage({
      originalImage:null,
      croppedImage:croppedImageURL
    })
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*"/>
      
      {selectedImage.originalImage&&
      <ImageCropDialog 
        imageURL={selectedImage.originalImage}
        cropInit={selectedImage.crop}
        zoomInit={selectedImage.zoom}
        aspectInit={selectedImage.aspect}
        onCancel={onCancel}
        genCroppedImg={genCroppedImg}
      />
      }

      {selectedImage.croppedImage&&<img src={selectedImage.croppedImage} />}

      
    </div>
  );
}
