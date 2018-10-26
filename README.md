# choochoo

A simple CRUD app using React and Symfony.

## Running locally

In my experience, Docker for Mac has very  poor performance because of some issues
Docker has with interacting with the host OS's filesystem. I've included a
docker-compose config in the event this approach is your preference, but note
that the application should run more efficiently using Vagrant. Vagrant
instructions are below.

### You can run `choochoo` locally using `docker-compose`:

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
mysql -hmysql -uroot -ppassword -d choochoo < seed.sql
``` 

- Browse to [http://localhost](http://localhost) (or possibly something like [http://192.168.99.100](192.168.99.100) if you are using Docker Machine)

### You can run `choochoo` locally using `Vagrant`:

- Clone this repository

```bash
git clone https://github.com/timrourke/choochoo.git
```

- Edit the MySQL host names to be `localhost` instead of `mysql`:
    - Copy the file `api/.env.dist` to `api/.env`
    - Change the env var for `DATABASE_URL` to `mysql://root:password@localhost:3306/choochoo`
    
- Install `Vagrant`: https://www.vagrantup.com/downloads.html

- Install `Virtualbox`: https://www.virtualbox.org/

- Spin up the local environment using `Vagrant up`:

```bash
cd /path/to/choochoo

vagrant up
```

**NOTE:** Installing yarnjs is flaky for some reason. You may need to re-run the
Vagrant provision step to get it to complete:

```bash
vagrant provision
```

- SSH into the Vagrant machine and set up the database:

```bash
cd /path/to/choochoo

vagrant ssh

cd /var/www/api

bin/console doctrine:database:create
bin/console doctrine:migrations:migrate
mysql -hlocalhost -uroot -ppassword -d choochoo < seed.sql
``` 