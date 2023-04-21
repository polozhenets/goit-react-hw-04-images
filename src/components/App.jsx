import { useEffect, useState } from 'react';
import getImages from 'utils/axios';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import './style.css';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export const App = () =>  {

  const [pictures,setPictures] = useState([]);
  const [page,setPage] = useState(1);
  const [queryValue,setQueryValue] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [largeImage,setLargeImage] = useState("");
  const [showMore,setshowMore] = useState(false);

 const fetchImages = async () => {
    setIsLoading(true);
    try {
      const newImages = await getImages(queryValue, page);
      setPictures(prevState => [...prevState,...newImages.pictures])
      setshowMore(!!(page<Math.ceil(newImages.total/12)))
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

 useEffect(()=>{
  if(queryValue==="") return;
  fetchImages();
  // eslint-disable-next-line
 },[queryValue,page])

 const onSubmitHandler = queryInput => {
    if (queryInput === '') {
      return;
    }
    setPictures([]);
    setPage(1);
    setQueryValue(queryInput);
  };

 const getLargePicture = largePicture => { 
   setLargeImage(largePicture);
    setShowModal(true);
  };

 const togleModal = () => {
    setShowModal(prev=>!prev);
    setLargeImage("");
  };

  const loadMoreHandler = () => {
    setPage(prevState=>prevState+1);
  }

    return (
      <div className="App">
        <Searchbar onSearch={onSubmitHandler} />

        <ImageGallery
          images={pictures}
          onPictureClick={getLargePicture}
        />
        
        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={togleModal}>
            <img className="modal-picture" alt='bgp' src={largeImage} />
          </Modal>
        )}
        {showMore && <Button onClick={loadMoreHandler} />}
      </div>
    );
  }

