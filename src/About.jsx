import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function About() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/rest/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Ma'lumot topilmadi")
        return res.json()
      })
      .then((data) => {
        setCar(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Ma'lumot yuklashda xatolik yuz berdi")
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="text-center p-[40px] font-bold">Yuklanmoqda...</p>
  if (error) return <p className="text-center p-[40px] text-red-500">{error}</p>
  if (!car) return <p className="text-center p-[40px]">Ma'lumot topilmadi!</p>

  return (
    <div className="w-[1200px] my-[0px] mx-auto p-[20px] text-gray-800">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.css" />
     
      <div className="flex gap-[8px] text-[14px] text-gray-500 mb-[15px]">
        <Link to="/" className="hover:underline">Asosiy</Link>
        <span>/</span>
        <span>Qoramol</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">{car.nomi}</span>
      </div>

      <div className="flex justify-between items-center mb-[10px]">
        <div className="flex gap-[20px] text-[14px] text-gray-600">
          <span><i class="fa-regular fa-eye"></i> Ko'rishlar soni : {car.korishi}</span>
          <span className="text-yellow-500 font-bold">{car.baho} (141 ta baho)</span>
          <span>0 ta buyurtma</span>
        </div>
        <button type="button" className="text-[14px] text-gray-600 flex items-center gap-[5px]">
          <i class="fa-regular fa-heart"></i> Tanlanganlar
        </button>
      </div>

      <h1 className="text-[28px] font-bold mb-[20px]">{car.nomi}</h1>

      <div className="flex gap-[30px]">

        <div className="w-[650px]">
          <div className="w-[650px] h-[450px] bg-gray-100 rounded-[8px] overflow-hidden relative border border-gray-200">
            <button type="button" className="absolute left-[10px] top-[210px] w-[30px] h-[30px] bg-white rounded-[15px] flex items-center justify-center border border-gray-300">
              ‹
            </button>
            {car.image ? (
              <img src={car.image} alt={car.nomi} className="w-[650px] h-[450px] object-cover" />
            ) : (
              <div className="w-[650px] h-[450px] flex items-center justify-center text-gray-400">
                Rasm yo'q
              </div>
            )}
            <button type="button" className="absolute right-[10px] top-[210px] w-[30px] h-[30px] bg-white rounded-[15px] flex items-center justify-center border border-gray-300">
              ›
            </button>
          </div>

          <div className="flex gap-[12px] mt-[15px]">
            <div className="w-[80px] h-[60px] border-[2px] border-green-500 rounded-[6px] overflow-hidden">
              {car.image && <img src={car.image} alt="thumb" className="w-[80px] h-[60px] object-cover" />}
            </div>
            <div className="w-[80px] h-[60px] border border-gray-200 rounded-[6px] bg-gray-100"></div>
            <div className="w-[80px] h-[60px] border border-gray-200 rounded-[6px] bg-gray-100"></div>
          </div>
        </div>

        <div className="w-[480px]">

          <div className="border border-gray-200 rounded-[12px] p-[20px] mb-[20px] bg-white">
            <div className="flex justify-between items-center mb-[10px]">
              <span className="text-[14px] font-bold text-gray-700">"TEMURBEK SARDOR SARVAR" FX</span>
              <div className="flex gap-[10px] text-[12px] text-gray-400">
                <span><i class="fa-regular fa-thumbs-up"></i> 1</span>
                <span><i class="fa-regular fa-thumbs-down"></i> 0</span>
              </div>
            </div>

            <div className="flex items-baseline gap-[10px] mb-[15px]">
              <span className="text-[26px] font-extrabold text-gray-900">{car.puli} so'm</span>
              <span className="text-[14px] text-gray-400 line-through">39 000 000 so'm</span>
            </div>

            <button type="button" className="w-[438px] h-[44px] bg-emerald-500 text-white font-bold rounded-[8px] mb-[10px]">
              Savatga qo'shish
            </button>
            <button type="button" className="w-[438px] h-[44px] bg-white border border-emerald-500 text-emerald-600 font-bold rounded-[8px]">
              Sotib olish
            </button>
          </div>

          <div className="border border-gray-200 rounded-[12px] p-[15px] mb-[20px] text-[14px]">
            <p className="text-gray-500 mb-[8px]">Qo'shildi : 03.09.2026</p>
            <p className="text-[18px] font-bold mb-[8px] text-gray-800">+998 12 345 67 89 <i class="fa-regular fa-comment"></i></p>
            <p className="text-gray-600"><i class="fa-solid fa-map-marker"></i> Buxoro, Olot t.</p>
          </div>

          <div className="mb-[20px]">
            <p className="text-[14px] text-gray-600 mb-[8px]">Miqdori</p>
            <div className="flex items-center gap-[15px]">
              <div className="flex border border-gray-300 rounded-[6px] overflow-hidden">
                <button type="button" className="w-[36px] h-[36px] bg-gray-100 font-bold">-</button>
                <span className="w-[45px] h-[36px] flex items-center justify-center font-bold">1</span>
                <button type="button" className="w-[36px] h-[36px] bg-gray-100 font-bold">+</button>
              </div>
              <span className="text-[13px] text-emerald-600 font-medium">Sotuvda 500 dona bor</span>
            </div>
          </div>

          <div>
            <h3 className="text-[15px] font-bold mb-[8px]">Mahsulot haqida qisqacha:</h3>
            <p className="text-[13px] text-gray-600 leading-[20px]">
              Latviya va boshqa chet davlatlardan olib kelingan zotli chorva mollari tirik vaznda 35000 so'mdan kilogrami naqd pul va pul ko'chirish yo'li hamda kreditga sotiladi.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default About