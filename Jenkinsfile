pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="350687266438"
        AWS_DEFAULT_REGION="ap-northeast-1"
        IMAGE_REPO_NAME="testing"
        IMAGE_TAG="v1"
        REPOSITORY_URI = "public.ecr.aws/q9j0m8g2/testing"
    }
    stage('Build Infrastructure') {
            steps {
                sh 'npm install aws-sdk'
                sh 'node AWSCode/deployEC2.js'
            }
        }
    stages {
        
         stage('Logging into AWS ECR') {
            steps {
                script {
                sh """aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"""
                }
                 
            }
        }
        
        stage('Cloning Git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/HimanshuK18/servicenowtest.git']]])     
            }
        }
        // Run unit test cases
        stage('Test'){
         env.NODE_ENV = "test"
         print "Environment will be : ${env.NODE_ENV}"
         sh 'node -v'
         sh 'npm prune'
         sh 'npm install'
         sh 'npm build'
         sh 'npm test'
       }
  
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{  
         script {
                sh """docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"""
                sh """docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"""
         }
        }
      }
    // it reads from deployment.yml and do the deployment 
      stage('Deploy To EKS'){
            steps {
                 sh 'kubectl apply -f deployment.yml'
            }
        }
    }
    stage('Test Postman') {
      steps {
        script {
          // Add code to authenticate with Postman API
          // Use environment variables to set Postman API credentials
          // See Postman API documentation for more details
          
          // Set Postman collection and environment IDs
          def collectionId = '<collection_uid>'
          def environmentId = '<environment_uid>'
          
          // Call Postman API to trigger the test run
          def response = sh(
            script: "curl -s -X POST -H 'X-Api-Key: ${POSTMAN_API_KEY}' -H 'Content-Type: application/json' -d '{\"collection\":\"${collectionId}\",\"environment\":\"${environmentId}\"}' 'https://api.getpostman.com/runs'",
            returnStdout: true
          )
          
          // Print the response from the Postman API
          echo response
          
          // Parse the response to get the test run ID
          def testRunId = sh(
            script: "echo '${response}' | jq -r '.run.id'",
            returnStdout: true
          ).trim()
          
          // Wait for the test run to complete
          def status = ''
          while (status != 'completed') {
            def result = sh(
              script: "curl -s -X GET -H 'X-Api-Key: ${POSTMAN_API_KEY}' 'https://api.getpostman.com/runs/${testRunId}'",
              returnStdout: true
            )
            status = sh(
              script: "echo '${result}' | jq -r '.run.executions[0].status'",
              returnStdout: true
            ).trim()
            sleep 10
          }
          
          // Print the final test run status
          echo "Test run completed with status: ${status}"
          
          // Fail the build if any test case fails
          if (status != 'completed') {
            error "Test run failed with status: ${status}"
          }
        }
      }
    }
}
