. ./.env 
export PGPASSWORD=$POSTGRES_PASSWORD
# create admin user and database for the project
psql --set=pgpassword=$PGPASSWORD -h $POSTGRES_HOST -U $POSTGRES_USER -f ./db/db_create.sql
# create the tables
psql -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB -f ./db/tables_create.sql 