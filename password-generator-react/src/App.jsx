import { useState } from 'react';
import './App.css';

function App() {
  const [longitud, setLongitud] = useState(10);
  const [conMayusculas, setConMayusculas] = useState(true);
  const [conMinusculas, setConMinusculas] = useState(true);
  const [conNumeros, setConNumeros] = useState(true);
  const [conSimbolos, setConSimbolos] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fortaleza, setFortaleza] = useState(null);
  const [copiado, setCopiado] = useState(false);
  const [historial, setHistorial] = useState([]);

  function copiarPassword() {
    if (!password) return;

    navigator.clipboard.writeText(password);
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  }

  function calcularFortaleza() {
    let puntos = 0;
    if (conMayusculas) puntos++;
    if (conMinusculas) puntos++;
    if (conNumeros) puntos++;
    if (conSimbolos) puntos++;
    if (longitud >= 12) puntos++;

    if (puntos <= 1) return { texto: 'Muy débil', color: '#ff4d4d', ancho: '25%' };
    if (puntos === 2) return { texto: 'Débil', color: '#ff9800', ancho: '50%' };
    if (puntos === 3) return { texto: 'Media', color: '#ffeb3b', ancho: '75%' };
    return { texto: 'Fuerte', color: '#4caf50', ancho: '100%' };
  }

  function generarPassword() {
    if (!conMayusculas && !conMinusculas && !conNumeros && !conSimbolos) {
      setError('Marcá al menos una opción');
      return;
    }
    if (longitud === 0) {
      setError('Marcá al menos una opción');
      return;
    }

    setError('');

    let permitidos = '';
    if (conMayusculas) permitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (conMinusculas) permitidos += 'abcdefghijklmnopqrstuvwxyz';
    if (conNumeros) permitidos += '0123456789';
    if (conSimbolos) permitidos += '!@#$%^&*';

    let resultado = '';
    for (let i = 0; i < longitud; i++) {
      const indiceAlAzar = Math.floor(Math.random() * permitidos.length);
      resultado += permitidos[indiceAlAzar];
    }

    setFortaleza(calcularFortaleza());
    setPassword(resultado);

    setHistorial((historialAnterior) => {
      const nuevoHistorial = [resultado, ...historialAnterior];
      return nuevoHistorial.slice(0, 5);
    });
  }

  return (
    <main className="contenedor">
      <h1>Generador de contraseñas</h1>

      <section className="tarjeta">
        <div className="visor">
          <input
            type="text"
            readOnly
            placeholder="P4$5W0rD!"
            className="input-password"
            value={password}
          />
          <button className="boton-copiar" onClick={copiarPassword}>📋</button>
          {copiado && <span className="aviso-copiado">¡Copiado!</span>}
        </div>

        <form className="formulario">
          <div className="fila-longitud">
            <span>Longitud</span>
            <span className="numero-longitud">{longitud}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={longitud}
            onChange={(e) => setLongitud(Number(e.target.value))}
          />

          <label>
            <input
              type="checkbox"
              checked={conMayusculas}
              onChange={(e) => setConMayusculas(e.target.checked)}
            />
            Incluir mayúsculas
          </label>

          <label>
            <input
              type="checkbox"
              checked={conMinusculas}
              onChange={(e) => setConMinusculas(e.target.checked)}
            />
            Incluir minúsculas
          </label>

          <label>
            <input
              type="checkbox"
              checked={conNumeros}
              onChange={(e) => setConNumeros(e.target.checked)}
            />
            Incluir números
          </label>

          <label>
            <input
              type="checkbox"
              checked={conSimbolos}
              onChange={(e) => setConSimbolos(e.target.checked)}
            />
            Incluir símbolos
          </label>

          {fortaleza && (
            <div className="fila-fortaleza">
              <span>FORTALEZA</span>
              <span>{fortaleza.texto}</span>
            </div>
          )}
          {fortaleza && (
            <div className="barra-fortaleza-fondo">
              <div
                className="barra-fortaleza-relleno"
                style={{ width: fortaleza.ancho, backgroundColor: fortaleza.color }}
              ></div>
            </div>
          )}

          {error && <p className="mensaje-error">{error}</p>}

          <button type="button" className="boton-generar" onClick={generarPassword}>
            GENERAR →
          </button>
        </form>

        {historial.length > 0 && (
          <div className="historial">
            <span className="titulo-historial">Historial</span>
            <ul>
              {historial.map((contraseña, indice) => (
                <li key={indice}>{contraseña}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;