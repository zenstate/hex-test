import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import cleanHtmlFromString from '../../helpers/cleanHtmlFromStr';
import s from './Photo.scss';

const Photo = ({
    photoUrl,
    photoLink,
    title,
    authorName,
    authorLink,
    description,
    tags,
}) => {
    const cleanDescription = description ? cleanHtmlFromString(description) : '';
    return (
        <div className={s.container}>
            <Card data-testid="Photo">
                <a href={photoLink} style={{ backgroundImage: `url(${photoUrl})` }} className={s.photoImage} data-testid="Photo__Image" />
                <Card.Body>
                    <div data-testid="Photo__Title">
                        <a href={photoLink} data-testid="Photo__PhotoLink">{title || 'Untitled'}</a>
                        {' by '}
                        <a href={authorLink} data-testid="Photo__AuthorLink">{authorName}</a>
                    </div>
                    {cleanDescription ? (
                        <>
                            <hr />
                            <div className={s.description} data-testid="Photo__Description" title={cleanDescription}>
                                {cleanDescription}
                            </div>
                        </>
                    ) : null}

                    {tags ? (
                        <>
                            <hr />
                            <Card.Text data-testid="Photo__Tags">
                                Tags: {tags}
                            </Card.Text>
                        </>
                    ) : null}
                </Card.Body>
            </Card>
        </div>
    );
};

Photo.propTypes = {
    photoUrl: PropTypes.string.isRequired,
    photoLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorLink: PropTypes.string.isRequired,
    description: PropTypes.string,
    tags: PropTypes.string.isRequired,
}

export default Photo;