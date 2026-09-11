import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function Home() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const chiqish = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
  const controller = new AbortController();

  fetch('https://smart-django.onrender.com/rest/rest/', { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => setCars(data.results ?? data))
    .catch((err) => {
      if (err.name !== 'AbortError') {
        console.error(err);
        setError(err.message);
      }
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, []);

const toggleFavorite = (id) => {
  setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
};

  return (
    <div className="w-[1200px] mx-auto p-[20px]">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.css"
      />

      {/* HEADER - yangi qo'shildi */}
      <div className="flex items-center justify-between mb-[24px]">
        <h1 className="text-[24px] font-bold text-gray-800">Cars</h1>

        <div className="flex items-center gap-[15px]">
          <span className="text-[14px] text-gray-600">
            Salom, {user?.ism}!
          </span>
          <button
            onClick={chiqish}
            className="px-[16px] h-[36px] bg-red-500 text-white rounded-[8px] text-[14px] font-medium hover:bg-red-600"
          >
            Chiqish
          </button>
        </div>
      </div>

      {/* Yuklanmoqda */}
      {loading && (
        <p className="text-center text-gray-500 p-[40px]">Yuklanmoqda...</p>
      )}

      {/* Xatolik */}
      {error && (
        <p className="text-center text-red-500 p-[40px]">
          Xatolik: {error}
        </p>
      )}

      {/* Mashinalar yo'q */}
      {!loading && !error && cars.length === 0 && (
        <p className="text-center text-gray-500 p-[40px]">
          Hozircha mashina yo'q.
        </p>
      )}

      {/* Mashinalar ro'yxati */}
      {!loading && !error && cars.length > 0 && (
        <div className="flex flex-wrap gap-[20px]">
          {cars.map((item) => (
            <div
              key={item.id || item.nomi}
              className="w-[280px] bg-white border border-gray-200 rounded-[16px]"
            >
              {/* rasm qismi */}
              <div className="relative w-[280px] h-[190px] bg-gray-100">
                <Link to={`/car/${item.id}`}>
                  <span className="absolute top-[10px] left-[10px] z-10 text-white text-[12px] font-bold px-[8px] py-[4px] rounded-[4px] bg-pink-600">
                    TOP
                  </span>

                  <img
                    src={item.image}
                    alt={item.nomi}
                    className="w-[280px] h-[190px] object-cover rounded-[6px]"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => toggleFavorite(item.id)}
                  className={`absolute top-[10px] right-[10px] z-20 w-[32px] h-[32px] rounded-[16px] flex items-center justify-center border border-gray-200 ${
                    favorites[item.id]
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <i className="fa-regular fa-heart text-black"></i>
                </button>
              </div>

              <div className="p-[16px]">
                <Link to={`/car/${item.id}`}>
                  <h3 className="text-[16px] font-medium text-gray-800 mb-[8px]">
                    {item.nomi}
                  </h3>
                </Link>

                <p className="text-[18px] font-bold text-gray-900 mb-[10px]">
                  {formatPrice(item.puli)} so'm
                </p>

                <div className="flex items-center justify-between mb-[12px]">
                  <div className="text-yellow-400 text-[14px] font-bold">
                    {item.yulduzi || 5}
                  </div>

                  <div className="flex items-center gap-[4px] text-gray-600 text-[14px]">
                    <i className="fa-regular fa-eye"></i>
                    <span>{item.korishi}</span>
                  </div>
                </div>

                <div className="flex gap-[8px]">
                  <button className="w-[145px] h-[40px] rounded-[12px] border border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white text-[14px]">
                    Savatga
                  </button>

                  <Link
                    to={`/car/${item.id}`}
                    className="w-[90px] h-[40px] rounded-[12px] bg-gray-100 text-gray-700 font-medium text-[14px] flex items-center justify-center"
                  >
                    Batafsil
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatPrice(num) {
  if (!num) return '0';
  return Number(num).toLocaleString('ru-RU').replace(/,/g, ' ');
}

function formatViews(num) {
  if (!num) return '0';
  return Number(num).toLocaleString('ru-RU').replace(/,/g, ' ');
}

export default Home;