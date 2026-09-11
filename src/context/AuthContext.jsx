import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      if (saved) setUser(JSON.parse(saved));
    } catch (err) {
      localStorage.removeItem('currentUser');
    }
    setLoading(false);
  }, []);

  const register = (ism, email, parol) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const bor = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (bor) {
        return { ok: false, xato: "Bu email allaqachon ro'yxatdan o'tgan" };
      }

      const yangiUser = {
        id: Date.now(),
        ism: ism.trim(),
        email: email.toLowerCase().trim(),
        parol,
      };

      users.push(yangiUser);
      localStorage.setItem('users', JSON.stringify(users));

      const { parol: _, ...userData } = yangiUser;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);

      return { ok: true };
    } catch (err) {
      return { ok: false, xato: "Xatolik yuz berdi" };
    }
  };

  const login = (email, parol) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const topildi = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.parol === parol
      );

      if (!topildi) {
        return { ok: false, xato: "Email yoki parol noto'g'ri" };
      }

      const { parol: _, ...userData } = topildi;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);

      return { ok: true };
    } catch (err) {
      return { ok: false, xato: "Xatolik yuz berdi" };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}