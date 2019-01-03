import axios from 'axios';
import * as consts from './constants';
import { getToken } from 'common';

import { setUser } from './auth';
import { setPercent } from './socket';

export const setSignPrice = (data) => dispatch => { // Set pair to watch sign price
  return getToken()
      .then(token => {
        return axios.post(host('/api/set-sign'), { ... data, token, })
            .then(res => dispatch(addTradePairs(res.data)));
      })

};
export function setTradePairs(tradePairs) {
  return {
    type: consts.SET_NEW_USER_TRADE_PAIRS,
    tradePairs
  }
};
export function addTradePairs(tradePair) {
  return {
    type: consts.ADD_USER_TRADE_PAIR,
    tradePair
  }
};

export const updatePrice = (pairId) => dispatch => { // Update price of pair
  return getToken()
      .then(token => {
        return axios.post(host('/api/update-price'), { pairId, token })
            .then(res => dispatch(priceUpdate(res.data)))
      })
};

export const updatePairsPrice = (pairs) => dispatch => {
  return dispatch(priceUpdate(pairs))
};
function priceUpdate(pairs) {
  return {
    type: consts.UPDATE_ALL_USERS_PAIRS_PRICE,
    pairs
  };
};

export const deletePercentPair = (userId, percentPairId) => dispatch => {
  return axios.post(host('/api/delete-percent-pair'), { ...userId, ...percentPairId, token: getToken() })
};

export const deletePair = id => dispatch => { // Delete Pair from user's pair list
  return getToken()
      .then(token => {
        return axios.post(host('/api/delete-pair'), { id, token })
            .then(() => dispatch(pairDeleteAction(id)));
      })

};
function pairDeleteAction(id) {
  return {
    type: consts.DELETE_PAIR,
    id
  };
};

export const getWhaleOrders = (amount, type, quoteAsset) => dispatch => { // Get Whales orders
  return axios.post(host('/api/get-whales'), { amount: Number(amount), type, token: getToken(), quoteAsset })
      .then(res => dispatch(getWhalesAction(res.data)))
};
function getWhalesAction(orders) {
  return {
    type: consts.GET_WHALES_ORDERS,
    orders
  }
};

export const fetchPairPrice = symbol => () => {
  return getToken()
      .then(token => {
        return axios.post(host(`/api/get-symbol-price/${symbol}`), { token })
            .then(res => {
              return res.data
            })
      });
};

export const confirmChanging = (id, sign, text) => dispatch => {
    return getToken()
        .then(token => {
            return axios.post(host(`/api/edit-user-data`), { id, sign, text, token })
                .then(res => {
                    return dispatch(setUser(res.data.user))
                })
        })
};

export const subscribing = (userID, data) => dispatch => {
  return axios.post(host(`/api/subscribing`), { userID, token: getToken(), data })
      .then(res => dispatch(setUser(res.data.user)))
};

export const setSeenPower = (userId, powerId) => dispatch => {
  return axios.post(host('/api/set-seen-powers'), { userId, powerId })
      .then(() => dispatch(setSeenPowersAction(powerId)))
};
const setSeenPowersAction = powerId => {
  return {
    type: consts.SET_POWERS_TO_BE_SEEN,
    powerId
  }
};

export const fetchPowerSymbols = userId => dispatch => {
  return axios.get(host(`/api/${userId}/get-powers`))
      .then(res => dispatch(setPercent(res.data)))
};

export const deletePower = (powerId, userId) => dispatch => {
  return axios.get(host(`/api/${userId}/delete-power/${powerId}`))
      .then(() => dispatch(deletePowerAction(powerId)));
};
export const deleteAllPower = (userId) => dispatch => {
  return axios.get(host(`/api/${userId}/delete-all-power`))
      .then(() => dispatch(deleteAllPowerAction()));
};

const deletePowerAction = powerId => {
  return {
    type: consts.DELETE_POWER,
    powerId
  }
};
const deleteAllPowerAction = () => {
  return {
    type: consts.SET_POWER_PERCENT,
    data: [],
  }
};
