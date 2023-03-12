function parseHorarios(texto) {
  let regex
  regex = /^(\d)\.(\d{4})-(\d) \/ ([A-Z]+\d*)-([A-Z]+|\d{4})(\d{3}|[A-Z]*)$/;
  const gruposDeCaptura = texto.match(regex);
  if (gruposDeCaptura !== null) {
    const [
      _,
      diaDaSemana,
      horarioDaPrimeiraAula,
      numeroDeAulas,
      codigoDoDepartamento,
      codigoDaSala,
      numeroDaSala
    ] = gruposDeCaptura

    return {
      numeroDeAulas,
      horarioDaPrimeiraAula: horarioDaPrimeiraAula.replace(/^(\d{2})(\d{2})/, "$1:$2"),
      diaDaSemana,
      codigoDoDepartamento,
      codigoDaSala,
      numeroDaSala
    }


  } else {
    console.log("Não foi possível extrair as informações do texto.");
  }
}
export default parseHorarios