const { AutoPull } = require('./util')

/*
EXAMPLES

########## FOR PRIVATE REPOSITORIES ##########

new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds), function() {...} (execute code when files are updated)).auth("username", "password").start()
new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds), function() {...} (execute code when files are updated)).oauth("oauthtoken").start()

new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds), function() {...} (execute code when files are updated)).auth("username", "password").withBranch("branchName").start()
new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds), function() {...} (execute code when files are updated)).oauth("oauthtoken").withBranch("branchName").start()

########## FOR PUBLIC REPOSITORIES ##########

new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds), function() {...} (execute code when files are updated)).start()
new AutoPull("repoAccount", "repoName", "projectPath", int pullInterval (in seconds), function() {...} (execute code when files are updated)).withBranch("branchName").start()

########## STOP ##########

const pull = new AutoPull(...)
pull.stop()

########## DISABLE GIT LOG ##########

new AutoPull(...).disableGitLogs()

You can also use global variables for authentication, but i let you do that yourself :)
*/

new AutoPull("MohistMC", "Mohist", "/home/shawiizz/Bureau/test/", 5).withBranch("1.16.5").start()
