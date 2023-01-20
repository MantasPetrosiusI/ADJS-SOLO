const url = "https://striveschool-api.herokuapp.com/api/movies/";
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.      eyJfaWQiOiI2M2NhNzJhZTE3ZWE3ODAwMTUyZWJlYzYiLCJpYXQiOjE2NzQyMTIwMTUsImV4cCI6MTY3NTQyMTYxNX0.LERePH0JOsaosvGJRMd7NCvZx1LgcX-Cl0Jq9PSr5DE",
  "Content-Type": "application/json",
});
const par = new URLSearchParams(location.search);
const id = par.get("id");

window.onload = async () => {
  try {
    let response = await fetch(`${url}/${id}`, {
      headers,
    });

    if (response.ok) {
      let { name, description, category, imageUrl } = await response.json();
      console.log("Successful");
      document.querySelector("#movie-name").value = name;
      document.querySelector("#description").value = description;
      document.querySelector("#category").value = category;
      document.querySelector("#image-url").value = imageUrl;
    } else {
      console.error(response);
    }
    showMovie();
  } catch (error) {
    console.error(error);
  }
};

const addMovie = async (addMovie) => {
  try {
    addMovie.preventDefault();
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

const showMovie = async () => {
  try {
    const response = await fetch(url, { headers });
    const moviesData = await response.json();
    renderMovies(moviesData);
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

    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(edit),
      headers,
    });

    if (response.ok) {
      console.log("Success");
    } else {
      console.error("Error");
    }
  } catch (error) {
    console.error(error);
  }
};
const newMovieRow = document.querySelector("#new-movie");
const renderMovies = (movieArray) => {
  movieArray.innerHTML = "";
  const allNewMovies = movieArray
    // name, description, brand, imageUrl, price
    .map(({ imageUrl }) => {
      return `
                 <div class="col-md-2">
                    <img class="movie-cover" src="${imageUrl}"/>
                  </div>`;
    })
    .join("");
  newMovieRow.innerHTML = allNewMovies;
};
