import { useEffect, useState } from "react";
import api from "../../api/axios_api"

import DataContext from "./index";

const DataProvider = ({ children }) => {
  const [map, setMap] = useState({})
  const [campus, setCampus] = useState({})
  const [campusData, setCampusData] = useState([])
  const [currentCampusData, setCurrentCampusData] = useState([])
  const [currentCampusName, setCurrentCampusName] = useState('')


  useEffect(() => {
    const localCampusName = localStorage.getItem('CurrentCampusName');
    if (localCampusName) {
      setCurrentCampusName(localCampusName);
    }
  }, [])



  useEffect(() => {
    const getMap = async () => {
      const m = await api.getSemesterMap();
      setMap(m.data);
    }
    getMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps  

  }, [])

  useEffect(() => {
    const getCampData = async () => {
      const m = await api.getCampusData(`${map.ano}${map.semestre}`);
      setCampusData(m.data);
      if (currentCampusName != "") {
        const camp = map.campus.filter((e) => e[0] == currentCampusName)
        if (camp.length > 0) {
          setCampus({
            value: camp[0][0],
            label: camp[0][1],
          })
        }
      }
    }
    Object.keys(map).length > 0 && getCampData()
    // eslint-disable-next-line react-hooks/exhaustive-deps  

  }, [map])
  useEffect(() => {

    if (campus?.value) {
      setCurrentCampusData(campusData[campus.value]);
      setCurrentCampusName(campus.value);
      localStorage.setItem('CurrentCampusName', campus.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps  
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

export default DataProvider