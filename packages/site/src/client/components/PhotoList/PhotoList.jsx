import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getPosts from '../../helpers/getPosts';
import Photo from '../Photo';
import { FLICKR_URL } from '../../../../../../config';

import s from './PhotoList.scss';

export const apiPropMap = ({
  id,
  title,
  description,
  url_m,
  ownername,
  owner,
  tags
}) => ({
  id,
  title,
  photoLink: `${FLICKR_URL}/photos/${owner}/${id}`,
  photoUrl: url_m,
  description: description && description._content ? description._content : '',
  authorName: ownername,
  authorLink: `${FLICKR_URL}/people/${owner}`,
  tags,
})

const PhotoList = ({ getPosts }) => {
  const [photostream, setPhotostream] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorRetrievingStream, setErrorRetrievingStream] = useState(false);
  const onSuccess = ({ photo }) => {
    setIsLoading(false);
    setPhotostream(photo);
    setErrorRetrievingStream(false);
  }

  const onError = (err) => {
    setIsLoading(false);
    // ideally we would have a logging solution to raise and alert on this error
    setErrorRetrievingStream(true);
  }

  const getNewPosts = () => getPosts({ successCallback: onSuccess, failureCallback: onError })
  useEffect(
    () => {
      setIsLoading(true);
      getNewPosts();
    },
    [getPosts],
  );

  let photos = null;
  if (photostream) {
    photos = photostream
      .map(apiPropMap)
      .filter(({ photoUrl }) => photoUrl)
      .map((
        props
      ) => (
          <Photo {...props} />
        ));;
  }

  return (
    <div data-testid="PhotoList" className={s.container}>
      {photos}
      {isLoading ? (
        <div className={s.loadingContainer}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
      {errorRetrievingStream ? (
        <div className="alert alert-warning" role="alert" data-testid="PhotoList__Error">
          Sorry, I couldn't load photos, do you have a network connection?
          <button type="button" className="btn btn-warning" data-testid="PhotoList__RetryLink" onClick={getNewPosts}>
            Reload Now
          </button>
        </div>
      ) : null}
    </div>
  );
}

PhotoList.propTypes = {
  getPosts: PropTypes.func,
}

PhotoList.defaultProps = {
  getPosts: getPosts,
}

export default PhotoList;
