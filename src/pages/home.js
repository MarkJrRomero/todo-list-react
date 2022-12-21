import {storage, ref, uploadBytesResumable, getDownloadURL } from "../api/config"
import {useState} from 'react'
import { saveTablero, saveNota } from "../api/api.js";
import SlideBar from '../components/slideBar.js';
import ClipLoader from "react-spinners/ClipLoader";
import { FaFileUpload, FaEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Home() {

    
    const [file, setFile] = useState('');
    const [name, setName] = useState('');
    const [crearTablero, setCrearTablero] = useState(false);

    const [filepreview, setFilepreview] = useState('https://media.istockphoto.com/id/1219544629/es/vector/imagen-galer%C3%ADa-icono-logotipo-vector-illustrattion-plantilla-vectorial-de-dise%C3%B1o-de-icono-de.jpg?s=612x612&w=0&k=20&c=6W6aQT1y-Z0xggT_dPdQbgIM4hxjvbJWfFWR3nZjJWA=');


    function handleChange(event) {
      setFile(event.target.files[0]);
      setFilepreview(URL.createObjectURL(event.target.files[0]));
    }

    // NUEVA NOTA
    const [tituloNota, setTituloNota] = useState('');

    function tituloNotaChange(event) {
      setTituloNota(event.target.value);
    }

    const [textNota, setTextNota] = useState('');

    function textNotaChange(event) {
      setTextNota(event.target.value);
    }

    function notaUpload() {
      
      if ( tituloNota === '' || textNota === '') {
      
        alert("error!")
        // if (!file){alert("Ingrese un archivo valido!")}
        // if (name === ''){alert("Ingrese un nombre valido!")}
        // if (name.length > 10){alert("Ingrese un nombre con maximo 10 caracteres!")}

      }else{

            let Nota = {
                titulo: tituloNota, 
                nota: textNota, 
              }

            try {
                  const docRef = saveNota(Nota); 
                  console.log("Nota Guardado: ", docRef.id);
                } catch (e) {
                  console.error("Error al guardar nota: ", e);
                }
            


            let form = document.getElementById("form-creear");
            form.reset()

        
      }
}
    // NUEVA NOTA

    function nameChange(event) {
      setName(event.target.value);
    }

    function handleUpload() {
      
      if (!file || name === '' || name.length > 10) {

        if (!file){alert("Ingrese un archivo valido!")}
        if (name === ''){alert("Ingrese un nombre valido!")}
        if (name.length > 10){alert("Ingrese un nombre con maximo 10 caracteres!")}

      }else{

      const storageRef = ref(storage, `/tableros/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(

          (err) => console.log(err), () => {
       
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            console.log(url);

            let Tablero = {name: name, image: url}

            try {
                  const docRef = await saveTablero(Tablero); 
                  console.log("Tablero Guardado: ", docRef.id);
                } catch (e) {
                  console.error("Error al guardar tablero: ", e);
                }
            
            });

            setFile('');
            setName('');
            setFilepreview('https://media.istockphoto.com/id/1219544629/es/vector/imagen-galer%C3%ADa-icono-logotipo-vector-illustrattion-plantilla-vectorial-de-dise%C3%B1o-de-icono-de.jpg?s=612x612&w=0&k=20&c=6W6aQT1y-Z0xggT_dPdQbgIM4hxjvbJWfFWR3nZjJWA=');
            let form = document.getElementById("form-creear");
            form.reset()

          }
        ); 
      }
    }


  return (
    <div className="Home">
      <SlideBar></SlideBar>
      <div className='content'>
        
        { crearTablero === true &&
          <Form id="form-creear" className='form-content'>
            <label className='titulo-text' >Creacion de un tablero</label>
            <input id="file-input" className="img-input" type="file" onChange={handleChange} accept="image/png,image/jpeg" />
            <label htmlFor="file-input" className="img-preview" style={{backgroundImage: `url('${filepreview}')` }}>
              <FaEdit  size={50} className="img-icon"/>
            </label>
            <Form.Control className='input-name' type="text" placeholder="Nombre del tablero" onChange={nameChange}  />
            <Button type="button" onClick={handleUpload} variant="success">Crear</Button>
          </Form>
        }

        { crearTablero === false &&
          <Form id="form-creear" className='form-content'>
            <label className='titulo-text' >Creacion de nueva nota</label>
            {/* <input id="file-input" className="img-input" type="file" onChange={handleChange} accept="image/png,image/jpeg" />
            <label htmlFor="file-input" className="img-preview" style={{backgroundImage: `url('${filepreview}')` }}>
              <FaEdit  size={50} className="img-icon"/>
            </label> */}
            <Form.Control className='input-nota' type="text" placeholder="Titulo de la nota" onChange={tituloNotaChange}  />
            <Form.Control 
              as="textarea" 
              rows={3}
              className='input-nota' type="text" placeholder="Escribe tu nota aqui" onChange={textNotaChange}  />
            <Button type="button" onClick={notaUpload} variant="success">Crear</Button>
          </Form>
        }

      </div>
    </div>
  );
}

export default Home;