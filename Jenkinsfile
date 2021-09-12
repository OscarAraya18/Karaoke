pipeline {
    agent any

    stages {
        stage('Git repo'){
            steps{
                git branch: 'main', url: 'https://github.com/OscarAraya18/Karaoke.git'
            }
        }
        stage('Unit testing'){
            steps {
                sh '''cd /home/ubuntu/Karaoke/Backend
                npm i
                npm run test'''
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
        stage('Deploy'){
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'Solution', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd Karaoke
                git pull https://github.com/OscarAraya18/Karaoke
                cd Backend
                npm i
                cd ..
                cd Frontend
                npm i
                pm2 restart all
                cd''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
