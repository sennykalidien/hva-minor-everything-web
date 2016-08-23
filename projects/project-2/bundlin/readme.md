# Bundlin

The beauty of the web, bundled.

[![wercker status](https://app.wercker.com/status/6f71ffb1dc1c3ce5488726fa13b88b4e/m "wercker status")](https://app.wercker.com/project/bykey/6f71ffb1dc1c3ce5488726fa13b88b4e)

# API
## Postman

The Postman collection can be found online, you can import it to view the api endpoints.

https://www.getpostman.com/collections/1ff785ca48c3c771a59e

## Documentation

> **Note**: The documentation is currently incomplete, use the postman collection instead.

Generate the api documentation using the following commands:
* `cd server`
* `npm run docs`

You can now find the documentation in the `docs/api` folder of the project root.



# Administration
## Add a User to the Beta
* ssh into the associated server
* `mongo`
* `use bundlin`
* `db.users.update({ 'username': 'PimVerlaan' }, { $set: { 'roles': ['beta'] } })`

# Development
## Common
* `vagrant up`
* `vagrant provision`
* `brew install ansible` (only if ansible is not available on your system yet)
* `cd devops`
* `./devops provision vagrant all`
* be sure to add `33.33.33.103 bundlin.dev` to your /etc/hosts file

> The root directory of the application will be mounted in the VM at /home/deploy/bundlin, use that as your working directory.

## Backend environment setup
* `cd server`
* `npm run fixtures` (if applicable)
* use one of the following commands
	* `./debug .` in the `server` folder.
	* `npm start` (production like)
* connect a debugger
    * setup ssh tunnel: `ssh -L 5858:localhost:5858 root@33.33.33.103`
    * webstorm: run / edit configurations /  + nodejs remote debug / host localhost port 5858, then run debugger with debug icon
    * node-inspector:
        * `ssh -L 8080:localhost:8080 root@33.33.33.103`
        * in vagrant, `npm install -g node-inspector`
        * in vagrant, `node-inspector`
        * on host, visit 127.0.0.1:8080 in browser

## Frontend environment setup
* `cd client`
* `grunt`

# Provisioning
## provisioning a server
* `./devops provision environment all`

## updating encrypted ansible config files
* `./devops edit provision/group_vars/environment.yml`

# Deployment
## Staging
Deployments to the staging environment are done through Wercker.

https://app.wercker.com/#applications/538c47ca3e1f413e380c72a2/tab/deployment.

## Production
Deployments to production can be done using the followings commands:

* `cd devops`
* `./devops command deploy production webdbservers`

Rolling back a release can be done using the following command:

* `./devops command rollback production webdbservers`

# Database management

## Dump
Databases can be backed completely up using the following command:
./devops command database_dump staging dbservers

## Export
Collections in databases can be exported as JSON with the following command:
./devops command database_export staging dbservers

# Monitoring
## New Relic
New Relic is being used to monitor the different environments of the application, as well as all the servers that are provisioned using the provided provision scripts.
