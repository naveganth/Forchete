//usar react-query - @tanstack/react-query

export async function puxarNoticias() {
  const res = await fetch('https://projeti.gabrielataide.com/pegar_noticias?data_inicio=2020-04-01&data_fim=2027-05-01&quantidade=10&offset=0', {
    next: { revalidate: 100 }, 
  });

  if (!res.ok) {
    throw new Error('Falhou em puxar noticias');
  }

  return res.json();
}
