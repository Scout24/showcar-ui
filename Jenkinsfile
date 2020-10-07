pipeline {
  // Execute the pipeline on the master, stages will still be executed on the agents
  agent none

  options {
    disableConcurrentBuilds() // The pipeline should run only once at a time
    preserveStashes(buildCount: 5)
    buildDiscarder(logRotator(daysToKeepStr: '90'))
  }

  // Environment variables for all stages
  environment {
    AWS_DEFAULT_REGION="eu-west-1"
    SERVICE_NAME="showcar-ui"
    COMMIT_HASH=getInvokedBuildNumber()
  }

  stages {
    // TODO - replace Travis
    stage('BuildBranch') {
      when {
        beforeAgent true
        not {
          anyOf {
            branch 'release'
            branch 'master'
          }
        }
      }

      environment {
        BRANCH="${env.BRANCH_NAME}"
      }

      agent { node { label 'build-node' } }

      steps {
        sh './deploy/prepare.sh'
        stash includes: 'dist/*', name: 'output-dev-dist'
      }
    }

    stage('DeployBranch') {
      when {
        beforeAgent true
        not {
          anyOf {
            branch 'release'
            branch 'master'
          }
        }
      }

      environment {
        BRANCH="${env.BRANCH_NAME}"
      }

      agent { node { label 'deploy-as24assets' } }

      steps {
        unstash 'output-dev-dist'
        sh './deploy/deploy.sh'
        slackSend channel: 'ug-activation-alerts', color: '#00FF00', message: "Showcar-UI :branch: ${env.BRANCH_NAME} is deployed, check it with toggle `?sc_branch=${env.BRANCH_NAME}`"
      }
    }

//  TODO - replace BrowserStack / Rakefile
//  stage('IntegrationTests') {
//  }

    stage('BuildProd') {
      when {
        beforeAgent true
        branch 'release'
      }

      environment {
        BRANCH='master'
      }

      agent { node { label 'build-node' } }

      steps {
        sh './deploy/prepare.sh'
        stash includes: 'dist/*', name: 'output-prod-dist'
      }
    }

    stage('DeployProd') {
      when {
        beforeAgent true
        branch 'release'
      }

      environment {
         BRANCH='master'
      }

      agent { node { label 'deploy-as24assets' } }
      steps {
        unstash 'output-prod-dist'
        sh './deploy/deploy.sh'
        slackSend channel: 'ug-activation-alerts', color: '#00FF00', message: ":+1: ${env.JOB_NAME} [${env.BUILD_NUMBER}] was released. For the details go to: <https://github.com/AutoScout24/showcar-ui|showcar-ui>. (<${env.BUILD_URL}|Open>)"
      }
    }
  }

  post {
    failure {
      slackSend channel: 'ug-activation-alerts', color: '#FF0000', message: ":bomb: ${env.JOB_NAME} [${env.BUILD_NUMBER}] failed. (<${env.BUILD_URL}|Open>)"
    }
    aborted {
      slackSend channel: 'ug-activation-alerts', color: '#FFFF00', message: ":-1: ${env.JOB_NAME} [${env.BUILD_NUMBER}] aborted. (<${env.BUILD_URL}|Open>)"
    }
  }
}
