export function gerarEmailUnico() {
  return `qa.${crypto.randomUUID()}@teste.com`;
}
export function gerarIdAleatorio(tamanho = 16) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return Array.from(
    { length: tamanho },
    () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  ).join('');
}

export const normalizarTexto = (texto) => {
  return texto
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
};