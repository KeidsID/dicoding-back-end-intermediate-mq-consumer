[my-api]: https://github.com/KeidsID/dicoding-back-end-intermediate

# dicoding-back-end-intermediate-mq-consumer

This project is a consumer to consume queue from [dicoding-back-end-intermediate][my-api]

## Project Set Up

- Create the ".env" file with the following data below:

  ```sh
  # Server config
  HOST=localhost
  PORT=<desired port>

  # node-postgres config
  PGUSER=<your psql user>
  PGHOST=<your psql host>
  PGPASSWORD=<your psql password>
  PGDATABASE=<your psql database name>
  PGPORT=<your psql port>

  # RabbitMQ config
  RABBITMQ_SERVER=<your RabbitMQ server>

  # nodemailer config
  MAIL_HOST=<SMPT host>
  MAIL_PORT=<SMPT port>
  MAIL_ADDRESS=<SMTP username credential>
  MAIL_PASSWORD=<SMTP password credential>
  ```

- Then run command below:
  ```sh
  npm install
  ```