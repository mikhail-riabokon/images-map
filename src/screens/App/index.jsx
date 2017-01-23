import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user';

class AppScreen extends React.Component {
  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.checkAuth(nextProps);
    }
  }

  checkAuth(props) {
    const { isAuthenticated, router } = props || this.props;
    const route = isAuthenticated ? 'map' : 'login';

    router.push(`/${route}`);
  }

  render() {
    return (
      <div className="container">
        <h1>App</h1>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppScreen);
