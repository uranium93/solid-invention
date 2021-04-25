# Description

The application is built using Nest.js framework that helps to apply inversion of control in with flavor of dependencies injection.

The database used here is postgres and it was picked without any bias, used because the Author feel more comfortable using it so he can spin up the server quicker.

SQL is used instead of NoSql as the problem is typical for SQL query instead of NoSql (Graph DB also can be a good fit).

The code is fully covered by unit test and end-2-end test (Using real database).

# How to use

The Application require .env file, even that the file don't contain any sensitive data it was ignored to be pushed (will be shared via email or via git-secret).

Server will connect to database, you can see the database config in .env file or just `docker-compose up` on the root level
configuration is really flexible , feel free to update the .env to connect to you postgres server `your machine` , `cloud` or `docker container`

after running your database please execute `yarn migration` to sync database with code models.

As this project was done in less than 5 hours, i didn't add enough seeding for both envs `dev / test`.

You can add data manually if you would like to, or just check 2e2 test.

To run unit tests: `yarn test`
To run end-to-end tests: `yarn test:e2e` (make sure test database is running `cd test && docker-compose up`)
To run server : `yarn start`
To run migration: `yarn migration`
To run seeding: `yarn seed` (Not fully added)


As i said before, we have 2 types of databases, if you check .env you will understand or `src/config/db`

Logging and Error handling is done by `nest`, of course you can use your own setup, i used to add `bunyan` as a logger and integrate it with `Kibana`, and of course we can do the same here.

Error handling: `nest` automatically will catch the error in controller level, log the error, and return 500 to client after omitting the Error.message to avoid any data leaking.