import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Chama a função do modelo para buscar todos os posts
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200(OK) e os posts no formato JSON
    res.status(200).json(posts);
    
};

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
	const novoPost = req.body;
	try {
        // Chama a função do modelo para criar o novo post
		const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
        res.status(200).json(postCriado);
	} catch(erro) {
        // Imprime o erro no console e envia uma resposta HTTP com status 500 (Erro interno do servidor)
        console.error(erro.message);
        console.status(500).json({"Erro":"Falha na requisição"});
    }
};

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    // Cria um objeto com os dados do novo post, incluindo o nome da imagem
	const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

	try {
        // Chama a função do modelo para criar o novo post
		const postCriado = await criarPost(novoPost);
        // Atualiza o nome da imagem com o ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        // Renomeia o arquivo da imagem para o novo nome
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
        res.status(200).json(postCriado);
	} catch(erro) {
        // Imprime o erro no console e envia uma resposta HTTP com status 500 (Erro interno do servidor)
        console.error(erro.message);
        console.status(500).json({"Erro":"Falha na requisição"});
    }
};

// Função assíncrona para atualizar um novo post
export async function atualizarNovoPost(req, res) {
    // Obtém os dados do novo post do corpo da requisição
	const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    

	try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        // Chama a função do modelo para criar o novo post
		const postCriado = await atualizarPost(id, post);
        // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
        res.status(200).json(postCriado);
	} catch(erro) {
        // Imprime o erro no console e envia uma resposta HTTP com status 500 (Erro interno do servidor)
        console.error(erro.message);
        console.status(500).json({"Erro":"Falha na requisição"});
    }
};