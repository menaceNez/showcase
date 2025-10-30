import datetime

class WhatWeek:
  def __init__(self, weeks: int):
    if weeks <= 0: raise ValueError("Cannot have zero or negative weeks")
    today = datetime.datetime.now(datetime.timezone.utc)
    self.enddate = (today - datetime.timedelta(weeks=0)).isoformat()
    self.startdate = (today - datetime.timedelta(weeks=weeks)).isoformat()
  def __repr__(self):
    return f"start: {self.startdate} | end: {self.enddate}"
  # Example of extracting dates
  def example(self):
    dt = datetime.datetime.now(datetime.timezone.utc)
    # Year-month-day
    print(dt.strftime("%Y-%m-%d"))   # '2025-10-11'
    # Month-day (numeric)
    print(dt.strftime("%m-%d"))      # '10-11'
    # Month name and day
    print(dt.strftime("%B %d"))      # 'October 11'
    # Day-month-year
    print(dt.strftime("%d/%m/%Y"))   # '11/10/2025'
