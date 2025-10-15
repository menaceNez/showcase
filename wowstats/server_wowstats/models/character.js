var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const charSchema = new Schema({
  name: {
    type: String
  },
  class: {
    type: String,
    enum: ['mage', 'warrior'],
  },
  stats: {
    dps: Number,
    armor: Number,
    stamina: Number,
    strength: Number,
    intellect: Number,
    agility: Number,
    spirit: Number,
  },
  characterTemplate: {
    head: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    neck: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,

        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    back: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,

        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    shoulders: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    chest: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    waist: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    legs: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    feet: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    hands: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    wrist: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    twohand: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    offhand: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    onehand: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    trinket: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
    finger: {
      gearpiece: {
        name: String,
        itemID: Number,
        mediaID: Number,
        invintory_type: String,
        subclass_name: String,
        required_level: Number,
        quality: String,
        mediaLink: String,
        stats: {
          dps: Number,
          armor: Number,
          stamina: Number,
          strength: Number,
          intellect: Number,
          agility: Number,
          spirit: Number,
        }
      }
    },
  },
});

module.exports = mongoose.model('Character', charSchema);