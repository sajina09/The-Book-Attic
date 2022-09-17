#!/usr/bin/env python
# coding: utf-8

# In[87]:


import numpy as np
import pandas as pd
import csv
import json
from recommend.recommend_collaboarative import mongo

def run_engine_main():
    # In[88]:
    books_tba = mongo.read_mongo("bookAtticTest", "books");
    users_tba = mongo.read_mongo("bookAtticTest", "users");

    # books_tba1 = pd.read_csv('books_tba.csv');
    # users_tba1 = pd.read_csv('users_tba.csv');
    # print(books_tba)
    # print(books_tba1)
    # print(users_tba)
    # print(users_tba1)
    ratings_tba = pd.read_csv('./recommend/recommend_collaboarative/reviews.csv');


    # In[89]:


    books_tba


    # In[90]:


    users_tba.head()


    # In[91]:


    ratings_tba


    # In[92]:


    ratings_tba.reviews


    # In[93]:


    ratings_tba.reviews.to_csv


    # In[94]:


    # Converting the Array to Csv
    # Using for loops because the elements where of type str and didn't work on pandas dataframe.


    columns_value=["name","rating","id"]
    fill_datas=[]
    for item in ratings_tba.reviews.to_numpy():
        # sliced the array
        temp = item[1:-1]
        #reviewJson = json.loads(temp)
        temp_s =temp[1:-1]
        # converted to array using , as delimiter
        #print(temp_s.split(","))
        splited_array = temp_s.split(",")
        toWrite = ""
        individual_data=[]
        for data in splited_array :
            
            #print(data.split(':'))
            table_splited=data.split(':')
            if "name" in table_splited[0]:
                individual_data.append(table_splited[1][1:-1])
            elif "rating" in table_splited[0]:
                individual_data.append(table_splited[1])
                
            elif "_id" in table_splited[0]:
                individual_data.append(table_splited[2][1:-2])
            if (len(individual_data) >= 3):
                fill_datas.append(individual_data)
                individual_data=[]

            
    df = pd.DataFrame(fill_datas, columns=columns_value)  

    # In[95]:


    # ratings_tba = pd.read_csv("ratings_tba.csv")
    # ratings_tba.head()


    # In[96]:


    ratings_tba_p = pd.read_csv("./recommend/recommend_collaboarative/ratings_tba.csv")
    ratings_tba_p


    # In[97]:


    books_tba.rename(columns={'bookName':'Book-Title'},inplace=True)


    # In[98]:


    books_tba.isnull().sum()


    # In[99]:
    print("Duplicated")
    print(type(books_tba))
    # books_tba.duplicated().sum()


    # # Popularity based Recommendation System

    # In[147]:


    #Giving a table of book and ratings only
    num_rating_df_t = books_tba.groupby('Book-Title').count()['ratings'].reset_index()
    # reset_index gives a tbale instead of paragraph 
    num_rating_df_t.rename(columns={'ratings':'num_ratings'},inplace=True)
    num_rating_df_t


    # In[148]:


    avg_rating_df_t = books_tba.groupby('Book-Title').count()['ratings'].reset_index()
    avg_rating_df_t.rename(columns={'ratings':'avg_ratings'},inplace=True)
    avg_rating_df_t


    # In[149]:


    popular_df_t = num_rating_df_t.merge(avg_rating_df_t,on='Book-Title')
    popular_df_t


    # In[150]:


    popular_df_t = popular_df_t[popular_df_t['num_ratings']>=2].sort_values('avg_ratings',ascending=False).head(50)
    popular_df_t = popular_df_t.merge(books_tba,on="Book-Title").drop_duplicates("Book-Title")[['Book-Title','author','image','num_ratings','avg_ratings']]
    print(popular_df_t)
    return(popular_df_t)