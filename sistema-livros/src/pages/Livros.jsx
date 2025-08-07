import React, {useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import {InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getLivros, getCategorias } from '../services/livrosService';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default function Livros() {

  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
   

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

    
    const abrirDetalhes = (livro) => {
      setLivroSelecionado(livro);
      setModalAberto(true);
    };

      return (
        <div className="p-m-4">
          <h2>Livros Disponíveis</h2>
          <div className="p-d-flex p-ai-center p-mb-4" style={{ gap: 25, margin: 20 }}>
            <Dropdown
              value={categoriaSelecionada}
              onChange={e => setCategoriaSelecionada(e.value)}
              options={categorias.map(cat => ({ label: cat.name, value: cat.id }))}
              placeholder="Filtrar por categoria"
              showClear
              style={{ minWidth: 200, marginRight: 24}}
            />
            <span className="p-input-icon-left">
              <InputText
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar título ou autor"
                style={{ width: 300 }}
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
                  style={{ width: 250, marginBottom: 24 }}
                  header={
                    <img
                      src={livro.img || 'https://images.vexels.com/media/users/3/205462/isolated/preview/87b34912ed9f8d2900754c38220faac6-ilustracao-da-pilha-de-livros.png'}
                      alt={livro.title}
                      style={{ width: '200px', height: '140px', objectFit: 'contain', borderRadius: 8 , marginTop: 5 }}
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
                  onClick={() => abrirDetalhes(livro)}
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
          <Dialog
            header={livroSelecionado?.title}
            visible={modalAberto}
            style={{ width: '420px' }}
            modal
            onHide={() => setModalAberto(false)}
            footer={
              <button className="p-button p-component" onClick={() => setModalAberto(false)}>
                Fechar
              </button>
            }
          >
          {livroSelecionado && (
            <div>
              <div style={{
                width: 180, height: 270, margin: '0 auto 16px auto', background: '#f5f5f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8, overflow: 'hidden',
              }}>
                <img
                  src={livroSelecionado.img || ''}
                  alt={livroSelecionado.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <div><strong>Autor:</strong> {livroSelecionado.author}</div>
              <div><strong>Categoria:</strong> {categorias.find(cat => cat.id === livroSelecionado.category_id)?.name || 'Sem categoria'}</div>
              <div><strong>Publicado em:</strong> {new Date(livroSelecionado.published_date).toLocaleDateString()}</div>
              <div style={{ margin: '12px 0 0 0' }}><strong>Descrição:</strong><br />{livroSelecionado.description}</div>
              <div style={{ marginTop: 10 }}>
                <span style={{
                  background: livroSelecionado.available ? '#b2f2bb' : '#ffa8a8',
                  color: livroSelecionado.available ? '#155724' : '#721c24',
                  padding: '0.2rem 0.7rem', borderRadius: '1rem', fontWeight: 500, fontSize: '0.9rem'
                }}>
                  {livroSelecionado.available ? 'Disponível' : 'Indisponível'}
                </span>
              </div>
            </div>
          )}
        </Dialog>
        </div>
      );
    }