# SNS Lambda SQS

Projeto de exemplo para demonstrar a integração entre AWS SNS, AWS Lambda e Amazon SQS usando LocalStack e Serverless Framework.

## Visão geral

Este projeto cria um tópico SNS chamado `sns-topic` e uma fila SQS FIFO chamada `sqs-queue.fifo`. A função Lambda recebe eventos do tópico SNS e envia a mensagem para a fila SQS.

A implementação principal está em `index.js` e a infraestrutura em `serverless.yml`.

## Arquitetura

- `SNS` publica eventos para o tópico `sns-topic`
- `Lambda` é acionado quando o tópico recebe uma mensagem
- `Lambda` envia a mensagem para a fila `sqs-queue.fifo`
- `LocalStack` simula os serviços da AWS localmente

## Pré-requisitos

- Docker
- Docker Compose
- Node.js 16+
- Serverless Framework

## Estrutura do projeto

```text
.
├── docker-compose.yml
├── dockerfile
├── index.js
├── package.json
├── script.sh
├── serverless.yml
└── README.md
```

## Como executar localmente

1. Inicie os containers do LocalStack e do ambiente Lambda:

```bash
docker compose up -d
```

2. Instale as dependências do projeto dentro do container do Lambda:

```bash
docker compose exec lambda sh -c "npm install"
```

3. Faça o deploy da infraestrutura local:

```bash
docker compose exec lambda sh -c "serverless deploy --stage local"
```

4. Crie os recursos no LocalStack, caso queira configurar manualmente também:

```bash
docker compose exec lambda sh -c "./script.sh"
```

## Testando a integração

Você pode publicar uma mensagem no tópico SNS usando o AWS CLI local:

```bash
docker compose exec lambda sh -c "awslocal sns publish --topic-arn arn:aws:sns:us-east-1:000000000000:sns-topic --message '{\"message\":\"hello from sns\"}' --endpoint-url=http://localstack:4566"
```

Em seguida, verifique a fila SQS:

```bash
docker compose exec lambda sh -c "awslocal sqs receive-message --queue-url http://localhost:4566/000000000000/sqs-queue.fifo --endpoint-url=http://localstack:4566"
```

## Observações

- O queue da SQS é do tipo FIFO e exige `MessageGroupId` e `MessageDeduplicationId`.
- O projeto foi configurado para usar a região `us-east-1` e o endpoint do LocalStack em `http://localstack:4566`.
- Os logs da Lambda podem ser verificados com `docker logs lambda` ou pelo console do LocalStack.

## Comandos úteis

```bash
# Ver containers ativos
docker compose ps

# Ver logs do LocalStack
docker logs -f localstack

# Ver logs da Lambda
docker logs -f lambda

# Parar os containers
docker compose down
```

## Tecnologias utilizadas

- Node.js
- AWS Lambda
- SNS
- SQS FIFO
- LocalStack
- Serverless Framework
