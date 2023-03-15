
const validarElementos = (elemento, combinacao, obj) => {
  const keys = Object.keys(obj);
  const grupo = keys.find(key => obj[key].includes(elemento));
  return !combinacao.hasOwnProperty(grupo);
};

const validarElemento = (elemento, combinacao, obj) => {
  const keys = Object.keys(obj);
  const grupo = keys.find(key => obj[key].includes(elemento));


  if (combinacao.hasOwnProperty(grupo)) {
    console.log("jáTem")
    return false;
  }

  const horarios = elemento?.[7]
  let valid = true;
  horarios.forEach(hor => {

    const [
      _,
      dia,
      hora_inicio,
      aulas_seguidas
    ] = /^(\d{1}).(\d{4})\-(\d{1})/g.exec(hor);


    let valid2 = true;
    for (let key in combinacao) {
      // if (key !== grupo) continue;
      const aulas = combinacao[key][7];
      aulas.forEach(aula => {
        const [
          _,
          aula_dia,
          aula_hora_inicio,
          aula_aulas_seguidas
        ] = aula.match(/^(\d{1}).(\d{4})\-(\d{1})/)
        if (aula_dia == dia) {
          // console.log("dia igual");
          if (aula_hora_inicio == hora_inicio) {
            // console.log("mema dia mema hora")
            // console.log("", hora_inicio)
            valid2 = false;
            return false;
          }
          if (temChoque(hora_inicio, aulas_seguidas, aula_hora_inicio, aula_aulas_seguidas)) {
            valid2 = false;
            return false;
          }
        }
      })
    }
    valid = valid2
  })
  return valid;
};

const tratar = (arr) => {
  const obj = {};

  arr.forEach(materia => {
    obj[materia[0]] = materia[3]
  });
  return obj;
}


function gerarCombinacoes(obj_) {
  const obj = tratar(obj_);

  const keys = Object.keys(obj);

  let resultados = [[]];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const subarr = obj[key];
    const tmp = [];
    for (let j = 0; j < resultados.length; j++) {
      const resultado = resultados[j];
      for (let k = 0; k < subarr.length; k++) {
        const elemento = subarr[k];
        if (validarElemento(elemento, resultado, obj)) {
          tmp.push({ ...resultado, [key]: elemento });
        }
      }
    }
    resultados = tmp;
  }
  return resultados;
}

export default gerarCombinacoes

const days = [
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab",
]

const horarioList = [
  "0730",
  "0820",
  "0910",
  "1010",
  "1100",
  "1330",
  "1420",
  "1510",
  "1620",
  "1710",
  "1830",
  "1920",
  "2020",
  "2110",
]
// Noturno


function nextClassTime(horario, numero = 1) {
  if (numero >= 0 && numero < horarioList.length) {
    const indice = horarioList.indexOf(horario);

    if (indice !== -1) {
      const indiceHorario = indice + numero;

      if (indiceHorario >= 0 && indiceHorario < horarioList.length) {
        return horarioList[indiceHorario];
      }
    }
  }

  return null;
}

function horarioNumerico(horario) {
  const horas = parseInt(horario.slice(0, 2));
  const minutos = parseInt(horario.slice(2));
  return horas * 60 + minutos;
}

function temChoque(horario1, aulas1, horario2, aulas2) {
  const duracao1 = aulas1 * 50;
  const duracao2 = aulas2 * 50;

  const fim1 = horarioNumerico(horario1) + duracao1;
  const fim2 = horarioNumerico(horario2) + duracao2;

  //  console.log('is',(horarioNumerico(horario2) ))
  //  console.log('is',fim1)
  //  console.log('is',horarioNumerico(horario2) < fim1)

  return (horarioNumerico(horario2) <= fim1 && fim1 <= fim2) ||
    (horarioNumerico(horario1) <= fim2 && fim2 <= fim1);
}