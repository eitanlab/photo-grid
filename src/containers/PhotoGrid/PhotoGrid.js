import React, { useState, useEffect, useContext } from "react";
import classes from "./PhotoGrid.module.css";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import Modal from "../../components/Modal/Modal";
import axios from "axios";
import { AuthContext } from "../../context/auth-context";

const PhotoGrid = () => {
  const authContext = useContext(AuthContext);
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState("1");
  const [selectedPicture, setSelectedPicture] = useState(null);

  useEffect(() => {
    if (authContext.token) {
      const fetchPage = async () => {
        try {
          const result = await axios(
            `http://interview.agileengine.com/images?page=${page}`,
            {
              headers: {
                Authorization: authContext.token,
              },
            }
          );
          setPictures(result.data.pictures);
        } catch (error) {
          alert(`Pictures can't be loaded because (${error})`);
        }
      };
      fetchPage();
    }
  }, [authContext.token, page]);

  const handleModalOpen = (pictureId) => {
    if (pictureId !== null) {
      axios(`http://interview.agileengine.com/images/${pictureId}`, {
        headers: {
          Authorization: authContext.token,
        },
      })
        .then((response) => {
          setSelectedPicture(response.data);
        })
        .catch((error) => {
          alert(`Picture can't be loaded because (${error})`);
        });
      document.body.style.overflow = "hidden";
    }
  };

  const handleModalClose = () => {
    setSelectedPicture(null);
    document.body.removeAttribute("style");
  };

  let photoItems = <div>Loading...</div>;
  if (authContext.isAuth && pictures.length > 0) {
    photoItems = pictures.map((picture) => (
      <PhotoItem
        key={picture.id}
        pictureId={picture.id}
        thumbnail={picture.cropped_picture}
        handleSelectedPicture={handleModalOpen}
      />
    ));
  }

  let modal = null;
  if (selectedPicture !== null) {
    modal = (
      <Modal
        onClose={handleModalClose}
        show={true}
        id={selectedPicture.id}
        author={selectedPicture.author}
        camera={selectedPicture.camera}
        url={selectedPicture.full_picture}
        tags={selectedPicture.tags}
      />
    );
  }

  return (
    <div className={classes.PhotoGrid}>
      {modal}
      {photoItems}
    </div>
  );
};

export default PhotoGrid;
