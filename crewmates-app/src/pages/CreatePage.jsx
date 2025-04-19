import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supbase } from '../../lib/supabaseClient'; 

const types = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic'];
const roles = ['Attacker', 'Defender', 'Support', 'Tank', 'Utility'];

const CreatePage = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !type || !role) {
      alert('Please fill in all fields');
      return;
    }

    const { error } = await supbase
      .from('crewmates')
      .insert([
        {
          name,
          type: type, 
          role: role,
        },
      ]);

    console.log('Creating crewmate:', { name, type, role });

    if (error) {
      console.error('Error creating crewmate:', error);
      alert('Error creating crewmate');
    } else {
      navigate('/summary');
    }
  };

  return (
    <div className="container">
  <h1>Create Your Pokémon</h1>
  <form onSubmit={handleSubmit}>
    <label>Name:</label>
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter Pokémon name"
    />

    <label>Type:</label>
    <div className="button-group">
      {types.map((t) => (
        <button
          type="button"
          key={t}
          onClick={() => setType(t)}
          className={type === t ? 'selected' : ''}
        >
          {t}
        </button>
      ))}
    </div>

    <label>Role:</label>
    <div className="button-group">
      {roles.map((r) => (
        <button
          type="button"
          key={r}
          onClick={() => setRole(r)}
          className={role === r ? 'selected' : ''}
        >
          {r}
        </button>
      ))}
    </div>

    <button type="submit" className="submit-btn">
      Add to Team
    </button>
  </form>
</div>
  );
};

export default CreatePage;
