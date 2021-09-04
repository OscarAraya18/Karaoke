pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Git repo'){
            steps{
                git branch: 'main', url: 'https://github.com/OscarAraya18/Karaoke/'
            }
        }
        stage('SonarCloud Analysis'){
            steps {
                withSonarQubeEnv('sonar'){
                sh "/var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonar-qube2/bin/sonar-scanner \
                -D sonar.organization=oscararaya18 \
                -D sonar.projectKey=OscarAraya18_Karaoke \
                -D sonar.sources=. \
                -D sonar.host.url=https://sonarcloud.io/"
                }
            }
        }
    }
}
