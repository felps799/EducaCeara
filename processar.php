<?php
// Configurações do banco de dados
$host = "sql313.infinityfree.com"; // Host do MySQL
$user = "if0_41772601"; // Usuário do banco de dados
$password = "Cavalcante77"; // Senha do banco de dados
$dbname = "if0_41772601_faleconosco"; // Nome do banco de dados

// Conexão com o banco de dados
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
die("Falha na conexão: " . $conn->connect_error);
}

// Obter os dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$duvida = $_POST['duvida'];

// Preparar a query de inserção
$sql = "INSERT INTO faleconosco (nome, email, telefone, duvida) VALUES (?,?,?,?)";

// Preparar e executar a query
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $email,$telefone, $duvida);
if ($stmt->execute()) {
echo "Mensagem enviada com sucesso!";
} else {
echo "Erro: " . $stmt->error;
}

// Fechar a conexão
$stmt->close();
$conn->close();
?>