from textwrap import fill
import numpy as np
import pandas as pd
import csv
import json
from recommend.recommend_collaboarative import mongo
import re
import sys
# Data processing
import scipy.stats
import json
import sys
# Visualization
import seaborn as sns
import re
# Similarity
from sklearn.metrics.pairwise import cosine_similarity



def run_engine_main(Username):
    # books_tba = mongo.read_mongo("smallDataSetBook", "books", host="docker.host.internal", port=27017);
    # users_tba = mongo.read_mongo("smallDataSetBook", "users", host="docker.host.internal", port=27017);

  #importing data 
    books_tba = pd.read_csv('new_books-2.csv');
    users_tba = pd.read_csv('Users-2.csv');
    # # Read in data


    #creating ratings pandas df from existing books df
    columns_value=["name","rating","_id"]
    fill_datas=[]
    data_val=0
    ratings=pd.DataFrame(columns=columns_value)
    for items in books_tba['reviews']:
        # val=items[1:-1]
        val=items.replace("[","")
        val=val.replace("]","")
        # obj=json.loads(val)
        # for val in items:
        # val="{%s}" % val
        # obj=json.loads(val)
        # print(val)
        val=val.replace("'",'"')
        # val="{%s}" % val
        # print(val)
        # tmp=json.dumps(val)
        # obj=json.loads(tmp)
        # print(obj[0]["name"])
        # print(obj)    
        # print(type(obj))
        array_val= re.split('}, {',val)
        # print(array_val)
        start=0
        for each in array_val:
            # print(each)
            if ( start >= 50):
                break
            individual_data=[]
            try:
                if (each[-1] != "}"):
                    each="%s}" % each
                if (each[0] != "{"):
                    each="{%s" % each
            #     each=each.replace("'",'"')
                # print(each)

                json_obj=json.loads((each))

                # print(type(json_obj))
                individual_data.append(json_obj["name"])
                individual_data.append(json_obj["rating"])
                individual_data.append(books_tba['_id'][data_val])
                # data_val=data_val+1
                # print(individual_data)
                # print("******************************************")
                ratings.loc[len(ratings.index)] = individual_data 
                start=start+1
            #         # print(dft)
            #     # except:
            #         # data_val=data_val+1
            #         # pass
            #     data_val=data_val+1
            # if (data_val >= 1):
            #     exit()
            except Exception:
                print("Sorry")
                sys.exc_clear()
        data_val=data_val+1
    ratings

    # Get the dataset information
    ratings.info()

    # Merge ratings and movies datasets
    df = pd.merge(ratings, books_tba, on='_id', how='inner')

    # Take a look at the data
    df.head()


    # Aggregate by movie
    agg_ratings = df.groupby('_id').agg(mean_rating = ('rating', 'mean'),
                                                    number_of_ratings = ('rating', 'count')).reset_index()

    # Keep the movies with over 100 ratings
    agg_ratings_GT100 = agg_ratings[agg_ratings['number_of_ratings']>1]
    agg_ratings_GT100.info()                              


    # Let's check what the most popular movies and their ratings are.

    # In[29]:


    # Check popular movies
    agg_ratings_GT100.sort_values(by='number_of_ratings', ascending=False).head()


    # Visulization
    sns.jointplot(x='mean_rating', y='number_of_ratings', data=agg_ratings_GT100)



    # In[31]:


    # Merge data
    df_GT100 = pd.merge(df, agg_ratings_GT100[['_id']], on='_id', how='inner')
    df_GT100.info()


    # Create user-item matrix
    matrix = df_GT100.pivot_table(index='name', columns='_id', values='rating')
    matrix.head()




    # Normalize user-item matrix
    matrix_norm = matrix.subtract(matrix.mean(axis=1), axis = 'rows')
    matrix_norm.head()



    # User similarity matrix using Pearson correlation
    user_similarity = matrix_norm.T.corr()
    user_similarity.head()


    # User similarity matrix using cosine similarity
    user_similarity_cosine = cosine_similarity(matrix_norm.fillna(0))
    picked_userid =[]
    picked_userid.append(Username)

    # Remove picked user ID from the candidate list
    user_similarity.drop(index=picked_userid, inplace=True)

    # Take a look at the data
    # Number of similar users
    n = 10


    # User similarity threashold
    user_similarity_threshold = 0.3

    temp_df=user_similarity[picked_userid].reset_index()
    # for dat in temp_df:
    #     print(dat)
    # print(temp_df["test13"])
    similar_users=pd.DataFrame(columns=["users","similarity"])

    # print("HELOOO")
    # print(similar_users)
    picked_userid=Username

    for index, data_row in temp_df.iterrows():
    #     print(data_row["test13"])
        if float(data_row[picked_userid]) > 0.1:
    #         print(data_row[picked_userid])
            data=[[data_row["name"],data_row[picked_userid]]]
    #         print(data)
            
            temp_df_1 = pd.DataFrame(data,columns=["users","similarity"])
    #         print(temp_df_1)
            similar_users=similar_users.append(temp_df_1)
            
    #     print(data_row[picked_userid])
    # print(similar_users)


    # In[286]:


    # ratings.loc[ratings['name'] == "test4", "_id"]

    #get all books read by similar users
    books_name=pd.Series().array
    for index, data_row in similar_users.iterrows():

            books_name= np.append(books_name,ratings.loc[ratings['name'] == data_row["users"], "_id"].array)
            # books_name=books_name[np.isfinite(books_name)]
            books_name= np.unique(books_name)
    # print(len(books_name))


    # In[292]:


    #books read by main user
    books_name_user= ratings.loc[ratings['name'] == picked_userid, "_id"].array
    # books_name_user=books_name[np.isfinite(books_name_user)]
    books_name_user=np.unique(books_name_user)

    len(books_name_user)


    # In[301]:

    #book not read by users but read by similar users
    res = [item for item in books_name if item not in books_name_user]
    # print(res)
    res=np.nan_to_num(res)
    return(res)


# books_data = pd.Series().array
# books_data = run_engine_main("test13")
