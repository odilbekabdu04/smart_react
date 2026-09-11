import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [parol, setParol] = useState('');
  const [xato, setXato] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setXato('');

    if (!email || !parol) {
      setXato("Email va parolni kiriting");
      return;
    }

    const natija = login(email, parol);
    if (natija.ok) {
      navigate('/');
    } else {
      setXato(natija.xato);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="w-[400px] bg-white p-[30px] rounded-[12px] shadow-md">
        <h2 className="text-[24px] font-bold text-center mb-[20px]">Kirish</h2>

        {xato && (
          <p className="bg-red-100 text-red-600 text-[14px] p-[10px] rounded-[6px] mb-[15px]">
            {xato}
          </p>
        )}

        <label className="block text-[14px] text-gray-600 mb-[5px]">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[42px] border border-gray-300 rounded-[8px] px-[12px] mb-[15px] outline-none focus:border-emerald-500"
          placeholder="email@example.com"
        />

        <label className="block text-[14px] text-gray-600 mb-[5px]">Parol</label>
        <input
          type="password"
          value={parol}
          onChange={(e) => setParol(e.target.value)}
          className="w-full h-[42px] border border-gray-300 rounded-[8px] px-[12px] mb-[20px] outline-none focus:border-emerald-500"
          placeholder="Parolingiz"
        />

        <button
          type="submit"
          className="w-full h-[44px] bg-emerald-500 text-white font-bold rounded-[8px] hover:bg-emerald-600"
        >
          Kirish
        </button>

        <p className="text-center text-[14px] text-gray-500 mt-[15px]">
          Akauntingiz yo'qmi?{' '}
          <Link to="/register" className="text-emerald-600 font-medium hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </form>
    </div>
  );
}