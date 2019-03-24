import React from 'react';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

const Card = (props) => {
    const generateKey = (id) => {
      return `${ id }_${ new Date().getTime() }`;
    } // to generate unique key in map

    const card = props.photos.map(photo => {
          let { id, image_url, nickname, profile_image_url } = photo;

          props.reqCnt > 1 ? id += 20 * props.reqCnt : id = id;
          return (
            <div className="card" key={ generateKey(id) }>
              <CardHeader
                nickname={nickname}
                profile_image_url={profile_image_url}
              />
              <CardBody
                photo_id={id}
                image_url={image_url}
                scrap={props.scrap}
                handleSubscribe={props.handleSubscribe}
              />
            </div>
          )
        });

    return (
      <div className="card-item">
        {card}
      </div>
    )
}

export default Card;
