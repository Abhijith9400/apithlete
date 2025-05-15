import axios from 'axios';

export const loginAdminWithSecretKey = async (secretKey: string) => {
  const res = await axios.post('http://localhost:5000/api/secret/admin/login', {
    secretKey,
  }, {
    withCredentials: true
  });

  return res.data;
};
