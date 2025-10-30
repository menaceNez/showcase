import re
import shutil
import subprocess
import yt_dlp
from pymongo.collection import Collection
from typing import Any
from bs4 import BeautifulSoup
import requests
from pprint import pprint
# extract client_id and secret from .env.local
import os
from dotenv import load_dotenv
from lib.time_ranges import WhatWeek
from pymongo import errors
load_dotenv(".env.local")


client_id= os.getenv("CLIENT_ID")
secret= os.getenv("SECRET")
yt_clientid = os.getenv("YT_CLIENTID")
yt_secret = os.getenv("YT_SECRET")

class RetrieveToken: 
  def __init__(self):
    self.url = "https://id.twitch.tv/oauth2/token"
    self.headers = {"Content-Type": "application/x-www-form-urlencoded"}
    self.body= {
      "client_id": f"{client_id}", 
      "client_secret": f"{secret}", 
      "grant_type": "client_credentials"
      }
  def getToken(self):
    response = requests.post(self.url, headers=self.headers, data=self.body)
    return response.json()

# This class will A) get a broadcaster_id B) get the clips from that broadcaster
class GetClips:
  def __init__(self, token, db: Collection[Any]):
    self.db = db
    self.user_url = "https://api.twitch.tv/helix/users"
    self.clips_url = "https://api.twitch.tv/helix/clips"
    # self.clips_dnld_url = "https://api.twitch.tv/helix/clips/downloads"
    self.headers = {
      "Authorization": f"Bearer {token}",
      "client_secret": f"{secret}", 
      "Client-Id": f"{client_id}"
    }

  def getUserId(self, username):
    params = { "login": username }
    response = requests.get(url=self.user_url, headers=self.headers, params=params) 
    if(response.ok):
      user_id = response.json()['data'][0]['id'] 
      return  user_id # return the user's id
    else:
      raise ValueError(f"getUserId failed to find id for: {username}")

  def getBroadcasterClips(self, id, limit):
    params = { "broadcaster_id": id }
    response = requests.get(url=self.clips_url, headers=self.headers, params=params)
    # info = [(itm['broadcaster_name'], itm['created_at'], itm['view_count']) for itm in response.json()['data']]
    # pprint(info)
    # raise ValueError("stop")
    if(response.ok):
      urls = []
      while len(urls) < limit:
        json = response.json()['data']
        self.filterUrls(urls, json, limit)
        cursor = response.json()['pagination']['cursor']
        loopParams = {**params, "after": cursor}
        response = requests.get(self.clips_url, headers=self.headers, params=loopParams)
      if not urls:
        raise ValueError("Urls returned empty")
      return urls
    else:
      raise ValueError("Failed to get BroadcasterClips", response.json())

  def getLastWeekBroadcasterClips(self,id, limit):
    week_class = WhatWeek(1) # WhatWeek(1) = from today to one week back
    paramsWeek = { "broadcaster_id": id,"started_at": week_class.startdate, "ended_at": week_class.enddate }
    response = requests.get(url=self.clips_url, headers=self.headers, params=paramsWeek)
    # info = [(itm['broadcaster_name'], itm['created_at'], itm['view_count']) for itm in response.json()['data']]
    # pprint(info)
    # raise ValueError("stop")
    if(response.ok):
      urls = []
      while len(urls) < limit:
        json = response.json()['data']
        self.filterUrls(urls, json, limit)
        cursor = response.json()['pagination']['cursor']
        loopParams = {**paramsWeek, "after": cursor}
        response = requests.get(self.clips_url, headers=self.headers, params=loopParams)
      if not urls:
        raise ValueError("Urls returned empty")
      pprint(urls)
      return urls
    else:
      raise ValueError("Failed to get BroadcasterClips", response.json())

  # Gets all time viewed game clips
  def getGameClips(self,g_id, limit) -> list: 
    params = {"game_id": g_id}
    response = requests.get(url=self.clips_url, headers=self.headers, params=params)
    # info = [(itm['broadcaster_name'], itm['created_at'], itm['view_count']) for itm in response.json()['data']]
    # pprint(info)
    # raise ValueError("w")
    if(response.ok):
      urls = []
      while len(urls) < limit:
        json = response.json()['data']
        self.filterUrls(urls, json, limit)
        cursor = response.json()['pagination']['cursor']
        loopParams = {**params, "after": cursor}
        response = requests.get(self.clips_url, headers=self.headers, params=loopParams)
      if not urls: raise ValueError("getGameClips returned no urls :", urls)
      return urls
    else:
      raise ValueError("Failed to get GameClips", response.json())
  # Returns game clips from this week
  def getThisWeeksGameClips(self, g_id, limit):
    week_class = WhatWeek(1)
    paramsWeek = { "game_id": g_id, "started_at": week_class.startdate, "ended_at": week_class.enddate}
    response = requests.get(url=self.clips_url, headers=self.headers, params=paramsWeek)
    # info = [(itm['broadcaster_name'], itm['created_at'], (itm['title'],itm['view_count'])) for itm in response.json()['data']]
    # pprint(info)
    if(response.ok):
      urls = []
      # Loop over current response and cull settings videos
      while len(urls) < limit:
        json = response.json()['data']
        self.filterUrls(urls, json, limit)
        cursor = response.json()['pagination']['cursor']
        loopParams = {**paramsWeek, "after": cursor}
        response = requests.get(self.clips_url, headers=self.headers, params=loopParams)
      if len(urls) == 0: raise ValueError("getGameClips returned no urls :", urls)
      return urls
    else:
      raise ValueError("Failed to get GameClips", response.json())

  # Filters out setting from clip responses, limit parameter deicides how many urls 
  def filterUrls(self, urls: list, json, limit: int):
    pattern = 'setting'
    for itm in json:
      if len(urls) == limit: return
      title = itm['title'].lower()
      lang = itm['language']
      if(re.search(pattern, title) == None and lang == 'en'):
        urls.append(itm['url'])
 
  """
  Gets clips from broadcaster and filters specific to 60 second clips
  """
  def nine_by_sixteen_broadcasterClips(self, id):
    params = { "broadcaster_id": id }
    response = requests.get(url=self.clips_url, headers=self.headers, params=params)
    # info = [(itm['broadcaster_name'], itm['created_at'], itm['view_count']) for itm in response.json()['data']]
    # pprint(info)
    # raise ValueError("stop")
    if(response.ok):
      urls = []
      # Isolate the list of clips and broadcaster
      while not urls:
        json = response.json()['data']
        # Filter out clips based on already seen, and duration requirements 
        self.filterTikTok(urls, json)
        # self.add_missing_ids(json, 2)
        cursor = response.json()['pagination']['cursor']
        loopParams = {**params, "after": cursor}
        response = requests.get(self.clips_url, headers=self.headers, params=loopParams)
      if not urls: raise ValueError("Urls returned empty")
      return urls
    else:
      raise ValueError("Failed to get BroadcasterClips", response.json())

  # Adds clip ids that are missing from our database
  def add_missing_ids(self, json, removals):
    ids = [itm['id'] for itm in json]
    for i in range(removals):
      try:
        print("INSERTING id: ", ids[i])
        self.db.insert_one({"id": ids[i]})
      except errors.DuplicateKeyError as e:
        continue
    raise ValueError('stop')

  # Select two 30 second videos or one 50 second video
  def filterTikTok(self,urls: list,json):
    duration = 0
    test = 0
    for itm in json:
      test = duration + itm['duration']
      if test < 60: 
        title = itm['title'].lower()
        lang = itm['language']
        if('settings' not in title and 'en' in lang):
          id = itm['id']
          try:
            self.db.insert_one({"id": id})
            duration += itm['duration']
            urls.append(itm['url'])
          except errors.DuplicateKeyError as e:
            continue
      test = 0
    
  def getTopTen(self) -> dict:
    topfive = "https://api.twitch.tv/helix/games/top?first=20"
    response = requests.get(topfive, headers=self.headers)
    json = response.json()['data']
    nameId = {itm['name'].lower(): itm['id'] for itm in json} # list of tuple
    return nameId

  def getGameByName(self,name):
    url = "https://api.twitch.tv/helix/games"
    params = {"name": name}
    response = requests.get(url, headers=self.headers, params=params)
    json = response.json()
    if len(json['data']) == 0: raise ValueError("Channel does not exist")
    id = json['data'][0]['id']
    return id
 