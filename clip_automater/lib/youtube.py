import pickle
from pprint import pprint
import os

import google_auth_oauthlib.flow
import googleapiclient.discovery
from googleapiclient.http import MediaFileUpload
import googleapiclient.errors
from googleapiclient.http import set_user_agent, HttpRequest
import os
import json
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from lib.transcription import generateTitle

scopes = ["https://www.googleapis.com/auth/youtube.upload"]

def upload_to_youtube(gamename: str, twitch_links, title):

    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"
    client_secrets_file = "google_twclipsgs_secretclientid.json"
    TOKEN_FILE= "token.json"

    # Get credentials and create an API client
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
        client_secrets_file, scopes)
    # creds = None
    # if os.path.exists(TOKEN_FILE):
    #     creds = Credentials.from_authorized_user_file(TOKEN_FILE, scopes)
    # if not creds or not creds.valid:
    #     if creds and creds.expired and creds.refresh_token:
    #         creds.refresh(Request())
    #     else:
    #         flow = InstalledAppFlow.from_client_secrets_file(client_secrets_file, scopes)
    #         creds = flow.run_local_server(port=8080)  # port=0 avoids conflicts
    #     with open(TOKEN_FILE, "w") as token:
    #         token.write(creds.to_json())

    credentials = flow.run_local_server(port=58759)

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, credentials=credentials)

    print("Starting video upload...")

    video_path = "output.mp4"
    wizard =r"""
         /^\     .
    /\   "V"
   /__\   I      O  o
  //..\\  I     .
  \].`[/  I
  /l\/j\  (]    .  O
 /. ~~ ,\/I          .
 \\L__j^\/I       o
  \/--v}  I     o   .
  |    |  I   _________
  |    |  I c(`       ')o
  |    l  I   \.     ,/
_/j  L l\_!  _//^---^\\_ 
"""
  
    title = generateTitle("output.mp4", gamename) 
    print("##### THis is the titel: #####", title)
    if title == "": raise ValueError("INvalid title!", title)

    request = youtube.videos().insert(
        part="snippet,status",
        body={
          "snippet": {
            "categoryId": "24",
            "description": wizard,
            "tags": [
              "beansnorice",
              "beanssnorice",
              "beannssnorice",
              "beannsnocrice",
              "twitch clips",
              "funny",
              "funny twitch clips",
              "asmongold",
              "ludwig",
              "moonmoon",
              "kai cenat",
              "pokelawls"
            ],
            "title": f"{title}"
          },
          "status": {
            "privacyStatus": "public",
            "selfDeclaredMadeForKids": False # selfDeclaredMadeForKids
          }
        },
        
        media_body=MediaFileUpload(
            video_path, 
            chunksize=1024*1024*4, # 4 MB
            resumable=True
            )
    )
    response = None
    while response is None:
        try:
            status, response = request.next_chunk()
            if status:
                print(f"Uploaded {int(status.progress() * 100)}%")
        except TimeoutError:
            print("Timeout. Retrying...")
            continue

    # print("Upload complete:", response)
    # response = request.execute()

    pprint(response)

