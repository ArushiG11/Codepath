import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supbase } from '../../lib/supabaseClient';

const types = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic'];
const roles = ['Attacker', 'Defender', 'Support', 'Tank', 'Utility'];

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supbase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching crewmate:', error);
      } else {
        setName(data.name);
        setType(data.type);
        setRole(data.role);
      }
    };

    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supbase
      .from('crewmates')
      .update({
        name,
        type: type,
        role: role,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating:', error);
      alert('Failed to update.');
    } else {
      navigate('/summary');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this crewmate?');

    if (confirm) {
      const { error } = await supbase.from('crewmates').delete().eq('id', id);
      if (error) {
        console.error('Error deleting:', error);
        alert('Could not delete.');
      } else {
        navigate('/summary');
      }
    }
  };

  return (
    <div className="container">
  <h1>Edit Pokémon</h1>
  <form onSubmit={handleUpdate}>
    <label>Name:</label>
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter name"
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

    <div style={{ marginTop: '20px' }}>
      <button type="submit" className="submit-btn">
        Save Changes
      </button>
      <button
        type="button"
        onClick={handleDelete}
        style={{ marginLeft: '1rem' }}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  </form>
</div>

  );
};

export default EditPage;
