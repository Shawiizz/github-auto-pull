const { AutoPull } = require('./util')

/*
EXAMPLES

########## FOR PRIVATE REPOSITORIES ##########

new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds)).auth("username", "password").start()
new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds)).oauth("oauthtoken").start()

new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds)).auth("username", "password").withBranch("branchName").start()
new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds)).oauth("oauthtoken").withBranch("branchName").start()

########## FOR PUBLIC REPOSITORIES ##########

new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds)).start()
new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds)).withBranch("branchName").start()

########## STOP ##########

const pull = new AutoPull(...)
pull.stop()

########## DISABLE GIT LOG ##########

new AutoPull(...).disableGitLogs()

You can also use global variables for authentication, but i let you do that yourself :)
*/