pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '''
'''
    }
  }
  stages {
    stage('git pull') {
      steps {
        dir(path: './render') {
          git branch: 'master',
          url: 'https://github.com/xkelvinx666/mda-backend-render'
        }
        dir(path: './template') {
          git branch: 'master',
          url: 'https://github.com/xkelvinx666/mda-template-frontend'
        }
      }
    }
    stage('build') {
      steps {
        sh 'cd ./render && npm install && npm run build'
      }
    }
    stage('compile') {
      steps {
        sh 'npm run template art ../template 1'
      }
    }
    stage('before-publish') {
       steps {
        sh 'tar -czvf frontend.tar ./template/*'
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
