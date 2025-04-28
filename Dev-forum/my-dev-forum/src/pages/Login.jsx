import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      nav('/forum');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={submit}>
        {['email','password'].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              type={field==='password'?'password':'text'}
              name={field}
              value={form[field]}
              onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
              required
            />
          </div>
        ))}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
