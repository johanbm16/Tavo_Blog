//Funcion para ejecutar alg
document.addEventListener('DOMContentLoaded', function() {
    getAllData();
  
  });

document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("post-title").value;
    const content = document.getElementById("post-content").value;
    save(title,content);
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = `
        <h2>${title}</h2>
        <p class="author">Autor: Tu Nombre</p>
        <p>${content}</p>
    `;

    const postsContainer = document.querySelector(".container");
    postsContainer.insertBefore(postDiv, postsContainer.childNodes[4]);
});

function save(titleString,contentString){
    const dataToSend = {title: titleString, mensaje: contentString,Action:"1"};
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log('Respuesta del servidor:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}

function getAllData(){
    fetch('http://localhost:3000', {
        method: 'GET',
      }).then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      console.log('response:', response);
      return response.text();
    }).then((data) => {
      // Procesar los datos recibidos aquí
      const ActualBlogData = JSON.parse(data);
      AddNewComment(ActualBlogData)
      console.log('Datos recibidos:', data);
    })
    .catch((error) => {
      // Manejar errores aquí
      console.log("Manejar errores aquí" + error);
      console.error('Error:', error);
      
    });
    console.log("fin del request");
}

function AddNewComment(ActualBlogData){
        for (let key in ActualBlogData) {
            if (ActualBlogData.hasOwnProperty(key)) {
            const value = ActualBlogData[key];
            console.log(value.comment);
            console.log(value.autor); 
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerHTML = `
                <h2>${value.id}</h2>
                <p class="author">Autor: ${value.autor}</p>
                <p>${value.comment}</p>
            `;

            const postsContainer = document.querySelector(".container");
            postsContainer.insertBefore(postDiv, postsContainer.childNodes[4]);
        }
    }
}