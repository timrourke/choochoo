# choochoo

A simple CRUD app using React and Symfony.

## Running locally

In my experience, Docker for Mac has very poor performance because of some issues
Docker has with interacting with the host OS's filesystem. I've included a
docker-compose config in the event this approach is your preference, but note
that the application should run more efficiently using Vagrant. Vagrant
instructions are below.

### Clone choochoo

Clone [choochoo](https://github.com/timrourke/choochoo) from GitHub.

### Install Python

If you do not have Python already installed, [go get it here](https://www.python.org/downloads/).

### Install Ansible

You will need to have Ansible installed locally to provision the Vagrant machine
(or a production instance). [Read about installing Ansible here](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).

### Vagrant for local development

If you don't already have it, [download Vagrant](https://www.vagrantup.com/downloads.html)
for your preferred platform. Comes with a nice installer, easy to get started.

### VirtualBox for local development

If you don't already have it, [download VirtualBox](https://www.virtualbox.org/wiki/Downloads)
for your preferred platform. Also easy to install.

### Configure your local OS's hosts file

For mac users, you'll want to add a line to your `/etc/hosts` file pointing the
IP address `192.168.50.4` to the hostname `choochoo.localdev`.

### Vagrant up

Change directories into the folder you cloned this repository into. From there,
run this command:

```bash
vagrant up
```

You should see the Vagrant box download, set itself up, and then run the Ansible
provisioning steps.

If all that works, browse to [http://choochoo.localdev](http://choochoo.localdev)
and you'll see the app.

### You can run `choochoo` locally using `docker-compose`, though it is not recommended:

- Clone this repository

```bash
git clone https://github.com/timrourke/choochoo.git
```

- Edit the MySQL host names to be `mysql` instead of `localhost`:
    - Copy the file `api/.env.dist` to `api/.env`
    - Change the env var for `DATABASE_URL` to `mysql://root:password@mysql:3306/choochoo`
 
- [Install Docker](https://www.docker.com/get-started) if you do not already have it

- Spin up the local development environment using `docker-compose`:

```bash
cd /path/to/choochoo

docker-compose up --build
```

- Migrate the database and import the seed SQL file inside the `php-fpm` container:

```bash
cd /path/to/choochoo

docker-compose exec php-fpm bash

cd /var/www/api

bin/console doctrine:database:create
bin/console doctrine:migrations:migrate
bin/console doctrine:fixtures:load
``` 

- Browse to [http://localhost](http://localhost) (or possibly something like [http://192.168.99.100](192.168.99.100) if you are using Docker Machine)
