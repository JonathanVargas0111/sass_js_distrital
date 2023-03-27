// Definición de la clase Comentario
class Comment {
    constructor(texto, usuario, fecha) {
        this.texto = texto;
        this.usuario = usuario;
        this.fecha = fecha;
        this.id = `${usuario + fecha}`
    }

    agregar() {
        // Agregar comentario a la lista de comentarios en la página    
        let commentList = document.getElementById("comments");
        let commentDiv = document.createElement("div");
        let id = this.usuario + this.fecha
        commentDiv.setAttribute("id", id);
        commentDiv.innerHTML = `
            <h3>${this.usuario}</h3>
            <p>${this.fecha}</p>
            <textarea class="form__textarea" id="comment-input">${this.texto}</textarea><br>        
            <button class="update-comment" id="edit" disabled >Guardar</button>
            <button class="delete-comment">Eliminar</button>        
          `;

        let updateBtn = commentDiv.querySelector(".update-comment");
        updateBtn.addEventListener("click", () => {
            this.editar(id)
            deleteBtn.disabled = false;
            updateBtn.disabled = true;
        })

        let deleteBtn = commentDiv.querySelector(".delete-comment");
        deleteBtn.addEventListener("click", () => this.eliminar(id));

        let textComment = commentDiv.querySelector(".form__textarea");
        textComment.addEventListener("click", () => {
            updateBtn.disabled = false;
            deleteBtn.disabled = true;
        })


        commentList.appendChild(commentDiv);
    }
    editar(id) {
        // Editar el texto del comentario
        this.texto = document.getElementById("comment-input").value;
        let comment = document.getElementById(id).childNodes[5];
        comment.value = this.texto;
    }

    eliminar(id) {
        // Eliminar el comentario de la lista de comentarios en la página
        let commentList = document.getElementById("comments");
        let commentDiv = document.getElementById(id)
        commentList.removeChild(commentDiv);
    }
}


// Manejo del formulario de comentarios
let commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let userInput = document.getElementById("user-input").value;
    let commentInput = document.getElementById("comment-input").value;
    let now = new Date();
    let comment = new Comment(userInput, now, commentInput)
    comment.agregar();
    commentForm.reset();
});
