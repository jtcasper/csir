# How to Run Django REST API #

1. Download & install the latest [Git](https://git-scm.com/download/).
2. Download & install the latest [Python 3](https://www.python.org/downloads/). 
3. Download & install the latest [Postgres](https://www.postgresql.org/download/). Make sure the password you set for your database is "PWD123admin".
4. Follow setup instructions for [GeoDjango](https://docs.djangoproject.com/en/1.11/ref/contrib/gis/install/#windows). Make sure your GDAL_LIBRARY_PATH matches the one that is in [settings.py](/caesar/settings.py).
4. Open up pgAdmin and connect using your password to run the PostgreSQL server.
5. Open SQL Shell (psql) and press enter through the prompts, using defaults and connect using your password ("PWD123admin").
6. Enter the command "CREATE DATABASE caesar;" to create a new database.
![Create DB](/docs/assets/psql_createdb.png)
7. Open git bash and clone this repository into a directory of your choosing (*you may have to check out a branch if the code you are interested in isn't in master*).
8. In git bash, cd into the directory that you just created and run `$ pip install -Ur requirements.txt`.
9. Next, run `$ python manage.py makemigrations`, then `$ python manage.py migrate` to set up the database.
10. Next, run `$ python manage.py runserver` to run the server locally.
11. Finally, open your browser and navigate to `http://localhost:8000/api/issues`. You should see the following page:
![REST Add Issue](/docs/assets/rest_add_issue.png)

