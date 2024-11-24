import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão obtida da variável de ambiente STRING_CONEXAO.
// O resultado da conexão é armazenado na variável 'conexao'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados 'imersao_alura' da conexão estabelecida
    const db = conexao.db("imersao_alura");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Executa uma consulta para encontrar todos os documentos na coleção 'posts' e retorna os resultados como um array
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {
    // Obtém o banco de dados 'imersao_alura' da conexão estabelecida
    const db = conexao.db("imersao_alura");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Insere um novo documento (post) na coleção 'posts' e retorna um objeto com informações sobre a operação de inserção
    return colecao.insertOne(novoPost);
};

export async function atualizarPost(id, novoPost) {
    // Obtém o banco de dados 'imersao_alura' da conexão estabelecida
    const db = conexao.db("imersao_alura");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Insere um novo documento (post) na coleção 'posts' e retorna um objeto com informações sobre a operação de inserção
    const objId = ObjectId.createFromHexString(id);

    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
};