# from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# from .serializers import working

from recommend import serializers
from recommend.recommend_collaboarative import working

class FileUploadView(APIView):
    # parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        
   
        # file_serializer = serializers.FileSerializer(data=request.data)
        print("request data "+str(request.data))
        print(type(request.data ))

        return Response(working.run_engine_main(), status=status.HTTP_201_CREATED)
