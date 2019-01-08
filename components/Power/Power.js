// Power percents that reached more then 2% per 10sec(update prices time) OR get down more then 10% in 2h(default)
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import isEmpty from 'lodash/isEmpty';

import { clearSession } from 'common';
import { WithUserMenu, Loading, DeleteSwipeList } from 'common-components';
import { fetchPowerSymbols, deleteAllPower } from 'actions';

import { PowerOne, PairOneDetails } from './PowerOne';

import { powerStyle } from './Power.style';

const PercentButtons = ({ handle }) => (
  <Button
    textStyle={powerStyle.textBoldStyle}
    buttonStyle={powerStyle.deleteButtonStyle}
    title="Delete all"
    onPress={handle}
  />
);

@WithUserMenu
class PowerPercentsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      errors: ''
    };
  };

  // componentDidMount() {
  //   const { user, fetchPowerSymbols, powers, user: { _id } } = this.props;
  //
  //   if (!isEmpty(user) && !powers.length) {
  //     this.setState({ loading: true });
  //     fetchPowerSymbols(_id)
  //       .then(() => {
  //         this.setState({ loading: false })
  //       })
  //       .catch(err => {
  //         this.setState({ loading: false });
  //         const errors = clearSession(this, err);
  //         if(errors) this.setState({ errors });
  //       });
  //   }
  // }

  deleteAll = () => {
    this.setState({ error: '' });
    return this.props.deleteAllPower(this.props.user._id)
      .catch(err => {
        const errors = clearSession(this, err);
        if(errors) this.setState({ errors });
      })
  };

  renderPowerList = ({ item }) => {
    const { user } = this.props;
    const { loading } = this.state;

    return {
      component: PowerOne,
      props: {
        item,
        user,
        disabled: loading,
      },
    };
  }

  deletePower = (id) => {
    return this.props.deletePower(id, this.props.user._id)
      .catch(err => {
        const errors = clearSession(this, err);
        if(errors) this.setState({ errors });
      })
  };

  onViewableItemsChanged = (data) => {
    // console.log(data)
  }

  render() {

    const { errors, loading } = this.state;
    const { powers, user } = this.props;
    const { containerStyle, containerScrollStyle, globalError, emptyTextStyle } = powerStyle;

    return (
      <ScrollView style={containerScrollStyle}>

        {!!loading && <Loading />}
        {!!errors && <Text style={globalError}>{errors}</Text>}

        {
          (!powers.length && !loading) ?
            <Text style={emptyTextStyle}>This stash is empty now</Text> :
            <View style={containerStyle}>
              {powers.length > 0 && <PercentButtons handle={this.deleteAll}/>}
              <DeleteSwipeList
                data={powers}
                center={{ component: PowerOne, props: { user, disabled: loading } }}
                leftSide={{ component: PairOneDetails }}
                onDelete={this.deletePower}
                keyItem="_id"
                itemHeight={'100%'}
                onViewableItemsChanged={this.onViewableItemsChanged}
              />
            </View>
        }

      </ScrollView>
    );
  };
};

PowerPercentsComponent.propTypes = {
  powers: PropTypes.array.isRequired, // Array of power symbols
  user: PropTypes.object.isRequired, // Object with user data
  fetchPowerSymbols: PropTypes.func.isRequired, // Fetch power symbols when component just mounted and still stay without socket data
};

const mapState = ({ powerPercents, user }) => {
  return {
    powers: powerPercents,
    user,
  }
};

export const PowerPercents = connect(mapState, { fetchPowerSymbols, deleteAllPower })(PowerPercentsComponent);