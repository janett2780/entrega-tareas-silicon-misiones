"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

function crearTablero() {
  const valores = [1, 2, 3, 4, 5, 6, 7, 8];
  const cartas = [...valores, ...valores];

  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }

  return cartas.map((valor, index) => ({
    id: index,
    valor,
    dadaVuelta: false,
    encontrada: false,
  }));
}

function formatearTiempo(totalSegundos) {
  const min = Math.floor(totalSegundos / 60);
  const seg = totalSegundos % 60;
  return `${min}:${seg.toString().padStart(2, "0")}`;
}

export default function Home() {
  const [tablero, setTablero] = useState(crearTablero);
  const [evaluando, setEvaluando] = useState(false);
  const [movimientos, setMovimientos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [jugando, setJugando] = useState(false);

  const dadasVuelta = tablero.filter((f) => f.dadaVuelta && !f.encontrada);
  const gano = tablero.every((f) => f.encontrada);

  function nuevaPartida() {
    setTablero(crearTablero());
    setEvaluando(false);
    setMovimientos(0);
    setSegundos(0);
    setJugando(false);
  }

  function darVuelta(id) {
    if (evaluando || gano) return;

    const ficha = tablero.find((f) => f.id === id);
    if (ficha.dadaVuelta || ficha.encontrada) return;
    if (dadasVuelta.length >= 2) return;

    if (!jugando) setJugando(true);

    setTablero(
      tablero.map((f) =>
        f.id === id ? { ...f, dadaVuelta: true } : f
      )
    );
  }

  useEffect(() => {
    if (dadasVuelta.length === 2) {
      setEvaluando(true);
      setMovimientos((m) => m + 1);
      const [a, b] = dadasVuelta;

      if (a.valor === b.valor) {
        setTablero((actual) =>
          actual.map((f) =>
            f.id === a.id || f.id === b.id
              ? { ...f, encontrada: true }
              : f
          )
        );
        setEvaluando(false);
      } else {
        const timer = setTimeout(() => {
          setTablero((actual) =>
            actual.map((f) =>
              f.id === a.id || f.id === b.id
                ? { ...f, dadaVuelta: false }
                : f
            )
          );
          setEvaluando(false);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dadasVuelta.length, dadasVuelta[0]?.id, dadasVuelta[1]?.id]);

  useEffect(() => {
    if (!jugando || gano) return;

    const intervalo = setInterval(() => {
      setSegundos((s) => s + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [jugando, gano]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>memory</h1>
        <button onClick={nuevaPartida}>Nueva partida</button>
      </header>

      {gano ? (
        <section className={styles.victoria}>
          <h2>¡Lo lograste!</h2>
          <p>Tiempo: {formatearTiempo(segundos)}</p>
          <p>Movimientos: {movimientos}</p>
          <button onClick={nuevaPartida}>Jugar de nuevo</button>
        </section>
      ) : (
        <section className={styles.grilla}>
          {tablero.map((ficha) => (
            <button
              key={ficha.id}
              className={styles.ficha}
              onClick={() => darVuelta(ficha.id)}
            >
              {(ficha.dadaVuelta || ficha.encontrada) ? ficha.valor : ""}
            </button>
          ))}
        </section>
      )}

      <footer className={styles.footer}>
        <div>
          <p>Tiempo</p>
          <p>{formatearTiempo(segundos)}</p>
        </div>
        <div>
          <p>Movimientos</p>
          <p>{movimientos}</p>
        </div>
      </footer>
    </main>
  );
}