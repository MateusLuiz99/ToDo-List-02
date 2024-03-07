// O event listener aguarda o DOM estar pronto para executar a função.
document.addEventListener("DOMContentLoaded", function () {
    // Referências aos elementos no DOM que serão utilizadas.
    const form = document.getElementById("form-to-do");
    const input = document.getElementById("input-to-do");
    const toDoList = document.querySelector(".conteiner-to-do-list");
    const trashAllBtn = document.querySelector(".btn-trash-all");

    // Event listeners

    // Event listenar para o evento de submit do formulário.
    form.addEventListener("submit", function (event) {
        // Impede o recarregamento da página ao adicionar uma tarefa.
        event.preventDefault();
        addTodo();
    });

    // Event listener de click do formulário.
    toDoList.addEventListener("click", function (event) {
        // Captura no evento de cliques na lista.
        const target = event.target;
        console.log("Clique detectado em:", target);

        // Event listener para cliques na lista de tarefas, dependendo do  elemento 
        // clicado será executado uma das 2 tarefas.
        if (target.type === "checkbox" && target.classList.contains("check-list")) {
            markTodoAsDone(target);
        } else if (target.classList.contains("btn-delete")) {
            deleteTodoItem(target);
        }
    });

    // Event listener de click do formulário para deletar todas as tarefas.
    trashAllBtn.addEventListener("click", function(){
        deleteAllTodos();
    });

    // Functions

    // Essa função é responsável para deletar todas as tarefas adicionadas.
    function deleteAllTodos(){
        // Seleciona o DOM de todos os li de classe 'list'.
        const todos = document.querySelectorAll(".list");
        // 'todos.forEach' faz a interação com todos os elementos para cada 
        // elemento representado pela variável 'todos', a função é executada.
        todos.forEach(function (todo) {
            // Remove cada elemento da lista.
            todo.remove();
        });
    }

    // Essa função é responsável para adicionar uma tarefa.
    function addTodo() {
        // Essa variável recebe o valor digitado pelo usuário e com a função 
        // 'trim()' remove a espaços a mais, no começo e no fim.
        const todoText = input.value.trim();

        // Se essa variável não for vazia, a função createTodoItem é chamada 
        // com o texto da tarefa como argumento. Essa função cria um novo 
        // elemento de lista (li) com a estrutura necessária para representar 
        // uma tarefa na sua lista To-Do.
        if (todoText !== "") {
            const todoItem = createTodoItem(todoText);
            // Adiciona o elemento de lista recém-criado (todoItem) à lista 
            // To-Do (toDoList), colocando-o como um novo item da lista.
            toDoList.appendChild(todoItem);
            // Limpa o valor do elemento de entrada 'input'.
            input.value = "";
        } else {
            alert("Digite uma tarefa!");
        }
        // Se não, se o campo de entrada estiver vazio, um alert será acionado.
    }

    // Essa função cria um novo item na lista contendo a tarefa.
    function createTodoItem(text) {
        // Cria um novo elemento e adiciona uma classe.
        const ulitem = document.createElement("ul");
        ulitem.classList.add("list");

        // Adiciona um valor no novo elemento, em string, no DOM, as tags 
        // com seus atributos e o campo de texto que foi digitado que forma 
        // toda a estrutura da tarefa.
        ulitem.innerHTML = `        
            <li class="conteiner-to-do">
                <div class="div-to-do">
                    <input type="checkbox" name="check-list" class="check-list">
                    <span class="text-to-do">${text}</span>
                    <div class="conteiner-btn">
                        <button class="btn-delete" title="Deletar a tarefa">
                            <ion-icon class="btn-delete" name="trash-sharp"></ion-icon>
                        </button>
                    </div>
                </div>
            </li>
        `;
        return ulitem;
    }

    // Essa função marca uma tarefa como concluída.
    function markTodoAsDone(button) {
        console.log("Função markTodoAsDone chamada!");

        // Encontra o elemento pai mais próximo, do button, que possui uma classe 'list'.
        // Isso é usado para encontrar o elemento 'li', que contém a tarefa relacionada. 
        const ulitem = button.closest(".list");
        // Procura dentro do 'li' encontrado no 'ulitem', pelo elemento '.text-to-do', 
        // para achar a tag 'span' que contém o texto.
        const textSpan = ulitem.querySelector(".text-to-do");

        // Se for encontrado.    
        if (textSpan) {
            console.log("Elemento textSpan encontrado!");
    
            // Usa o método 'toggle' para alternar as classes, adicionar ou remover.
            textSpan.classList.toggle("line-through");
            console.log("Classe line-through adicionada/removida!");
        } else {
            console.log("Elemento textSpan não encontrado!");
        }
    }

    // Essa função deleta um item da lista.  
    function deleteTodoItem(button) {
        // Encontra o elemento pai mais próximo, do button, que possui uma classe 'list'.
        const ulitem = button.closest(".list");
        // Remove o elemento 'li' com todos os seus filhos.
        ulitem.remove();
    }
});
