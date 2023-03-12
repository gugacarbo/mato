import { useEffect, useState } from 'preact/hooks'
import './app.css'
import data from './20231/20231_map.json'
import axios from 'axios'
export function App() {
  const { createDate, campus: campusList } = data
  const [selectedCampus, setSelectedCampus] = useState('')
  const [campusData, SetCampusData] = useState([])
  const [materia, setMateria] = useState([])
  const [turma, setTurma] = useState([])
  useEffect(() => {
    getCampus(selectedCampus)
  }, [selectedCampus])
  useEffect(() => {
    console.log(turma)
  }, [turma])

  function getCampus(cName) {
    if (!cName) return
    axios.get(`./20231/${cName}.json`).then(d => SetCampusData(d.data))
  }



  return (
    <>
      <div>
        <select onChange={({ target }) => setSelectedCampus(target.value)}>
          <option >selecione</option>
          {campusList.map(c => <option>{c}</option>)}
        </select>
        {selectedCampus}
      </div>

    </>
  )
}
/**
 * 
 *       {selectedCampus &&
        <div>
          <select onChange={({ target }) => setMateria(target.value)}>
            {campusData.map((c, key) => <option value={key}>{c[0]}</option>)}
          </select>
          {materia}
        </div>
      }
      {materia &&
        <div>
          <select onChange={({ target }) => setTurma(target.value)}>
            {campusData?.[materia]?.[3].map((c, key) => <option value={key}>{c[0]}</option>)}
            </select>
            {turma}
          </div>
        }
        <div>
          {campusData?.[materia]?.[1]}
          {
            turma && campusData?.[materia]?.[3]?.[turma][7].map(k => {
              console.log(k)
              const horarios = getHorarios(k);
              console.log(horarios)
              return (
                <div style={{ margin: "50px" }}>
                  {
                    Object.keys(horarios).map(x => <div style={{ marginBottom: "10px" }}> {x}: {horarios[x]}</div>)
                  }
                </div>)
            })
          }
      </div>

Cada disciplina é uma lista com a seguinte estrutura:
[ "código da disciplina", "nome da disciplina em ascii e caixa alta", "nome da disciplina", [lista de turmas] ]

Cada turma é uma lista com a seguinte estrutura:
[ "nome_turma", horas_aula, vagas_ofertadas, vagas_ocupadas, alunos_especiais, saldo_vagas, pedidos_sem_vaga, [horarios], [professores]]

Os dados relativos a horas_aula e vagas são em números, não strings.
Os horários são no formato disponibilizado pela UFSC:
"2.1010-2 / ARA-ARA209"
 | |    |   |   \----- código da sala
 | |    |   \--------- código do departamento
 | |    \------------- número de aulas seguidas no bloco
 | \------------------ horário da primeira aula do bloco
 \-------------------- dia da semana

Os professores são dispostos numa lista de strings.
 */