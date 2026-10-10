var aws = require('aws-sdk');

var queueUrl = 'http://0.0.0.0:4566/000000000000/sqs-queue.fifo';
var region = 'us-east-1';
var duplicationId = 'duplication-id';
var groupId = 'group-id';

var sqs = new aws.SQS({region: region});

exports.handler = function(event, context) {
  var params = {
    MessageBody: event,
    QueueUrl: queueUrl,
    MessageGroupId: groupId,
    MessageDeduplicationId: duplicationId,
    DelaySeconds: 0
  };

  sqs.sendMessage(params, function(err, data) {

    if (err) {
      console.log('Error', err);
    }

    console.log('Success', data);
  });
}
