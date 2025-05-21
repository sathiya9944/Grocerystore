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
                    docker.build('grocery-static-site')
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    docker.image('grocery-static-site').run('-d -p 8081:80')
                }
            }
        }
    }
}
