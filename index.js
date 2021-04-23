const fs = require('fs')
const execSync = require('child_process').execSync
const path = require('path')

const repoAccount = ""
const repoName = ""
const projectPath = ""
const pullInterval = 30 //In seconds
const githubUsername = ""
const githubPassword = ""
const githubOAuth = "" //Don't fill if you're using github credentials

let repoAuthUrl = "" //Don't fill

async function main() {
    log("Project Updater Started :D")

    if(githubUsername === "" && githubPassword === "" && githubOAuth == "") {
        log("Please fill authentication informations !")
        return
    }

    let authUrlBase = githubOAuth
    if(authUrlBase === "") authUrlBase = githubUsername + ':' + githubPassword

    repoAuthUrl = 'https://' + authUrlBase + '@github.com/' + repoAccount + '/' + repoName + '.git'

    if (!fs.existsSync(projectPath)) {
        log("Folder doesn't exists, creating one...");
        fs.mkdirSync(projectPath, { recursive: true })
    }

    if (!fs.existsSync(path.join(projectPath, '.git'))) {
        if (!isDirEmpty(projectPath)) {
            log("The directory at " + projectPath + " need to be empty to clone the project !")
            return
        }

        log("Project not cloned, cloning it. Please wait...")

        execSync('git clone ' + repoAuthUrl + ' .', {
            cwd: projectPath
        })
    }

    pull()
    setInterval(function () {
        pull()
    }, (pullInterval*1000));
}

function pull() {
    log('Pulling new data if needed...');

    execSync('git reset --hard', {
        cwd: projectPath  
    })

    const pullOut = execSync('git pull ' + repoAuthUrl, {
        cwd: projectPath  
    }).toString()

    console.log("Out : "+pullOut);

    if(!pullOut.includes('Already up to date.')) {
        //Do an action here :)
        //execSync('pm2 restart 0')
    }
}

function log(msg) {
    return console.log('[' + new Date().toLocaleString() + '] ' + msg)
}

function isDirEmpty(dirname) {
    return fs.readdirSync(dirname).length === 0
}

main()