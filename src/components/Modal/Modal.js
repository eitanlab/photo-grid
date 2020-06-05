import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={classes.Modal}>
      <div className={classes.ModalBody}>
        <div onClick={props.onClose} className={classes.CloseButton}>
          X
        </div>
        <img className={classes.Img} src={props.url} alt="Picture zoomed" />
        <div className={classes.Overlay}>
          <h1>Author: {props.author}</h1>
          <p>Camera: {props.camera}</p>
          <p>{props.tags}</p>
          <a href={props.url} className={classes.ShareButton}>
            Share
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
