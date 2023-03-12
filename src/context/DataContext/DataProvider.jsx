import { useEffect, useState } from "react";
import api from "../../api/axios_api"

import DataContext from "./index";

export default ({ children }) => {
  const [map, setMap] = useState({})
  const [campus, setCampus] = useState({})
  const [campusData, setCampusData] = useState([])
  const [currentCampusData, setCurrentCampusData] = useState([])
  
  useEffect(() => {
    const getMap = async () => {
      const m = await api.getSemesterMap();
      setMap(m.data);
    }
    getMap()
  }, [])

  useEffect(() => {
    const getCampData = async () => {
      const m = await api.getCampusData(`${map.ano}${map.semestre}`);
      setCampusData(m.data);
    }
    Object.keys(map).length > 0 && getCampData()
  }, [map])

  useEffect(() => {
    if (campus?.value) {
      
      setCurrentCampusData(campusData[campus.value]);
    }
  }, [campus])

  return (
    <DataContext.Provider
      value={{
        map,
        campus,
        setCampus,
        currentCampusData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
