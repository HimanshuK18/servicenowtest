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
}