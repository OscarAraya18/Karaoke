pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Deploy'){
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'Solution', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''cd Karaoke
                git pull https://github.com/OscarAraya18/Karaoke
                cd Frontend
                ng serve --host 0.0.0.0 --port 3000''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
