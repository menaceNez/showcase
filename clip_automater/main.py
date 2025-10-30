

from lib.mongo_connection import MongoDatabase
from pymongo.collection import Collection
from lib.main_functions import getTwitchToken, nine_by_sixteen_upload, playClipByGame, playClipsByBroadcaster, uploadLastWeekBroadcasterClips, uploadTopWeeklyGame 


import socket

def is_port_open(host: str, port: int, timeout: float = 1.0) -> bool:
    """
    Returns True if the TCP port is open on the host, False otherwise.
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(timeout)
        try:
            sock.connect((host, port))
            return True
        except (socket.timeout, ConnectionRefusedError):
            return False

if __name__ == "__main__": 
  # Connect to Database
  db = MongoDatabase()
  db = db.connect()
  # Get a token from twtich
  token = getTwitchToken()

  # Example usage
  host = "localhost"
  port = 58759
  if is_port_open(host, port):
      print(f"{host}:{port} is open")
      raise ValueError("Port 58759 is listening for another application")
  else:
      print(f"{host}:{port} is closed")
  # upload all time clips by game 
  # game = "counter-strike"
  # title = "Top 50 Most Viewed Twitch Clips"
  # limit = 3
  # playClipByGame(game,token,title, limit)

  # upload clips by broadcaster from most viewed all time
  # who = "xaryu"
  # title = "goat resume"
  # limit = 20
  # playClipsByBroadcaster(who,token,title)

  # Plays broadcaster clips from the past week
  # who = "nicewigg"
  # title = "goat resume"
  # limit = 2
  # uploadLastWeekBroadcasterClips(who,token,title, limit)

  # Upload top clips from this past week by game
  # game = "grand theft auto V"
  # title = "Weekly Top twitch clips"
  # limit = 20
  # uploadTopWeeklyGame(game, token, title)

  # Upload for yt and tiktok
  who = "pokelawls"
  title = "daily top twitch clips"
  nine_by_sixteen_upload(who,token,title,db)




# # # # # # # # # # # # # # # # # # # # # #
#                                         #
#            Clip Automater               # 
#                                         #
# # # # # # # # # # # # # # # # # # # # # #
#
# Want ai generated thumbnail/title
# Eventually want to integrate subtitles to the end video with whipser
# Would like to have it fully automated as a cron job running off rasberrypi
#   For this i need a Content Manger youtube account... or i can pickle the OAuth credentials for a next upload?
# Want to specify either game or user 
#   - game grabs top clips from a game category from twtich
#   - user grabs top clips from a user's name
# Need to have title and description auto generated in some way
# Could also do clips by yea
# Automation cycle should be a list of creators/games
# Take the game clips per week or day
