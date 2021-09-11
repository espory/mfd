import axios from 'axios';

export const HOST = 'http://81.69.173.188:8080';

axios.interceptors.response.use(null, error => {
  return Promise.reject(error.response);
});

export default function fetch(option = {}) {
  const {url, byteResponse = false, ...rest} = option;
  return axios({
    url: `${HOST}${url}`,
    withCredentials: true,
    ...rest,
  })
    .then(res => {
      console.log(res);
      const {status, data} = res;
      if (status !== 200) {
        return Promise.reject(new Error('服务器错误，请重试'));
      }

      return data;
    })
    .catch(e => {
      console.log(e);
      // return Promise.reject(new Error(e.message));
    });
}
