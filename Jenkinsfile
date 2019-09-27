pipeline {
  // Execute the pipeline on the master, stages will still be executed on the agents
  agent none

  options {
    disableConcurrentBuilds() // The pipeline should run only once at a time
    preserveStashes(buildCount: 5)
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

      agent { node { label 'deploy-as24dev' } }

      steps {
        unstash 'output-dev-dist'
        sh './deploy/deploy.sh'
        slackSend channel: 'as24_acq_cxp_fizz', color: '#FFFF00', message: ":question: Showcar-UI branch ${env.BRANCH_NAME} is deployed, check it with toggle `?toguru=sc_develop%3d${env.BRANCH_NAME}`"
        input message: "Approve build to be propagated to production?"
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

      agent { node { label 'deploy-as24dev' } }
      steps {
        unstash 'output-prod-dist'
        sh './deploy/deploy.sh'
      }
    }
  }

  post {
    failure {
      slackSend channel: 'as24_acq_cxp_fizz', color: '#FF0000', message: ":bomb: ${env.JOB_NAME} [${env.BUILD_NUMBER}] failed. (<${env.BUILD_URL}|Open>)"
    }
    aborted {
      slackSend channel: 'as24_acq_cxp_fizz', color: '#FFFF00', message: ":-1: ${env.JOB_NAME} [${env.BUILD_NUMBER}] aborted. (<${env.BUILD_URL}|Open>)"
    }
    success {
      slackSend channel: 'as24_acq_cxp_fizz', color: '#00FF00', message: ":+1: ${env.JOB_NAME} [${env.BUILD_NUMBER}] ShowCar UI was released. For the details go to: <https://github.com/Scout24/showcar-ui|showcar-ui>. (<${env.BUILD_URL}|Open>)"
    }
  }
}
