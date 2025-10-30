from dotenv import load_dotenv
import shutil
import subprocess
import yt_dlp
from pprint import pprint
# extract client_id and secret from .env.local
from yt_dlp.utils import DownloadError, ExtractorError
import os

load_dotenv(".env.local")

def download_clips_with_ytdlp(urls, output_dir="clips"):
  os.makedirs(output_dir, exist_ok=True)
  ydl_opts = {
    "format": "bestvideo+bestaudio/best", # Select best video
    "outtmpl": os.path.join(output_dir, "clip%(autonumber)s.%(ext)s"), # %(autonumber)s. is a format string that is a string (s)
    "autonumber_start": 1,  # start numbering at 1
  }
  with yt_dlp.YoutubeDL(ydl_opts) as ydl: # type: ignore
    for url in urls: 
      try: 
        ydl.download([url])
      except (DownloadError, ExtractorError) as e:
        msg = str(e)
        if "HTTP Error 403" in msg or "403" in msg:
          print(f"Skipped (403): {url}")
          continue
        raise ValueError("Found an error: ", e)
# video_files: list of clip file names (clip0001.mp4)
def concat_videos(video_files, output_file="output.mp4"):
    # 1. Create a temporary text file listing the clips
    mainDir = os.path.dirname(os.path.abspath(__file__))
    clipsPath = os.path.join(mainDir, "clips");
    # create a videos.txt that has each clip name to concatenate
    with open("videos.txt", "w") as f:
        for v in video_files:
          f.write(f"file '{clipsPath+"/"+v}'\n")

    # need to use, allows variable framerate smooth (no freezes) output.mp4: 
    # ffmpeg -i input1.mp4 -c copy intermediate1.ts
    # ffmpeg -i input2.mp4 -c copy intermediate2.ts
    # ffmpeg -i "concat:intermediate1.ts|intermediate2.ts" -c copy output.mp4 

    # Iterate over videos.txt convert each clip into a .ts (transport stream)
    for idx, v in enumerate(video_files):
      i = idx + 1
      subprocess.run([
        "ffmpeg", 
        "-y",
        "-i", f"./clips/{v}",  
        "-c", "copy",
        f"./clips/intermediate{i}.ts"
      ])
    concat_str = "concat:"
    for i in range(len(video_files)):
      concat_str += f"./clips/intermediate{i+1}.ts|"
      ### str ###:  "concat:./clips/intermediate1.ts|./clips/intermediate2.ts|./clips/intermediate3.ts"
    concat_str = concat_str[:-1] # removes last character
    subprocess.run([
      "ffmpeg", "-y",
      "-i", f"{concat_str}", # ffmpeg when called with subprocess does not like quotes around like 
      "-c", "copy", 
      output_file,
    ])
    # clean up clips folder
    try:
      os.remove("videos.txt")
      shutil.rmtree("./clips")
    except FileNotFoundError:
      print(f"Folder not found: ./clips") 

# video_files: list of clip file names (clip0001.mp4)
def nine_by_sixteen(video_files, output_file="output.mp4"):
    # 1. Create a temporary text file listing the clips
    mainDir = os.path.dirname(os.path.abspath(__file__))
    clipsPath = os.path.join(mainDir, "clips");
    # create a videos.txt that has each clip name to concatenate
    with open("videos.txt", "w") as f:
        for v in video_files:
          f.write(f"file '{clipsPath+"/"+v}'\n")

    # need to use, allows variable framerate smooth (no freezes) output.mp4: 
    # ffmpeg -i input1.mp4 -c copy intermediate1.ts
    # ffmpeg -i input2.mp4 -c copy intermediate2.ts
    # ffmpeg -i "concat:intermediate1.ts|intermediate2.ts" -c copy output.mp4 
    # Convert each video into 9:16 by inverting the height to 
    for idx, v in enumerate(video_files):
      i = idx+1
      subprocess.run([
        "ffmpeg",
        "-y",
        "-i", f"./clips/{v}",
        "-vf", "scale=1080:-1,pad=1080:1920:0:(1920-ih)/2:color=black",
        "-c:v", "libx264",
        "-c:a", "aac",
        f"./clips/{i}_{output_file}"
      ])
    # Iterate over videos.txt convert each clip into a .ts (transport stream)
    for idx, v in enumerate(video_files):
      i = idx + 1
      subprocess.run([
        "ffmpeg", 
        "-y",
        "-i", f"./clips/{i}_output.mp4",  
        "-c", "copy",
        f"./clips/intermediate{i}.ts"
      ])
    concat_str = "concat:"
    for i in range(len(video_files)):
      concat_str += f"./clips/intermediate{i+1}.ts|"
      ### str ###:  "concat:./clips/intermediate1.ts|./clips/intermediate2.ts|./clips/intermediate3.ts"
    concat_str = concat_str[:-1] # removes last character
    subprocess.run([
      "ffmpeg", "-y",
      "-i", f"{concat_str}", # ffmpeg when called with subprocess does not like quotes around like 
      "-c", "copy", 
      output_file,
    ])
    # clean up clips folder
    try:
      os.remove("videos.txt")
      shutil.rmtree("./clips")
    except FileNotFoundError:
      print(f"Folder not found: ./clips") 