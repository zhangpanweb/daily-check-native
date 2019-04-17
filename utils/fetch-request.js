import AsyncStorage from '@react-native-community/async-storage';

const baseUrl = 'http://192.168.20.56:3100'

async function fetchRequest(url, params) {
  const cookie = await AsyncStorage.getItem('cookie');

  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "cookie": cookie,
  };
  if (params && params.headers) {
    Object.assign(headers, params.headers)
  }

  const fetchParms = params || {};
  fetchParms.headers = headers;

  return fetch(`${baseUrl + url}`, fetchParms);

}

export default fetchRequest;