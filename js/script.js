const url = "https://striveschool-api.herokuapp.com/api/movies/";
const par = new URLSearchParams(location.search);
const id = par.get("id");

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2NhNzJhZTE3ZWE3ODAwMTUyZWJlYzYiLCJpYXQiOjE2NzQyMjMyOTgsImV4cCI6MTY3NTQzMjg5OH0.OQcthGhLshWhIJnXJ8R-bg6Y8-vRGx6ce3krVyBp8jI",
  "Content-Type": "application/json",
});

const addMovie = async () => {
  try {
    const newMovie = {
      name: document.querySelector("#movie-name").value,
      description: document.querySelector("#description").value,
      category: document.querySelector("#category").value,
      imageUrl: document.querySelector("#image-url").value,
    };
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers,
    });
    if (response.ok) {
      console.log("Successful");
      document.querySelector("#movie-name").value = "";
      document.querySelector("#description").value = "";
      document.querySelector("#category").value = "";
      document.querySelector("#image-url").value = "";
      showMovie();
    } else {
      console.error("Error");
    }
  } catch (error) {
    console.error(error);
  }
};

window.onload = async () => {
  await showMovie();
};

const showMovie = async () => {
  try {
    const response = await fetch(url + "comedy", { headers });
    const moviesData = await response.json();
    renderMovies(moviesData);
    console.log(moviesData);
  } catch (error) {
    console.error(error);
  }
};
const editMovie = async (editMovie) => {
  try {
    editMovie.preventDefault();
    const edit = {
      name: document.querySelector("#movie-name").value,
      description: document.querySelector("#description").value,
      category: document.querySelector("#category").value,
      imageUrl: document.querySelector("#image-url").value,
    };

    const response = await fetch(url + id, {
      method: "PUT",
      body: JSON.stringify(edit),
      headers,
    });

    if (response.ok) {
      console.log("Success");
      showMovie();
      document.querySelector("#movie-name").value = "";
      document.querySelector("#description").value = "";
      document.querySelector("#category").value = "";
      document.querySelector("#image-url").value = "";
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteMovie = async (movieId) => {
  try {
    let res = await fetch(url + movieId, { method: "DELETE", headers });
    console.log(res);
    if (res.ok) {
      await showMovie();
    }
  } catch (error) {
    console.log(error);
  }
};
const newMovieRow = document.querySelector("#new-movies");

const renderMovies = (movieArray) => {
  const row = document.querySelector("#new-movies");
  row.innerHTML = "";
  movieArray.forEach((singleMovie) => {
    const { name, description, category, imageUrl, _id } = singleMovie;
    row.innerHTML += `<div class="col">
    <div class="card" style="width: 13em;">
       <img src="${imageUrl}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${name}</h5>
         <p class="card-text">${description}</p>
         <p class="card-text">${category}</p>
         <a href='./backoffice.html?id=${_id}' class='btn btn-primary rounded-pill m-1 '> Edit</a>
         <a class='btn btn-info rounded-pill m-1' onclick='deleteMovie("${_id}")'> Delete </a>
       </div>
     </div></div>`;
  });
};
