import React, {useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import {InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getLivros, getCategorias } from '../services/livrosService';


export default function Livros() {

  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
   

  useEffect(() => {
    getCategorias()
        .then((data) => {
          setCategorias(data);
        })
        .catch((error) => {
          console.error('Erro ao buscar categorias:', error);
          alert('Erro ao buscar categorias. Tente novamente mais tarde.');
        })
    }, []);

    useEffect(() => {
      setLoading(true);
      const params = {};
      if (categoriaSelecionada) params.category_id = categoriaSelecionada;
      if (busca) params.busca = busca;

      getLivros(params)
      .then((data) => {
        setLivros(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar livros:', error);
        alert('Erro ao buscar livros. Tente novamente mais tarde.');
      })
      .finally(() => {
        setLoading(false);
      });
    }, [categoriaSelecionada, busca]);



      return (
        <div className="p-m-4">
          <h2>Livros Disponíveis</h2>
          <div className="p-d-flex p-ai-center p-mb-4" style={{ gap: 16 }}>
            <Dropdown
              value={categoriaSelecionada}
              onChange={e => setCategoriaSelecionada(e.value)}
              options={categorias.map(cat => ({ label: cat.name, value: cat.id }))}
              placeholder="Filtrar por categoria"
              showClear
              style={{ minWidth: 200, margin: 10}}
            />
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar título ou autor"
                style={{ width: 300, margin: 10 }}
              />
            </span>
          </div>
    
          {loading ? (
            <div className="p-d-flex p-jc-center" style={{ minHeight: 200 }}>
              <ProgressSpinner />
            </div>
          ) : (
            <div className="p-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {livros.map(livro => (
                <Card
                  key={livro.id}
                  title={livro.title.length > 15
                    ? livro.title.slice(0, 15) + '...'
                    : livro.title}
                  subTitle={livro.author}
                  style={{ width: 300, marginBottom: 24 }}
                  header={
                    <img
                      src={livro.img || 'https://images.vexels.com/media/users/3/205462/isolated/preview/87b34912ed9f8d2900754c38220faac6-ilustracao-da-pilha-de-livros.png'}
                      alt={livro.title}
                      style={{ width: '100%', height: '50%', objectFit: 'fill', borderRadius: 8 }}
                    />
                  }
                  footer={
                    <div className="p-d-flex p-jc-between p-ai-center">
                      <span style={{
                        background: livro.available ? '#b2f2bb' : '#ffa8a8',
                        color: livro.available ? '#155724' : '#721c24',
                        padding: '0.2rem 0.7rem',
                        borderRadius: '1rem',
                        fontWeight: 500,
                        fontSize: '0.9rem'
                      }}>
                        {livro.available ? 'Disponível' : 'Indisponível'}
                      </span>
                      <span style={{
                        background: '#f1f3f5', color: '#495057', borderRadius: '1rem',
                        padding: '0.2rem 0.7rem', fontSize: '0.85rem'
                      }}>
                        {categorias.find(cat => cat.id === livro.category_id)?.name || 'Sem categoria'}
                      </span>
                    </div>
                  }
                >
                  <div style={{ fontSize: '0.96rem', color: '#666' }}>
                    {livro.description.length > 85
                      ? livro.description.slice(0, 85) + '...'
                      : livro.description}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      );
    }