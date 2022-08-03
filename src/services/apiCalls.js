import axios from 'axios';
import { serverApiUrl } from '../utils/dynamicUrls';

export const apiCustList = async (search) => {
  try {
    const { column, string } = search;
    const url = `${serverApiUrl}/customers/search?column=${column}&string=${string}`;

    const fetchApi = await axios.get(url);
    const response = await fetchApi.data;

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const apiCreateCust = async (newUser) => {
  try {
    const url = `${serverApiUrl}/customers`;

    const fetchApi = await axios.post(url, newUser);
    const response = await fetchApi.data;

    return response;
  } catch (error) {
    return { error };
  }
};

export const apiUpdateCust = async (id, user) => {
  try {
    const url = `${serverApiUrl}/customers/${id}`;
    const fetchAPI = await axios.put(url, user);
    const response = await fetchAPI.data;

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const apiRemoveCust = async (id) => {
  try {
    const url = `${serverApiUrl}/customers/${id}`;

    const fetchAPI = await axios.delete(url);
    const response = await fetchAPI.data;

    return response;
  } catch (error) {
    console.log(error);
  }
};
