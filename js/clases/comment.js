// Definición de la clase Comentario
class Comment {
	constructor( usuario,texto, fecha) {
		this.usuario = usuario;
		this.texto = texto;
		this.fecha = fecha;
		this.id = `${usuario + fecha}`
	}

	agregar() {
		// Agregar comentario a la lista de comentarios en la página    
		let commentList = document.getElementById("comments");
		let commentDiv = document.createElement("div");
		let id= this.id;
		commentDiv.setAttribute("id", id);
		commentDiv.setAttribute("class","card-comment");	
		commentDiv.innerHTML = `
			<div class="card-comment__comment">
				<h3 class="user">${this.usuario}:</h3>
				<textarea class="textarea" id="comment-textarea">${this.texto}</textarea><br>        
			</div>
			<div class="card-comment__btns">
				<p class="date">${this.fecha}</p>
				<button class="update-comment oppose" id="edit" disabled >
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
				</button>
				<button class="delete-comment">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
				</button>        	
			</div>
		`;

		let updateBtn = commentDiv.querySelector(".update-comment");
		let deleteBtn = commentDiv.querySelector(".delete-comment");
		let textComment = commentDiv.querySelector(".textarea");
	

		updateBtn.addEventListener("click", () => {
			this.editar(id)
			updateBtn.disabled = true; 
			updateBtn.classList.add("oppose");			
			deleteBtn.disabled = false;
			deleteBtn.classList.remove("oppose");
		}) 		

		deleteBtn.addEventListener("click", () => this.eliminar(id));

		textComment.addEventListener("click", () => {
			updateBtn.disabled = false;
			updateBtn.classList.remove("oppose");
			deleteBtn.disabled = true;
			deleteBtn.classList.add("oppose");

			textComment.readOnly = false; // Deshabilitar el modo de solo lectura
			textComment.style.backgroundColor = "white"; // Cambiar el fondo a blanco
			textComment.focus(); // Establecer el foco en el textarea
		})


		commentList.appendChild(commentDiv);
	}
	editar(id) {
		
		let textComment = document.getElementById(id).querySelector(".textarea");
		textComment.readOnly = true; // Habilitar el modo de solo lectura
		textComment.style.backgroundColor = "transparent"; // Restablecer el fondo transparente
		textComment.blur(); // Quitar el foco del textarea
		document.getElementById(id).querySelector(".date").textContent = obtenerDate()+ " *";

	}

	eliminar(id) {
		// Eliminar el comentario de la lista de comentarios en la página
		let commentList = document.getElementById("comments");
		let commentDiv = document.getElementById(id)
		commentList.removeChild(commentDiv);
	}
}


let obtenerDate = (	)=>{
	
	const now = new Date();
	// Obtiene los valores de la fecha y hora actual
	const year = now.getFullYear();
	const month = now.getMonth() + 1; // Suma 1 porque los meses empiezan en 0
	const day = now.getDate();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	// Crea una cadena con la fecha y hora actual en un formato legible
	const date = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
	return date;
}

// Manejo del formulario de comentarios
let commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", (event) => {
	event.preventDefault();
	let userInput = document.getElementById("user-input").value;
	let commentInput = document.getElementById("comment-input").value;
	let now = obtenerDate();
	let comment = new Comment(userInput,commentInput, now);
	comment.agregar();

	commentForm.reset(); 
});
