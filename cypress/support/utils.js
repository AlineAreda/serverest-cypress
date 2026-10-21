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