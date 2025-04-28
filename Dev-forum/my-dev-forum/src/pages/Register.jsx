import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      nav('/forum');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={submit}>
        {['username','email','password'].map((field) => (
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
