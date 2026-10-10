awslocal sns create-topic --name sns-topic --endpoint-url=http://localstack:4566
awslocal sqs create-queue --queue-name sqs-queue.fifo --attributes FifoQueue=true --endpoint-url=http://localstack:4566
