const fs = require('fs')
const execSync = require('child_process').execSync
const path = require('path')

class AutoPull {
    constructor(repoAccount, repoName, projectPath, pullInterval, functionToExecute) {
        if (!repoAccount || !repoName || !projectPath || !pullInterval)
            log("You have to specify repo account, repo name, project path and the pull interval.");
        this.repoAccount = repoAccount
        this.repoName = repoName
        this.projectPath = projectPath
        this.pullInterval = pullInterval
        this.branch = ''
        this.url = ''
        this.gitlog = true
        this.functionToExecute = functionToExecute
        return this
    }

    oauth(token) {
        if (!token) {
            log("You have to specify username and password.", this);
            return
        }
        this.url = '"https://' + token + '@github.com/' + this.repoAccount + '/' + this.repoName + '.git"'
        return this
    }

    auth(username, password) {
        if (!username || !password) {
            log("You have to specify username and password.", this);
            return
        }
        this.url = '"https://' + username + ':' + password + '@github.com/' + this.repoAccount + '/' + this.repoName + '.git"'
        return this
    }

    withBranch(branch) {
        this.branch = " -b " + branch
        return this
    }

    buildProject(command) {
        execSync(command, {
            cwd: this.projectPath
        })
        return this
    }

    disableGitLogs() {
        this.gitlog = false
        return this
    }

    start() {
        if (!this.repoAccount || !this.repoName || !this.projectPath || !this.pullInterval) return
        if (this.url === '') this.url = '"https://github.com/' + this.repoAccount + '/' + this.repoName + '.git"'

        log('Started auto pull for repo https://github.com/' + this.repoAccount + '/' + this.repoName, this)

        if (this.url)

            if (!fs.existsSync(this.projectPath)) {
                log("Folder doesn't exists, creating one...", this);
                fs.mkdirSync(this.projectPath, { recursive: true })
            }

        if (!fs.existsSync(path.join(this.projectPath, '.git'))) {
            if (!isDirEmpty(this.projectPath)) {
                log("The directory at " + this.projectPath + " need to be empty to clone the project !", this)
                return
            }

            log("Project not cloned, cloning it. Please wait...", this)

            execSync('git clone ' + this.url + this.branch + ' .', {
                cwd: this.projectPath
            })
        }

        this.pull()
        this.interval = setInterval(() => {
            this.pull()
        }, (this.pullInterval * 1000));
        return this
    }

    stop() {
        clearInterval(this.interval)
        log('Stopped auto pull for repo https://github.com/' + this.repoAccount + '/' + this.repoName, this)
        return this
    }

    pull() {
        log('Pulling...', this);

        execSync('git reset --hard', {
            cwd: this.projectPath
        })

        const pullOut = execSync('git pull ' + this.url, {
            cwd: this.projectPath,
            stdio: 'pipe'
        }).toString()

        if (this.gitlog) log(pullOut, this);

        if (!pullOut.includes('Already up to date.')) {
            //Do an action here :)
            //execSync('pm2 restart 0')
            if(this.functionToExecute) this.functionToExecute()
        }
    }
}

function log(msg, cl) {
    return console.log('[' + new Date().toLocaleString() + (!cl ? '' : ' | ' + cl.repoAccount + '/' + cl.repoName) + ']', msg)
}

function isDirEmpty(dirname) {
    return fs.readdirSync(dirname).length === 0
}

module.exports.AutoPull = AutoPull
