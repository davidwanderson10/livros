import React, {useEffect, useState} from 'react';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getUsuarios } from '../services/usuariosService';

const userImg = 'https://www.w3schools.com/howto/img_avatar.png';
const userImg2 = 'https://www.w3schools.com/howto/img_avatar2.png';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsuarios()
      .then((data) => {
        setUsuarios(data);
        console.log(usuarios);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao buscar usuários. Tente novamente mais tarde.');
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <div className="loading" >
        <ProgressSpinner />
      </div>
    );
  }
  
  return (
    <div className="p-grid p-justify-center p-mt-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
      {usuarios.map((user, i) => (
        <Card
          key={i}
          style={{ width: '250px', textAlign: 'center', boxShadow: '0 2px 8px #eee', borderRadius: '10px' }}
          className="p-p-3"
        >
          <img
            src={userImg}
            alt="Usuário"
            style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: '1rem', objectFit: 'cover' }}
          />
          <h3>{user.name}</h3>
          <p style={{ margin: 0, color: '#666' }}>{user.email}</p>
          <span
            style={{
              display: 'inline-block',
              marginTop: '0.7rem',
              background: user.role === "admin" ? '#007ad9' : '#eee',
              color: user.role === "admin" ? '#fff' : '#333',
              padding: '0.3rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            {user.role}
          </span>
        </Card>
      ))}
    </div>
  );
}
