
const tratar = (arr) => {
  const obj = {};

  arr.forEach(materia => {
    obj[materia[0]] = materia[3]
  });
  return obj;
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




  return (horarioNumerico(horario2) <= fim1 && fim1 <= fim2) ||
    (horarioNumerico(horario1) <= fim2 && fim2 <= fim1);
}

//TODO --------------------------
const validarElemento = (elemento, combinacao, obj, opt) => {

  const ignorarConflito = opt.ignorarConflito
  const ignorarCheias = opt.ignorarCheias

  const keys = Object.keys(obj);
  const grupo = keys.find(key => obj[key].includes(elemento));

  if (combinacao.hasOwnProperty(grupo)) {
    return false;
  }


  let cheia = false;
  if (ignorarCheias) {
    if (elemento[2] - elemento[3] == 0 || elemento[5] == 0) {
      cheia = true
    }
    if (cheia) {
      return (false)
    }
  }


  if (ignorarConflito) {
    return (true)
  }


  //Se Algum Horário do Elemento =>
  return !elemento?.[7].some(esseHorario => {
    const [
      // eslint-disable-next-line   
      _,
      dia,
      hora_inicio,
      aulas_seguidas
    ] = /^(\d{1}).(\d{4})-(\d{1})/g.exec(esseHorario);
    //Se nenhuma turma da combinação =>
    return Object.keys(combinacao).some((nomeOutraTurma) =>
      combinacao[nomeOutraTurma][7].some(outroHorario => {
        //para cada horario da combinação => 
        const [
          // eslint-disable-next-line   
          _2,
          outra_aula_dia,
          outra_aula_inicio,
          outra_aula_aulas_seguidas
        ] = /^(\d{1}).(\d{4})-(\d{1})/g.exec(outroHorario);

        //se dias diferentes = "valido"
        if (dia != outra_aula_dia) {
          return (false)
        }
        if (temChoque(hora_inicio, aulas_seguidas, outra_aula_inicio, outra_aula_aulas_seguidas)) {
          //tem choque de horario
          return (true);
        }

        // válido
        return (false);
      })
    )
  })
}



function agruparTurmas(materias) {

  const newMaterias = {}
  Object.keys(materias).forEach(nome_materia => {
    const oldMat = [...materias[nome_materia]]

    const newTurmas = oldMat.reduce((turmas_acumulador, essaTurma) => {
      const essesHorarios =
        essaTurma[7].map(tt => /^(\d{1}.\d{4})/g.exec(tt)?.[1])

      const temigual = turmas_acumulador.some((outraTurma) => {
        const outrosHorarios = outraTurma[7].map(tt => /^(\d{1}.\d{4})/g.exec(tt)?.[1])
        if (JSON.stringify(essesHorarios) == JSON.stringify(outrosHorarios)) {
          return (true);
        }
        return (false);
      })

      if (temigual) {
        return turmas_acumulador
      }

      return [...turmas_acumulador, essaTurma]
    }, [])
    newMaterias[nome_materia] = newTurmas
  })

  return newMaterias;
}


function gerarCombinacoes(obj_, opt) {
  // const obj = tratar(obj_);
  const agrupar = opt?.agrupar ?? true
  const ignorarConflito = opt?.ignorarConflito ?? false

  const ignorarCanceladas = opt?.ignorarCanceladas ?? true
  const ignorarCheias = opt?.ignorarCheias ?? true

  const config = {
    agrupar,
    ignorarConflito,
    ignorarCanceladas,
    ignorarCheias,
  }

  let obj = tratar(obj_);

  if (agrupar) {
    obj = agruparTurmas(obj);
  }

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
        if (validarElemento(elemento, resultado, obj, config)) {
          tmp.push({ ...resultado, [key]: elemento });
        }
      }
    }
    resultados = tmp;
  }
  return resultados;
}

export default gerarCombinacoes