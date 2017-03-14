# memories
Crowd sourced memories graphed by sentiment, user and location.

## Mongo Database

The mongo database is called `memoriesdb`.

### Dumping the Database

You can dump the database to save a copy of its data to this repository by running the following command from the terminal (not the mongo shell):

```
mongodump --db memoriesdb --out ./db-dump
```

### Restoring the Database

You can restore your local version of the mongo database to what is in the repository's database dump by running the following command from the terminal (not the mongo shell):

```
mongorestore --drop --db memoriesdb ./db-dump
```

Note that `--drop` will remove any other tables added to the database that were not in the dump.


