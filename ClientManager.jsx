import React, { useState, useEffect } from 'react';

function ClientManager() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/clients')
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  const addClient = async () => {
    await fetch('http://localhost:5000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone })
    });
    setName('');
    setPhone('');
    const updated = await fetch('http://localhost:5000/api/clients').then(r => r.json());
    setClients(updated);
  };

  return (
    <div>
      <h3>Клиенты</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон" />
      <button onClick={addClient}>Добавить</button>
      <ul>{clients.map(c => <li key={c.id}>{c.name} — {c.phone}</li>)}</ul>
    </div>
  );
}

export default ClientManager;
