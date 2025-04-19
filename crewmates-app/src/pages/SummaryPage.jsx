import {useState, useEffect} from 'react';
import { supbase } from '../../lib/supabaseClient';
import {Link} from 'react-router-dom';


const SummaryPage = () =>{
    const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {
        const fetchCrewmates = async () => {
            const { data, error } = await supbase
                .from('crewmates')
                .select('*')
                .order('created_at', { ascending: false });
            // Check for errors and set the crewmates state;

            if (error) {
                console.error('Error fetching crewmates:', error);
            } else {
                setCrewmates(data);
            }
        };

        fetchCrewmates();
    }, []);
    return (
      <div className="container">
      <h1>Pokémon Team</h1>
      {crewmates.length === 0 ? (
        <p className="empty">No crewmates yet. Go catch some!</p>
      ) : (
        <ul className="crewmate-list">
          {crewmates.map((mate) => (
            <li key={mate.id} className="crewmate-card">
              <div className="crewmate-info">
                <strong>{mate.name}</strong>
                <p>{mate.type} / {mate.role}</p>
              </div>
              <div className="crewmate-actions">
                <Link to={`/detail/${mate.id}`}>View</Link>
                <span> | </span>
                <Link to={`/edit/${mate.id}`}>Edit</Link>
              </div>
              <img src="/pokeball.png" alt="pokeball" className="crewmate-icon" />
            </li>
          ))}
        </ul>
      )}
    </div>

      );
    };


export default SummaryPage;