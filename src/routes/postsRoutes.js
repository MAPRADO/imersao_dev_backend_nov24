import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOption = {
	origin: "http://localhost:8000",
	optionsSuccessStatus: 200
};

// Configura o armazenamento das imagens em disco
const storage = multer.diskStorage({
    // Define o diretório de destino para as imagens
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo, mantendo o nome original
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Habilita o middleware JSON para que o servidor possa entender requisições com corpo JSON.
    app.use(express.json());
    app.use(cors(corsOption));
    // Rota para listar todos os posts (GET /posts)
    app.get("/posts", listarPosts);
    // Rota para criar um novo post (POST /posts)
    app.post("/posts", postarNovoPost);
    // Rota para upload de uma única imagem (POST /upload)
    app.post("/upload", upload.single("imagem"), uploadImagem);
    // Rota para atualização no banco de dados (PUT /upload)
    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;