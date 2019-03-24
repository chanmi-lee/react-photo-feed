import React, { Component } from 'react';
import axios from 'axios';
import Card from './components/Card';
import filtered from './img/bt-checkbox-checked.svg';
import unfiltered from './img/white.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],       // load data
      scrap: [],        // scrap data
      error: false,
      reqCnt: 1,
      limit: false,
      filterImg: unfiltered
    };

    this.filterPhotos = this.filterPhotos.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  // Component가 화면에 나타났을 때 호출
  componentDidMount() {
    this.getPosts();  // initial request
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillMount() {
    window.removeEventListener('scroll', this.handleScroll);
  }


  getPosts() {
    const baseUrl = "https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/";
    let reqUrl = baseUrl + "page_" + this.state.reqCnt + ".json";

    if (this.state.limit) return;

    axios
      .get(reqUrl)
      .then(response => {
        this.setState({
          photos: this.state.photos.concat(response.data),
          error: false,
          reqCnt: this.state.reqCnt + 1
        });
      })
      .catch(error => {
        this.setState({
          error,
          limit: true
        });
      });
  }

  filterPhotos() {
    let { subscribing, scrap } = this.state;

    subscribing ? (
      this.setState({
        subscribing: false,
        filterImg: filtered
      })
    ) : (
      this.setState({
        subscribing: true,
        filterImg: unfiltered
      })
    );
  }
  handleScroll() {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      this.getPosts();
    }
  }
  handleSubscribe(photo_id, exist) {
    const { scrap } = this.state;

    exist ? (
      this.setState({
        scrap: scrap.filter(id => id !== photo_id)
      })
    ) : (
      this.setState({
        scrap: scrap.concat(photo_id)
      })
   )

    localStorage.setItem('subscribe', JSON.stringify(scrap));
    console.log(JSON.parse(localStorage.getItem('subscribe')));
  }

  render() {
    let { photos, scrap } = this.state;

    return (
      <div className="App">
        <div className="filter">
          <img
            src={this.state.filterImg}
            alt="filter"
            onClick={this.filterPhotos}
          />
          <p>스크랩한 것만 보기</p>
        </div>
        <div className="card-list">
            <Card
              photos={photos}
              scrap={scrap}
              handleSubscribe={this.handleSubscribe}
            />
        </div>
      </div>
    );
  }
}

export default App;
