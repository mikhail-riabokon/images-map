import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../../actions/user';
import * as authActions from '../../../../actions/auth';
import UnSupportableMessage from './components/UnSupportableMessage';
import ImageMap from './components/ImageMap/index.jsx';
import LocationError from './components/LocationError';
import Loading from '../../components/Loading';
import './index.css';

class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingMap: this.isSupportNavigation,
    };

    this.checkUserData();
  }

  componentWillReceiveProps(newProps) {
    if (Object.keys(newProps.user.geolocation).length > 0) {
      this.setState({ loadingMap: false });
    }
  }

  checkUserData() {
    this.props.userActions.fetchUserData();

    if (this.isSupportNavigation) {
      this.props.userActions.getUserLocation();
    }
  }

  get isSupportNavigation() {
    return ('geolocation' in navigator );
  }

  get imageMap() {
    const { geolocation } = this.props.user;
    const isLocationEmpty = (Object.keys(geolocation).length === 0);

    if (this.state.loadingMap) {
      return <Loading />;
    } else {
      return ((isLocationEmpty || geolocation.error))
        ? <LocationError getUserLocation={this.props.userActions.getUserLocation} />
        : <ImageMap user={this.props.user} />;
    }
  }

  render() {
    const childItem = this.isSupportNavigation
      ? this.imageMap
      : <UnSupportableMessage />;

    return (
      <div className="container-fluid">
        <div className="map-container">
          { childItem }
        </div>
      </div>
    );
  }
}

MapScreen.propTypes = {
  user: React.PropTypes.shape({
    picture: React.PropTypes.shape({
      url: React.PropTypes.string,
    }),
    geolocation: React.PropTypes.shape({
      latitude: React.PropTypes.number,
      longitude: React.PropTypes.number,
    }),
  }),
  authActions: React.PropTypes.object,
  userActions: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
