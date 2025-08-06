import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getLivros = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/livros`, {params});
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
}

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
}

