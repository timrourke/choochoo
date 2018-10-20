# choochoo

A simple CRUD app using React and Symfony.

## Running locally

You can run `choochoo` locally using `docker-compose`:

1. Clone this repository

```bash
git clone https://github.com/timrourke/choochoo.git
```

2. [Install Docker](https://www.docker.com/get-started) if you do not already have it

3. Spin up the local development environment using `docker-compose`:

```bash
cd /path/to/choochoo

docker-compose up --build
```

4. Browse to [http://localhost](http://localhost) (or possibly something like [http://192.168.99.100](192.168.99.100) if you are using Docker Machine)