window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  const FAV_ARRAY = "arrayFavorite";
  let array = [];
  if (!localStorage.getItem(FAV_ARRAY)) {
    localStorage.setItem(FAV_ARRAY, JSON.stringify([]));
  } else {
    array = JSON.parse(localStorage.getItem(FAV_ARRAY));
  }

  console.log(JSON.parse(localStorage.getItem(FAV_ARRAY)));

  let movies = await fetch("http://localhost:3031/api/movies");
  movies = await movies.json();
  let data = movies.data;
  data.forEach((movie) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const h1 = document.createElement("h1");
    h1.textContent = movie.title;

    const divStar = document.createElement("div");
    divStar.style.cursor = "pointer";
    if (array.includes(+movie.id)) {
      divStar.classList.add("btnStar", "fa-solid", "fa-star");
    } else {
      divStar.classList.add("btnStar", "fa-regular", "fa-star");
    }

    divStar.id = movie.id;
    const p = document.createElement("p");
    p.textContent = `Rating: ${movie.rating}`;

    const duracion = document.createElement("p");
    duracion.textContent = `Duración: ${movie.length}`;

    const link = document.createElement("a");
    link.textContent = "Ver mas";
    link.setAttribute("href", `/formulario.html?movie=${movie.id}`);
    link.classList.add("botonVerMas");
    container.appendChild(card);
    card.appendChild(h1);
    h1.appendChild(divStar);
    card.appendChild(p);
    if (movie.genre !== null) {
      const genero = document.createElement("p");
      genero.textContent = `Genero: ${movie.genre.name}`;
      card.appendChild(genero);
    }
    card.appendChild(duracion);
    card.appendChild(link);
  });

  const arrayStar = document.querySelectorAll(".btnStar");

  arrayStar.forEach((btnStar) => {
    btnStar.addEventListener("click", function (e) {
      if (array.includes(+e.target.id)) {
        array = array.filter((id) => id !== +e.target.id);
        localStorage.setItem(FAV_ARRAY, JSON.stringify(array));
        this.classList.remove("fa-solid");
        this.classList.add("fa-regular");
      } else {
        array.push(+e.target.id);
        localStorage.setItem(FAV_ARRAY, JSON.stringify(array));
        this.classList.add("fa-solid");
        this.classList.remove("fa-regular");
      }
    });
  });
};
