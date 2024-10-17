pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build docker image') {
            steps {
                script {
                    bat 'docker build -t r9956/mueblesstgo-frontend:latest .'
                }
            }
        }

        stage('Push image to Docker Hub') {
            steps {
                script{
                    withCredentials([string(credentialsId: 'dhpswid', variable: 'dhpsw')]) {
                        bat 'docker login -u r9956 -p %dhpsw%'
                    }
                    bat 'docker push r9956/mueblesstgo-frontend:latest'
                }
            }
        }
    }
}