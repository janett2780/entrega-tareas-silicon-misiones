console.log;

let categorias = ["Rock", "Pop", "Jazz", "Indie"];

console.log(categorias);
console.log(`Cantidad de categorías: ${categorias.length}`);

console.log(`Primera categoría: ${categorias[0]}`);
console.log(`Última categoría: ${categorias[categorias.length - 1]}`);

categorias.push("Metal");
console.log(`Cantidad de categorías tras push: ${categorias.length}`);

let categoriaEliminada = categorias.pop();
console.log(`Categoría eliminada: ${categoriaEliminada}`);


console.log;

let usuario = {
    nombre: "Letizia",
    edad: 25,
    ciudad: "Posadas",
    temaFavorito: "Música"
};

console.log(`Nombre: ${usuario.nombre}, Edad: ${usuario.edad}, Ciudad: ${usuario.ciudad}, Tema favorito: ${usuario.temaFavorito}`);

usuario.edad = 25;
console.log(`Edad actualizada: ${usuario.edad}`);

usuario.profesion = "Estudiante";
console.log(usuario);


console.log;

let catalogo = [
    { titulo: "Abbey Road", categoria: "Rock", puntaje: 10, visto: true },
    { titulo: "Thriller", categoria: "Pop", puntaje: 9, visto: true },
    { titulo: "Kind of Blue", categoria: "Jazz", puntaje: 8, visto: false },
    { titulo: "AM", categoria: "Indie", puntaje: 7, visto: true }
];

console.log(`Primer título: ${catalogo[0].titulo}`);
console.log(`Puntaje del tercer elemento: ${catalogo[2].puntaje}`);

let estadoSegundo = catalogo[1].visto ? "visto" : "pendiente";
console.log(`${catalogo[1].titulo} ${catalogo[1].categoria} ${catalogo[1].puntaje}/10 ${estadoSegundo}`);

catalogo[2].puntaje = 9;
console.log(`Puntaje actualizado: ${catalogo[2].puntaje}`);

catalogo.push({ titulo: "Random Access Memories", categoria: "Pop", puntaje: 10, visto: false });
console.log(`Cantidad de elementos del catálogo: ${catalogo.length}`);


console.log;

let { titulo, categoria, puntaje, visto } = catalogo[0];
let estadoPrimerElemento = visto ? "visto" : "pendiente";
console.log(`${titulo} ${categoria} ${puntaje}/10 ${estadoPrimerElemento}`);

let { nombre, ciudad } = usuario;
console.log(`Nombre: ${nombre}, Ciudad: ${ciudad}`);

let [primero, segundo] = catalogo;
console.log(`Primero: ${primero.titulo}`);
console.log(`Segundo: ${segundo.titulo}`);


console.log;

let { titulo: tituloDestacado } = catalogo[2];
console.log(`Título destacado: ${tituloDestacado}`);

let { pais = "Argentina" } = usuario;
console.log(`País: ${pais}`);

let a = 10;
let b = 20;
[a, b] = [b, a];
console.log(`Valores intercambiados: a=${a}, b=${b}`);