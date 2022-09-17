#!/usr/bin/env python
# coding: utf-8

# In[87]:


import numpy as np
import pandas as pd
import csv
import json
from recommend.recommend_collaboarative import mongo

def run_engine_main(book_name):
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


    # # Collaborative Filtering Based Recomender System

    # In[104]:


    combined_table = ratings_tba_p.merge(books_tba ,on='_id')
    combined_table


    # In[105]:


    # Name of user and number of ratings given by them , who have rated atleast more than 1 book
    x = combined_table.groupby('name').count()['rating']>1

    # Boolean indexing and fetching the indexes (username)
    users_who_rated = x[x].index

    # Finding users ID in thw user table :
    # rating_with_user['name'].isin(users_who_rated) Gives Boolean series, which then gives the table with users and ratings and books 
    filtered_rating = combined_table[combined_table['name'].isin(users_who_rated)]
    filtered_rating


    # In[106]:


    #rating_with_name = 


    # In[107]:


    y = filtered_rating.groupby('Book-Title').count()['rating']>0
    famous_books = y[y].index
    final_rating = filtered_rating[filtered_rating['Book-Title'].isin(famous_books)]
    final_rating


    # In[108]:


    # table of every book to every users : 
    pt = final_rating.pivot_table(index="Book-Title", columns="_id",values='rating')
    pt.fillna(0, inplace=True)
    pt


    # In[109]:


    from sklearn.metrics.pairwise import cosine_similarity


    # In[110]:


    similarity_scores = cosine_similarity(pt)
    similarity_scores[0]


    # In[111]:


    def recommend(book_name):
        #index fetch
        index = np.where(pt.index==book_name)[0][0]
        # enumerate = converts a data collection object into an enumerate object
        # lambda = anyonomus function /. arrow function 
        suggestions = []
        similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1], reverse=True)[1:4]
        for i in similar_items:
            #item = []
            #temp_df = books_tba[books_tba["bookName"]==pt.index[i[0]]]
            suggestions.append(pt.index[i[0]])
            #item.append(temp_df.drop_duplicates('bookName')['bookName'])
            
        return suggestions


    # In[112]:


    return(recommend(book_name))


    # In[ ]:





    # In[ ]:





    # In[ ]:





    # In[ ]:





    # In[ ]:





    # In[ ]:





    # In[ ]:




