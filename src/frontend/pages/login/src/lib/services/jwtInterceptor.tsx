import axios from 'axios';
import { Store } from 'libs/frontend/store/src/lib/Store';

const jwtInterceptor = axios.create({});

const logInUserData = Store((state: any) => state.logInUserData);

jwtInterceptor.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem('tokens') as any);
  config.headers.common['Authorization'] = `bearer ${tokensData.accessToken}`;
  return config;
});

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem('tokens') as any);
      const payload = {
        userId: logInUserData.userId,
        refreshToken: authData.refreshToken,
      };

      let apiResponse = await axios.post('/api/Auth/RequestNewToken', payload);
      localStorage.setItem('tokens', JSON.stringify(apiResponse.data));
      error.config.headers[
        'Authorization'
      ] = `bearer ${apiResponse.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;
