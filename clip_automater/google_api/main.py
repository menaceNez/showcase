from pprint import pprint
# -*- coding: utf-8 -*-

# Sample Python code for youtube.channels.list
# See instructions for running these code samples locally:
# https://developers.google.com/explorer-help/code-samples#python

import os
import pprint

import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

import pickle

scopes = ["https://www.googleapis.com/auth/youtube.readonly"]

def main():
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "google_twclipsgs_secretclientid.json"

    # Get credentials and create an API client
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
        client_secrets_file, scopes)

    if (os.path.exists("cred.plk")):
       with open("cred.plk", "rb") as file:
          credentials = pickle.load(file)
    else:
      credentials = flow.run_local_server(port=8080)

    with open("cred.plk", "wb") as file: # wb=write binary
      pickle.dump(credentials, file)

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)

    request = youtube.channels().list(
        part="snippet,contentDetails,statistics",
        id="UC_x5XG1OV2P6uZZ5FSM9Ttw"
    )

    response = request.execute()

    pprint.pprint(response)

if __name__ == "__main__":
    main()




# -*- coding: utf-8 -*-

# Sample Python code for youtube.videos.insert
# NOTES:
# 1. This sample code uploads a file and can't be executed via this interface.
#    To test this code, you must run it locally using your own API credentials.
#    See: https://developers.google.com/explorer-help/code-samples#python
# 2. This example makes a simple upload request. We recommend that you consider
#    using resumable uploads instead, particularly if you are transferring large
#    files or there's a high likelihood of a network interruption or other
#    transmission failure. To learn more about resumable uploads, see:
#    https://developers.google.com/api-client-library/python/guide/media_upload
# import os
# import pprint

# import google_auth_oauthlib.flow
# import googleapiclient.discovery
# import googleapiclient.errors

# from googleapiclient.http import MediaFileUpload

# scopes = ["https://www.googleapis.com/auth/youtube.upload"]

# def main():
#     # Disable OAuthlib's HTTPS verification when running locally.
#     # *DO NOT* leave this option enabled in production.
#     os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

#     api_service_name = "youtube"
#     api_version = "v3"
#     client_secrets_file = "google_twclipsgs_secretclientid.json"

#     # Get credentials and create an API client
#     flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
#         client_secrets_file, scopes)
#     credentials = flow.run_local_server(port=8080)
#     youtube = googleapiclient.discovery.build(
#         api_service_name, api_version, credentials=credentials)

#     print("Startng video upload")

#     video_path = "../output.mp4"

#     request = youtube.videos().insert(
#         part="snippet,status",
#         body={
#           "snippet": {
#             "categoryId": "22",
#             "description": "Description of uploaded video.",
#             "title": "Test video upload."
#           },
#           "status": {
#             "privacyStatus": "private",
#             "madeForKids": "false" 
#           }
#         },
        
#         media_body=MediaFileUpload(video_path)
#     )
#     response = request.execute()

#     pprint.pprint(response)

# if __name__ == "__main__":
#     main()