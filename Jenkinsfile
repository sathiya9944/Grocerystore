pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/sathiya9944/Grocerystore.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('grocery')
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image('grocery').run('-d -p 8081:80')
                }
            }
        }
    }
}
