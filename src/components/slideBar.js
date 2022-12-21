
import 'material-symbols';
import {useState , useEffect} from 'react';

import { collection, onGetTableros, onSnapshot } from "../api/api.js";
import { db } from "../api/config.js";
import Button from 'react-bootstrap/Button';
import { FaTh, FaTasks } from "react-icons/fa";



function SlideBar() {

  const [data, setData] = useState([]);

  const getTablerosDeLaApi = async () => {
    const tableros = collection(db, "tableros");
    const unsub = onSnapshot(tableros, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setData(docs);
    });
  };
 
    
  useEffect(() => {
    getTablerosDeLaApi();
  }, []);
    
  return (
    <div className="SlideBar">


                  <div  className='opciones-div'>
                    <Button className='opciones-btn'type="button"  variant="success">
                    <span className='opciones-btn-text' >Nuevo Tablero</span> 
                      <FaTh  className='opciones-btn-icon' size={25}/>
                    </Button>
                    <Button className='opciones-btn' type="button"  variant="danger">
                      <span className='opciones-btn-text' >Nueva Nota</span> 
                      <FaTasks  className='opciones-btn-icon' size={25}/>
                    </Button>
                  </div>

                  {data.map((tablero) => (
                    <div key={tablero.id} className='tablero-div'>
                    <img className='tablero-img' src={tablero.image} alt=''></img>
                    <span className='tablero-text'>{tablero.name}</span>
                    </div>
                  ))}

    </div>
  );
}

export default SlideBar;
