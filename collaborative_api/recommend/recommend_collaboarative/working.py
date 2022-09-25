from textwrap import fill
import numpy as np
import pandas as pd
import csv
import json
from recommend.recommend_collaboarative import mongo
import re
import sys
from config import db_host, db_port
def run_engine_main(book_name):
    # Fetching data from Db

    books_tba = mongo.read_mongo("semiFinal", "books", host=db_host, port=db_port);
    users_tba = mongo.read_mongo("semiFinal", "users", host=db_host, port=db_port);
    # print(books_tba.columns)
    # books_tba = pd.read_csv('new_books-2.csv');
    # users_tba = pd.read_csv('Users-2.csv');
    # print(books_tba)
    # print(books_tba1)
    # print(users_tba)
    # print(users_tba1)

    # ratings_tba = pd.read_csv('./recommend/recommend_collaboarative/reviews.csv');


    books_tba


    # users_tba.head()

    # ratings_tba

    # ratings_tba.reviews

    # ratings_tba.reviews.to_csv

    # Converting the Array to Csv
    # Using for loops because the elements where of type str and didn't work on pandas dataframe.


    columns_value=["name","rating","_id"]
    fill_datas=[]
    data_val=0
    ratings_tba_p=pd.DataFrame(columns=columns_value)
    # print(books_tba.head())
    for index, item in books_tba.iterrows():
        id= item["_id"]
        for val in item["reviews"]:
            # print(type(val))
            # for each in item:
            individual_data=[]
            # print(type(each))
            individual_data.append(val["name"])
            individual_data.append(val["rating"])
            individual_data.append(id)
            fill_datas.append(individual_data)

    # sliced the array
    # temp = item[1:-1]
    # #reviewJson = json.loads(temp)
    # temp_s =temp[1:-1]
    # # converted to array using , as delimiter
    # #print(temp_s.split(","))
    # splited_array = temp_s.split(",")
    # toWrite = ""
    # individual_data=[]
    # for data in splited_array :
        
    #     #print(data.split(':'))
    #     table_splited=data.split(':')
    #     if "name" in table_splited[0]:
    #         individual_data.append(table_splited[1][1:-1])
    #     elif "rating" in table_splited[0]:
    #         individual_data.append(table_splited[1])
            
    #     elif "_id" in table_splited[0]:
    #         individual_data.append(table_splited[2][1:-2])
    #     if (len(individual_data) >= 3):
    #         fill_datas.append(individual_data)
    #         individual_data=[]

            
    ratings_tba = pd.DataFrame(fill_datas, columns=columns_value)  
    print(ratings_tba)
    # for items in books_tba['reviews']:
    #     # val=items[1:-1]
    #     val=items.replace("[","")
    #     val=val.replace("]","")
    #     # obj=json.loads(val)
    #     # for val in items:
    #     # val="{%s}" % val
    #     # obj=json.loads(val)
    #     # print(val)
    #     val=val.replace("'",'"')
    #     # val="{%s}" % val
    #     # print(val)
    #     # tmp=json.dumps(val)
    #     # obj=json.loads(tmp)
    #     # print(obj[0]["name"])
    #     # print(obj)    
    #     # print(type(obj))
    #     array_val= re.split('}, {',val)
    #     # print(array_val)
    #     start=0
    #     for each in array_val:
    #         # print(each)
    #         if ( start >= 50):
    #             break
    #         individual_data=[]
    #         try:
    #             if (each[-1] != "}"):
    #                 each="%s}" % each
    #             if (each[0] != "{"):
    #                 each="{%s" % each
    #         #     each=each.replace("'",'"')
    #             # print(each)
                
    #             json_obj=json.loads((each))
            
    #             # print(type(json_obj))
    #             individual_data.append(json_obj["name"])
    #             individual_data.append(json_obj["rating"])
    #             individual_data.append(books_tba['_id'][data_val])
    #             # data_val=data_val+1
    #             # print(individual_data)
    #             # print("******************************************")
    #             ratings_tba_p.loc[len(ratings_tba_p.index)] = individual_data 
    #             start=start+1
    #         #         # print(dft)
    #         #     # except:
    #         #         # data_val=data_val+1
    #         #         # pass
    #         #     data_val=data_val+1
    #         # if (data_val >= 1):
    #         #     exit()
    #         except Exception:
    #             print("Sorry")
    #             # sys.exc_clear()
    #     data_val=data_val+1
        # 
        
    # for item in books_tba["reviews"].to_numpy():
    #     # sliced the array
    #     temp = item[1:-1]
    #     #reviewJson = json.loads(temp)
    #     temp_s =temp[1:-1]
    #     # converted to array using , as delimiter
    #     #print(temp_s.split(","))
    #     splited_array = temp_s.split(",")
    #     toWrite = ""
    #     individual_data=[]
    #     for data in splited_array :
    #         # print(data)
    #         #print(data.split(':'))
    #         table_splited=data.split(':')
    #         if "name" in table_splited[0]:
    #             individual_data.append(table_splited[1][1:-1])
    #         elif "rating" in table_splited[0]:
    #             individual_data.append(table_splited[1])
                
    #         elif "_id" in table_splited[0]:
                
    #             individual_data.append(books_tba["_id"][data_val])
    #         if (len(individual_data) >= 3):
    #             fill_datas.append(individual_data)
    #             individual_data=[]
        
    #     data_val=data_val+1
    # print(books_tba["_id"][0])
    # print("***************************************")
    # print(fill_datas[1])
            
    # ratings_tba_p = pd.DataFrame(fill_datas, columns=columns_value)  
    # print(ratings_tba_p)
    # print("***************************************")

    # In[95]:


    # ratings_tba = pd.read_csv("ratings_tba.csv")
    # ratings_tba.head()


    # In[96]:


    # ratings_tba_p = pd.read_csv("./recommend/recommend_collaboarative/ratings_tba.csv")
    # ratings_tba_p

    # print(ratings_tba_p)
    books_tba.rename(columns={'bookName':'Book-Title'},inplace=True)
    # books_tba['_id'] = books_tba['_id'].astype("string")
    # ratings_tba['_id'] = ratings_tba['_id'].astype("string")

    books_tba.isnull().sum()
    print(books_tba)
    print(books_tba.dtypes)
    print(ratings_tba.dtypes)
    # print("Duplicated")
    # print(type(books_tba))
# current_bin['avgSpeedBinID'] = current_bin['avgSpeedBinID'].astype(int)
    # # # Collaborative Filtering Based Recommender System

    # # In[104]:

    combined_table = ratings_tba.merge(books_tba ,on='_id')
    print("Combined:")
    print(combined_table)
    print("**********************************************")
    # combined_table


    # # In[105]:


    # # Name of user and number of ratings given by them , who have rated at least more than 1 book
    x = combined_table.groupby('name').count()['rating']>1

    # # Boolean indexing and fetching the indexes (username)
    users_who_rated = x[x].index

    # # Finding users ID in thw user table :
    # # rating_with_user['name'].isin(users_who_rated) Gives Boolean series, which then gives the table with users and ratings and books 
    filtered_rating = combined_table[combined_table['name'].isin(users_who_rated)]
    # filtered_rating


    # # In[106]:


    # #rating_with_name = 


    # # In[107]:


    y = filtered_rating.groupby('Book-Title').count()['rating']>0
    famous_books = y[y].index
    final_rating = filtered_rating[filtered_rating['Book-Title'].isin(famous_books)]
    # print(final_rating)
    # print("**********************************************")

    # # In[108]:


    # # table of every book to every users : 
    pt = final_rating.pivot_table(index="Book-Title", columns="_id",values='rating')
    pt.fillna(0, inplace=True)
    pt


    # # In[109]:


    from sklearn.metrics.pairwise import cosine_similarity


    # # In[110]:

    # print(pt)
    # print("**********************************************")
    
    similarity_scores = cosine_similarity(pt)
    similarity_scores[0]


    # # In[111]:


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



