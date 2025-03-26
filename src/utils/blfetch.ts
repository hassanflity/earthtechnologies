import axios from 'axios';
//const StaticUrl = "http://localhost/earth_new/home/";
const StaticUrl = "https://earthtechnologies.com/panel/home/";
export const etGet = async (url: string, cb: (data: any) => any) => {
  const data: any = await axios.get(StaticUrl + url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  // console.log(data.data);
  if (typeof cb === 'function') cb(data.data);
};
