# Setting up the PostgreSQL Database
# Create a database called `flag_test`

  # psql -d postgres  -> goes to the psql command line interface
  # CREATE DATABASE flag_test

  #     OR    #

  # createdb flag_test

# Execute the command:
  # psql -d flag_test < init.sql
  # this causes the `init.sql` file to be executed within the `flag_test` database
  # creating a flags table with the appropriate Schema and some preliminary data insertions

# Spinning up the Back-End Server
  # Spin up the Backend Server on Localhost 8000
  # Connect the PostgreSQL Client to the Back-end Server
  # Assumes that no user authentication is in place (can connect based on name of the database)
  # Set up `nodemon` with the appropriate script