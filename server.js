import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Array de posts de exemplo, utilizado para demonstração.
// Em um cenário real, esses dados seriam obtidos do banco de dados.
/* const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 2,
        descricao: "Paisagem deslumbrante!",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 3,
        descricao: "Cachorro fofo fazendo careta",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 4,
        descricao: "Meu novo projeto de artesanato",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 5,
        descricao: "Comida deliciosa e colorida",
        imagem: "https://placecats.com/millie/300/150",
    },
    {
        id: 6,
        descricao: "Viagem incrível para a praia",
        imagem: "https://placecats.com/millie/300/150",
    }
]; */

// Cria uma instância do Express, que será o nosso servidor web.
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});


// Antes da nova rota vamos criar uma função "buscaPostPorID" que vai buscar o post por ID, ela vai usar a função "findIndex" para procurar dentro do posts, usando "=>" cria uma função interna onde o "Number(id)" será o id do post. Number transforma a string em inteiro
/* function buscaPostPorID(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id)
    });
}; */

// Agora vamos criar uma nova rota para buscar o objeto json pelo ID. O ":id" na URL será uma variável. Chamar a função buscaPostPorID a requisição recebe o parametro id. A reposta retorna o objeto json com o id [index] variável.
/* app.get("/posts/:id", (req, res) => {
    const index = buscaPostPorID(req.params.id)
    res.status(200).json(posts[index]);
}); */

// Agora usar URL para testar, lembrar de derrubar o servidor se ele estiver ativo e executar novamente. URL localhost:3000/posts/posts