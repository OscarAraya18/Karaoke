pipeline {
    agent any

    stages {
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
        stage('Deploy'){
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'Solution', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd Karaoke
                git pull https://github.com/OscarAraya18/Karaoke
                cd Backend
                npm start &
                ^C
                cd ..
                cd Frontend
                ng serve --host 0.0.0.0 --port 3000
                ^C''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
