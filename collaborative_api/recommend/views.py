from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# from .serializers import working

from recommend import serializers
from recommend.recommend_collaboarative import working

class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

        # takes the book name from frontend while a user clicks on a book
        # moves towards main AI code that is in working.py
        print("request_data:"+str(request.data))
        # file_serializer = serializers.FileSerializer(data=request.data)
      
        print(type(request.data ))
        print(request.data['bookName'])
        return Response(working.run_engine_main(request.data['bookName']), status=status.HTTP_201_CREATED)
 