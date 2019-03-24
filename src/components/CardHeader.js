import React from 'react';

const CardHeader = ({nickname, profile_image_url}) => (
      <div className="cardHeader">
        <img className="profile_image" src={profile_image_url} alt="profile"/>
        <p className="nickname">{nickname}</p>
      </div>
);

export default CardHeader;
