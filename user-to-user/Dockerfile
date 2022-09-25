FROM python:3

ENV PYTHONBUFFERED 1
ENV PYTHONWARNINGS="ignore:Unverified HTTPS request"

RUN mkdir /recommend-django

WORKDIR /recommend-django

COPY . /recommend-django

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN python manage.py makemigrations
RUN python manage.py migrate

EXPOSE 8000
