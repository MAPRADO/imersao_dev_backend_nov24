import { MongoClient } from 'mongodb';

// Código padrão para conexão com o MongoDB, é praticamente o mesmo sempre que for fazer a conexão

export default async function conectarAoBanco(stringConexao) {
    // Declara uma variável para armazenar a instância do cliente MongoDB
    let mongoClient;

    try {
        // Cria uma nova instância do cliente MongoDB, passando a string de conexão
        mongoClient = new MongoClient(stringConexao);
        // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida
        console.log('Conectando ao cluster do banco de dados...');
        // Tenta estabelecer a conexão com o banco de dados
        await mongoClient.connect();
        // Imprime uma mensagem de sucesso caso a conexão seja estabelecida
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código
        return mongoClient;
    } catch (erro) {
        // Captura qualquer erro que possa ocorrer durante o processo de conexão
        console.error('Falha na conexão com o banco!', erro);
        // Encerra a execução do processo em caso de erro
        process.exit();
    }
};