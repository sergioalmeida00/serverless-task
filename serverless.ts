import type { AWS } from '@serverless/typescript';

// import hello from '@functions/hello';
import getTasks from '@functions/getTasks';
import createTask from './src/modules/tasks/useCases/createTask';

const serverlessConfiguration: AWS = {
  service: 'serverlesstask',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region:'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements:[
      {
        Effect:"Allow",
        Action:['dynamodb:*'],
        Resource:['*']
      }
    ]
  },
  // import the function via paths
  functions: { createTask,getTasks },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      external: [
        'chrome-aws-lambda'
      ]
    },
    dynamodb:{
      stages:['dev','local'],
      start:{
        port:8000,
        inMemory:true,
        migrate:true
      }
    },
  },
  resources:{
    Resources:{
      dbTask:{
        Type: "AWS::DynamoDB::Table",
        Properties:{
          TableName:"task",
          AttributeDefinitions:[
            {
              AttributeName:"id",
              AttributeType:"S"
            },
            {
              AttributeName:"user_id",
              AttributeType:"S"
            }
          ],
          KeySchema:[
            {
              AttributeName:"id",
              KeyType:"HASH"
            }
          ],
          GlobalSecondaryIndexes:[
            {
              IndexName:'user_id_index',
              Projection: {
                ProjectionType: "ALL"
              },
              ProvisionedThroughput:{
                ReadCapacityUnits:5,
                WriteCapacityUnits:5
              },
              KeySchema:[
                {
                  AttributeName: 'user_id',
                  KeyType: 'HASH',
                } 
              ]
            },            
          ],
          ProvisionedThroughput:{
            ReadCapacityUnits:5,
            WriteCapacityUnits:5
          },
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
