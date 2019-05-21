pipeline {
  agent {
    docker {
      image 'node'
      args '''
'''
    }

  }
  stages {
    stage('git pull') {
      steps {
        git branch: 'master',
        credentialsId: 'b2ec09ae-ca45-4884-8b8b-bd65d3e43475',
        url: 'https://github.com/xkelvinx666/mda-backend-render'
        dir(path: './template') {
          git (
            branch: 'master',
            credentialsId: 'b2ec09ae-ca45-4884-8b8b-bd65d3e43475',
            url: 'https://github.com/xkelvinx666/mda-template'
          )
          sh """
              ls | grep -v frontend | xargs rm -rf
          """
        }
      }
    }
    stage('build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('compile') {
      steps {
        sh 'npm run template art ./template/frontend 1'
      }
    }
    stage('before-publish') {
       steps {
        sh 'tar -czvf frontend.tar ./template/frontend'
      }
    }
    stage('publish') {
      steps {
        sshPublisher(
        publishers:
          [sshPublisherDesc(
            configName: 'tencent_cloud',
            transfers: [
              sshTransfer(
                cleanRemote: false,
                excludes: '',
                execCommand: 'tar -xzvf frontend.tar',
                execTimeout: 120000,
                flatten: false,
                makeEmptyDirs: false,
                noDefaultExcludes: false,
                patternSeparator: '[, ]+',
                remoteDirectory: '/root/template',
                remoteDirectorySDF: false,
                removePrefix: '',
                sourceFiles: 'frontend.tar'
              )],
              usePromotionTimestamp: false,
              useWorkspaceInPromotion: false,
              verbose: false
           )])
      }
    }
  }
}
