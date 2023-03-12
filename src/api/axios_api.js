import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
const timeout = 10000;

const axiosInstance = axios.create({
  baseURL,
  timeout,
});

const setAccesHeaderToken = (token) =>
  axiosInstance.defaults.headers.Authorization = token ? `Bearer ${token}` : undefined;

const getSemesterMap = async (semester_ = null) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth()
  let semester = semester_;
  if (!semester_) {
    semester = `${year}${month > 4 && month < 10 ? 2 : 1}`
  }

  try {
    const map = await axiosInstance.get(`/${semester}/${semester}_map.json`)
    return (map)
  } catch (err) {
    return (false)
  }
}


const getCampusData = async (semester) => {
  try {
    const data = await axiosInstance.get(`/${semester}/data.json`)
    return (data)
  } catch (err) {
    return (false)
  }
}


const api = {
  getSemesterMap,
  getCampusData
}


export {
  setAccesHeaderToken,
  axiosInstance,
}

export default api;
