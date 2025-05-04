pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = dockerhub9944 // Update this with your Jenkins credential ID
        DOCKERHUB_USERNAME = sathiya9944
        IMAGE_NAME = grocerystore3
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/sathiya9944/Grocerystore.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        echo "Logged in to DockerHub"
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}
