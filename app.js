const LIMITE = 280;

const area = document.querySelector("#texto");
const caracteres = document.querySelector("#caracteres");
const palabras = document.querySelector("#palabras");
const sinEspacios = document.querySelector("#sinEspacios");
const restantes = document.querySelector("#restantes");
const limpiar = document.querySelector("#limpiar");
const barra = document.querySelector("#barra");

console.log(area);
console.log(caracteres);
console.log(palabras);
console.log(sinEspacios);
console.log(restantes);

area.addEventListener("input", actualizar);

function actualizar() {
  console.log(area.value);

  caracteres.textContent = area.value.length;

  const t = area.value.trim();
  palabras.textContent = t === "" ? 0 : t.split(/\s+/).length;

  sinEspacios.textContent = area.value.replaceAll(" ", "").length;

  restantes.textContent = LIMITE - area.value.length;

  const porcentaje = Math.min((area.value.length / LIMITE) * 100, 100);
  barra.style.width = porcentaje + "%";

  if (area.value.length > LIMITE) {
    area.classList.add("excedido");
    restantes.parentElement.classList.add("excedido");
    barra.classList.add("excedido");
  } else {
    area.classList.remove("excedido");
    restantes.parentElement.classList.remove("excedido");
    barra.classList.remove("excedido");
  }
}

limpiar.addEventListener("click", () => {
  area.value = "";
  actualizar();
});