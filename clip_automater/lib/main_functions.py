
from pymongo.collection import Collection
from typing import Any
from lib.youtube import upload_to_youtube
from lib import twitch_fetches
from lib import file_ops
import os

"""
  PlayClipByGame: Gets top viewed clips by gamename
    gamename: name of the game to take clips from
    token: twitch token
    title: title to name the resulting upload
    limit: number of clips to accumulate 
"""
def playClipByGame(gamename, token, title, limit,db: Collection[Any]):
  # Create getclips object
  reqClips = twitch_fetches.GetClips(token,db)
  # Get the top 10 clips from twithc, map of {name: id} 
  # gameNameIdDict = reqClips.getTopTen() # 
  g_id = reqClips.getGameByName(gamename)# 
  # best practice for some lists of tuples, convert to dict
  # g_id = gameNameIdDict.get(gamename)
  # If no gid raise an error
  if not g_id:
    raise ValueError("g_id is empty, prob bad name")
  # Fetch game clips from twitch
  urls = reqClips.getGameClips(g_id, limit)
  # download the clips and place them into "clips"
  file_ops.download_clips_with_ytdlp(urls)
  links =  [names.split("/clip/")[0] for names in urls]
  description = combineLinks(links)
  # Get a list of video names to concatenate
  clips = os.listdir("clips")
  # Concatenate the clips together with ffmpeg
  file_ops.concat_videos(clips) # outputs out.mp4 ( all the clips together )
  # Take the game's name, description and title 
  upload_to_youtube(gamename,description, title) # link title


"""
  PlayClipsByBroadcaster: gets clips most viewed clips by broadcaster name
    who: name of the broadcaster to take clips from
    token: twitch token
    title: title to name the resulting upload
    limit: number of clips to accumulate 
"""
def playClipsByBroadcaster(who,token,title, limit,db):
  # fetch userid by name
  reqClips = twitch_fetches.GetClips(token,db)
  # Get the user_id for the broadcaster (who)
  user_id = reqClips.getUserId(who)
  # fetch a list of clips from the caster, twitch api
  urls = reqClips.getBroadcasterClips(user_id, limit)
  # download the clips (.mp4) and creates/places them into "clips" folder
  file_ops.download_clips_with_ytdlp(urls)
  # Generate in the description a list of twitch channels
  links =  [names.split("/clip/")[0] for names in urls]
  description = combineLinks(links)
  # Get a list of video names to concatenate with ffmpeg
  clips = os.listdir("clips")
  # Concatenate the clips together with ffmpeg
  file_ops.concat_videos(clips) # outputs out.mp4 ( all the clips together )
  # upload to youtube
  upload_to_youtube(who, description, title) # link title


"""
  uploadLastWeekBroadcasterClips: gets clips most viewed clips from past week by broadcaster name
    who: name of the broadcaster to take clips from
    token: twitch token
    title: title to name the resulting upload
    limit: number of clips to accumulate 
"""
def uploadLastWeekBroadcasterClips(who,token,title, limit,db):
  # fetch userid by name
  reqClips = twitch_fetches.GetClips(token,db)
  # Get the user_id for the broadcaster (who)
  user_id = reqClips.getUserId(who)
  # fetch a list of clips from the caster, twitch api
  urls = reqClips.getLastWeekBroadcasterClips(user_id, limit)
  # download the clips (.mp4) and creates/places them into "clips" folder
  file_ops.download_clips_with_ytdlp(urls)
  # Generate in the description a list of twitch channels
  links =  [names.split("/clip/")[0] for names in urls]
  description = combineLinks(links)
  # Get a list of video names to concatenate with ffmpeg
  clips = os.listdir("clips")
  # Concatenate the clips together with ffmpeg
  file_ops.concat_videos(clips) # outputs out.mp4 ( all the clips together )
  # upload to youtube
  upload_to_youtube(who, description, title) # link title


"""
  uploadTopWeeklyGame: Uploads top viewed clips from past week by gamename 
    gamename: name of the broadcaster to take clips from
    token: twitch token
    title: title to name the resulting upload
    limit: number of clips to accumulate 
"""
def uploadTopWeeklyGame(gamename, token, title, limit,db):
  # Create getclips object
  reqClips = twitch_fetches.GetClips(token,db)
  # Get the top 10 clips from twithc, map of {name: id} 
  # gameNameIdDict = reqClips.getTopTen() # 
  g_id = reqClips.getGameByName(gamename) 
  if not g_id:
    raise ValueError("g_id is empty, prob bad name")
  # Fetch game clips from twitch
  urls = reqClips.getThisWeeksGameClips(g_id, limit)
  # download the clips and place them into "clips"
  file_ops.download_clips_with_ytdlp(urls)
  links =  [names.split("/clip/")[0] for names in urls]
  description = combineLinks(links)
  # Get a list of video names to concatenate
  clips = os.listdir("clips")
  # Concatenate the clips together with ffmpeg
  file_ops.concat_videos(clips) # outputs out.mp4 ( all the clips together )
  # Take the game's name, description and title 
  upload_to_youtube(gamename,description, title) # link title
"""
Gets clips from a broadcaster, converts the video to 9:16 for shorts/tiktok
"""
def nine_by_sixteen_upload(who,token,title,db: Collection[Any]):
  # fetch userid by name
  reqClips = twitch_fetches.GetClips(token, db)
  # Get the user_id for the broadcaster (who)
  user_id = reqClips.getUserId(who)
  # fetch a list of clips from the caster, twitch api
  urls = reqClips.nine_by_sixteen_broadcasterClips(user_id)
  # download the clips (.mp4) and creates/places them into "clips" folder
  file_ops.download_clips_with_ytdlp(urls)
  # Generate in the description a list of twitch channels
  links =  [names.split("/clip/")[0] for names in urls]
  description = combineLinks(links)
  # Get a list of video names to concatenate with ffmpeg
  clips = os.listdir("clips")
  # Concatenate the clips together with ffmpeg
  file_ops.nine_by_sixteen(clips) # outputs out.mp4 ( all the clips together )
  # upload to youtube
  try: 
    upload_to_youtube(who, description, title) # link title
  except OSError as e:
    t = [itm.split("/clip/")[-1] for itm in urls]
    for id in t:
      print(f"REMOVING {id} FROM OUR DATABASE AS WE FAILED")
      res = db.delete_one({"id": id})
      check = list(db.find({"id": id}))
      print("DELETE RESTUL: ", res)
      if len(check) > 0: db.delete_one({"id": id})
      print("SHOULD BE EMPTY FIND :", check)
    raise

"""
  Gets twitch token using client id and client secret
"""
def getTwitchToken() -> str:
  tok = twitch_fetches.RetrieveToken()
  token = tok.getToken()
  token = token['access_token']
  return token
"""
Combines a list of urls into a single string
"""
def combineLinks(links: list) -> str:
  description = ""
  for link in links:
    description += link+"\n"
  return description