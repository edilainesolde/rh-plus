export const fetchExternalNotice = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) throw new Error('Falha na resposta.');
    const data = await response.json();
    return {
      sucesso: true,
      titulo: "Informativo do Sistema RH SENAI",
      conteudo: data.body,
      origem: "API Pública de Demonstração"
    };
  } catch (error) {
    return { sucesso: false, mensagem: error.message };
  }
};