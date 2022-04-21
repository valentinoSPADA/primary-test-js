import './App.css';
import { useEffect, useState } from 'react'


// Utilice react para el front. Ya que me sentia mas comodo y
// se me complico un poco el inicio de la aplicacion con Angular

// Para mostrar la informacion, hardcodie los datos que deberia
// traerme del back. Por ese motivo la funcion de traer las personas
// No esta en esta parte del proyecto.

// Un punto que hice extra, fue agregarle el boton detalle, que
// muestra un pop-up con la info de la direccion del user

function App() {



  const [personas, setPersonas] = useState([{
    id: 1,
    nombre: "Juan",
    apellido: "Perez"
  }, {
    id: 2,
    nombre: "Jorge",
    apellido: "Lopez"
  }, {
    id: 3,
    nombre: "Esteban",
    apellido: "Ferreira"
  }
  ])

  const [open, setOpen] = useState(false)

  const [dir, setDir] = useState({
    calleAltura: `Calle Falsa 123`,
    ciudad: "Azul",
    provincia: "Buenos Aires",
    codigoPostal: "123",
    pais: "Argentina"
  })



  const completePersons = (persons) => {
    let listaCP = [{
      codigoPostal: "1047",
      calle: "Lavalle",
      ciudad: "Buenos Aires",
      provincia: "Buenos Aires"
    }, {
      codigoPostal: "1044",
      calle: "Arriola",
      ciudad: "Buenos Aires",
      provincia: "Buenos Aires"
    }]

    let result = persons?.map((p, i) => {
      let direcPersona = [{
        personaId: 1,
        calle: "Lavalle",
        altura: "150",
        ciudad: "Buenos Aires",
        provincia: "Buenos Aires",
        pais: "Argentina"
      }, {
        personaId: 2,
        calle: "Arriola",
        altura: "1520",
        ciudad: "Buenos Aires",
        provincia: "Buenos Aires",
        pais: "Argentina"
      }, {
        personaId: 3,
      }]

      if (direcPersona[i].hasOwnProperty('calle')) {
        let CP = listaCP?.filter(cp => cp.calle + cp.ciudad + cp.provincia === direcPersona[i].calle + direcPersona[i].ciudad + direcPersona[i].provincia)[0].codigoPostal
        const finalPerson = {
          ...p, direccion: {
            calleAltura: `${direcPersona[i].calle} ${direcPersona[i].altura}`,
            ciudad: direcPersona[i].ciudad,
            provincia: direcPersona[i].provincia,
            codigoPostal: CP,
            pais: direcPersona[i].pais
          }
        }
        return finalPerson
      } else {
        const finalPerson = {
          ...p, direccion: {
            calleAltura: `Calle Falsa 123`,
            ciudad: "Azul",
            provincia: "Buenos Aires",
            codigoPostal: "1234",
            pais: "Argentina"
          }
        }
        return finalPerson
      }
    })
    setPersonas(result)
  }


  useEffect(() => {
    completePersons(personas);
  }, [])





  return (
    <div className="App" id={open ? "during-popup" : ""}>
      <h1>Lista de personas</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Pais</th>
            <th scope="col">Detalle direccion</th>
          </tr>
        </thead>
        <tbody>
          {personas?.map((p) => {
            return (
              <tr key={p.id} className="spacing">
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.direccion?.pais}</td>
                <td><button className="button-39" onClick={() => { setOpen(!open); setDir({ ...p.direccion }) }}>Detalle</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
          {open ?
            <div className='popUp'>
              <div className="pu-content-container">
                <h1>Direccion</h1>
                <ul className='list'>
                  <li><p><b>Pais: </b>{dir.pais}</p></li>
                  <li><p><b>Ciudad: </b>{dir.ciudad}</p></li>
                  <li><p><b>Provincia: </b>{dir.provincia}</p></li>
                  <li><p><b>Calle y altura: </b>{dir.calleAltura}</p></li>
                  <li><p><b>Codigo postal: </b>{dir.codigoPostal}</p></li>
                </ul>
              </div>
              <button className="popup-x" onClick={() => setOpen(false)} >Listo</button>
            </div> : null}
    </div>
  );
}

export default App;
