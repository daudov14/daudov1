import React, { useState, useEffect } from 'react';

function InstallmentManager() {
  const [clients, setClients] = useState([]);
  const [installments, setInstallments] = useState([]);
  const [clientId, setClientId] = useState('');
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/clients')
      .then(res => res.json())
      .then(data => setClients(data));

    fetch('http://localhost:5000/api/installments')
      .then(res => res.json())
      .then(data => setInstallments(data));
  }, []);

  const addInstallment = async () => {
    await fetch('http://localhost:5000/api/installments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, amount, months, start_date: startDate })
    });
    const updated = await fetch('http://localhost:5000/api/installments').then(r => r.json());
    setInstallments(updated);
  };

  return (
    <div>
      <h3>Рассрочки</h3>
      <select onChange={e => setClientId(e.target.value)}>
        <option value="">Выберите клиента</option>
        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Сумма" />
      <input value={months} onChange={e => setMonths(e.target.value)} placeholder="Месяцы" />
      <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" />
      <button onClick={addInstallment}>Добавить</button>
      <ul>{installments.map(i => (
        <li key={i.id}>{i.client}: {i.amount}₽ / {i.months} мес. с {i.start_date}</li>
      ))}</ul>
    </div>
  );
}

export default InstallmentManager;
