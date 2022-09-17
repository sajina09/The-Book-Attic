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
    #   run_script.cleaner()
        file_serializer = serializers.FileSerializer(data=request.data)
        print("tori   _____"+str(request.data))
        print(type(request.data ))

    #   if file_serializer.is_valid():
        #   file_serializer.save()
        # try:
            #   base64_data = run_script.main()
            #   data = {'image_base64':base64_data}
            #   data.update(file_serializer.data)
        return Response(working.run_engine_main(request.data['bookName']), status=status.HTTP_201_CREATED)
    #     except:
    # #           pass
    # #   else:
    #         return Response("bachha", status=status.HTTP_400_BAD_REQUEST)
