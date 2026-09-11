import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [ism, setIsm] = useState('');
  const [email, setEmail] = useState('');
  const [parol, setParol] = useState('');
  const [parol2, setParol2] = useState('');
  const [xato, setXato] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setXato('');

    if (!ism || !email || !parol) {
      setXato("Barcha maydonlarni to'ldiring");
      return;
    }
    if (parol.length < 6) {
      setXato("Parol kamida 6 ta belgidan iborat bo'lsin");
      return;
    }
    if (parol !== parol2) {
      setXato("Parollar mos kelmadi");
      return;
    }

    const natija = register(ism, email, parol);
    if (natija.ok) {
      navigate('/');
    } else {
      setXato(natija.xato);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="w-[400px] bg-white p-[30px] rounded-[12px] shadow-md">
        <h2 className="text-[24px] font-bold text-center mb-[20px]">Ro'yxatdan o'tish</h2>

        {xato && (
          <p className="bg-red-100 text-red-600 text-[14px] p-[10px] rounded-[6px] mb-[15px]">
            {xato}
          </p>
        )}

        <label className="block text-[14px] text-gray-600 mb-[5px]">Ism</label>
        <input
          type="text"
          value={ism}
          onChange={(e) => setIsm(e.target.value)}
          className="w-full h-[42px] border border-gray-300 rounded-[8px] px-[12px] mb-[15px] outline-none focus:border-emerald-500"
          placeholder="Ismingiz"
        />

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
          className="w-full h-[42px] border border-gray-300 rounded-[8px] px-[12px] mb-[15px] outline-none focus:border-emerald-500"
          placeholder="Kamida 6 ta belgi"
        />

        <label className="block text-[14px] text-gray-600 mb-[5px]">Parolni tasdiqlang</label>
        <input
          type="password"
          value={parol2}
          onChange={(e) => setParol2(e.target.value)}
          className="w-full h-[42px] border border-gray-300 rounded-[8px] px-[12px] mb-[20px] outline-none focus:border-emerald-500"
          placeholder="Parolni qayta kiriting"
        />

        <button
          type="submit"
          className="w-full h-[44px] bg-emerald-500 text-white font-bold rounded-[8px] hover:bg-emerald-600"
        >
          Ro'yxatdan o'tish
        </button>

        <p className="text-center text-[14px] text-gray-500 mt-[15px]">
          Akauntingiz bormi?{' '}
          <Link to="/login" className="text-emerald-600 font-medium hover:underline">
            Kirish
          </Link>
        </p>
      </form>
    </div>
  );
}