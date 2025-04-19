import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { supbase} from '../../lib/supabaseClient';
import {Link} from 'react-router-dom';

const DetailPage = () => {
    const {id} = useParams();
    const [crewmate, setcrewmate] = useState(null);

    useEffect(() => {
        const fetchCrewmate = async() =>{
            const {data, error} = await supbase
                .from('crewmates')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching crewmate:', error);
            }
            else {
                setcrewmate(data);
            }
        };
        fetchCrewmate();
    }, [id]);

    if (!crewmate) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1 className="detail-title">{crewmate.name}</h1>
      <p><strong>Type:</strong> {crewmate.type}</p>
      <p><strong>Role:</strong> {crewmate.role}</p>
      <p><strong>Backstory:</strong> {crewmate.name} was caught in the tall grass and trained to be a top {crewmate.role}!</p>

      <Link to={`/edit/${crewmate.id}`} className="edit-link">
        Edit This Pokémon
      </Link>
    </div>
  );
};

export default DetailPage;