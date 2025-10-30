import whisper
from moviepy import VideoFileClip
import warnings
import requests
import json
import os
"""
extract_audio() -> extracts audio channel and writes a audio.wav file
"""
def extract_audio(video_path, audio_path="audio.wav"):
  clip = VideoFileClip(video_path)

  if clip.audio is None: raise ValueError("No Audio in clip file...")

  clip.audio.write_audiofile(audio_path)

  return audio_path
"""
  transcribe() -> text from audio
"""
def transcribe(audio_path="audio.wav"):
  warnings.filterwarnings("ignore", message="FP16 is not supported on CPU; using FP32 instead")
  model = whisper.load_model("small", device="cpu")
  result = model.transcribe(audio_path)
  return result['text']

def query_ollama(model, prompt):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }
    response = requests.post(url, json=payload)
    data = response.json()
    return data["response"]

# Example: summarize transcript
# preamble="no additional text, respond only with emojis that describe this transcript, keep it concise: "

# extract_audio("../output.mp4")

# transcript=transcribe()
# summary = query_ollama("gemma3:latest", f"Summarize this transcript:\n\n{f"{preamble}{transcript}"}")
# print(summary)

def generateTitle(video_path, creator):
  preamble=f"Give me one video title from this audio transcript taken from a twitch.tv clip by {creator} make the title concise have 0-4 emojis and fun. Proivde the title in raw text form: "
  audio_path = extract_audio(video_path)
  audio_text = transcribe()
  title = query_ollama("gemma3:latest", f"{preamble}{audio_text}")
  os.remove("audio.wav")
  if title == "": raise ValueError("No title outputted")
  return title
