T=True, F=False whether its done or not done
# TODO General:
* Create a guard for backend and frontend requests [Y]
  - frontend guard routes user back to login [Y]
  - backend protects /api routes sending 401 if unauthed or 200 if good [Y]

## LOGIN PAGE:
* Work on login page validating username and password to backend 
  - Encrypt passwords on entry with bcrypt [Y]
  - validate user from input -> hashed input [Y]
  - Register page? [N]

## Character Select Page:
* Get character model created for DB [Y]
* create a list view for a users characters [Y]
* clicking a character transitions to Display/Select gear page [Y]
* option to create a new character [Y]
* Paginate the character list [Y]

## Gear select page:
BIG WORK ON THIS PAGE DO THIS LAST BUT BRAINSTORM now:
* div for current gear equippted
* div for calculated stats
* list view for query to battlnet back end services
* modal view for hover over gear pieces
  - display this information somewhere above the data?
* Eventually want to be able to filter list by classID and sub-class
  - make it a select-option list next to search button
* Item image should have border pertaining to rarity

## What i want to work on today:
* on list item click, should fill the related gearslot for the user  [Y]
  - should also do a put to backend updating db stored character [N]
  -  Clicking gear item should also fetch the gear stats to be displayed
* Calculated stat section
  - need to query blizzard per item for stats, should probably do it on equiping the gear
* Should filter out trinkets, cloak... or add them
* need to add persistence creating backend charTemplate model onInit gets characterTemplates WORK ON THIS RN 
* On hover event for showing gear specific stats  
* think about vaulting offhand, just having 1 weapon to simplify things
  - consider the twohand vs onehand offhand collisison in db/client side