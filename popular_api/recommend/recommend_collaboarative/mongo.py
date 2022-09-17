import pandas as pd
from pymongo import MongoClient
from config import db_host, db_port

def _connect_mongo(host, port, db):
    """ A util for making a connection to mongo """
    conn = MongoClient(host, port)


    return conn[db]


def read_mongo(db, collection, query={}, host=db_host, port=db_port, username=None, password=None, no_id=True):
    """ Read from Mongo and Store into DataFrame """

    # Connect to MongoDB
    db = _connect_mongo(host=host, port=port, db=db)



    cursor = db[collection].find()


    # # Expand the cursor and construct the DataFrame
    df =  pd.DataFrame(list(cursor))

    return df
# print(type(read_mongo("bookAttic", "books")))