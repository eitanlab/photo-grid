import React from 'react';
import classes from './PhotoItem.module.css';

const PhotoItem = props => {
    return (
        <div className={classes.PhotoItem} onClick={() => props.handleSelectedPicture(props.pictureId)}>
            <img className={classes.Img} src={props.thumbnail} alt='Picture zoomed'/>
        </div>
    )
}

export default PhotoItem
