import React, { Component } from 'react';
// import off from '../img/on-img.svg';
// import on from '../img/blue.svg';
import on from '../img/blue.png';
import off from '../img/on-img.png';

class CardBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      scrapImg: off
    }

    this.handleCheck = this.handleCheck.bind(this);
    this._handleSubscribe = this._handleSubscribe.bind(this);
  }

  _handleSubscribe () {
    const { photo_id, scrap, handleSubscribe } = this.props;
    if (photo_id === '' || photo_id === undefined) {
      return;
    }

    this.handleCheck(photo_id) ? (
      handleSubscribe(photo_id, true)     // alreay exist -> remove (unscrap)
    ) : (
      handleSubscribe(photo_id, false)   // not exist -> add (scrap)
    )

    this.handleCheck(photo_id) ? (
      this.setState({
        scrapImg: on,
        active: !this.state.active
      })
    ) : (
      this.setState({
        scrapImg: off,
        active: !this.state.active
      })
    )
    console.log(this.state.scrapImg);
  }

  handleCheck (val) {
    return this.props.scrap.includes(val);
  }

  render() {
    const { photo_id, image_url, scrap } = this.props;

    return (
      <div className="cardBody">
        <div className="card-image">
          <img
            src={image_url}
            alt="card"
          />
        </div>
        <div className="card-subscribe">
          <img
            className={'scrap-'+this.state.active}
            src={this.state.scrapImg}
            alt="subscribe"
            onClick={this._handleSubscribe}
          />
        </div>
      </div>
    );
  }
}

export default CardBody;
