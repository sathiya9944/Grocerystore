pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/sathiya9944/Grocerystore.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('grocery-store-app')
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image('grocery-store-app').run('-d -p 8081:80')
                }
            }
        }
    }
}
