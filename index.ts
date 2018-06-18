const tileTypes = {
  "floor": 0,
  "wall": 1,
  "grass": 2,
  "npc": 3
};
const sampleMap = [[0, 0, 0, 0]];

const mapProperties = {
  width: 23
};

const mapLineTypes = {
  corridor: {
    format: {
      sample: "11111100000001111111111",
      canMirror: true
    },
    cooldown: 0,
    repeat: 0,
    chance: 0.5
  },
  combat: {
    format: {
      sample: "11111100000031111111111",
      canMirror: true
    },
    cooldown: 3,
    repeat: 0,
    chance: 0.1
  },
  combatDodgeble: {
    format: {
      sample: "11111100003001111111111",
      canMirror: true
    },
    cooldown: 3,
    repeat: 0,
    chance: 0.1
  },
  grass: {
    format: {
      sample: "111111222222221111111111",
      canMirror: true
    },
    cooldown: 2,
    repeat: 2,
    chance: 0.3
  }
};

const generateMap = () => {
  
};

/**
  - Width: 23
  - Always going up
  - line types:
    Corridor:   11111100000001111111111
    Grass:      11111122222221111111111
    NPC_forced: 11111100000031111111111
    NPC_dodge:  11111100003001111111111

  Line properties:
    - Format
      - Variance
      - Can mirror?
    - Repetable after X
    - Must have X in sequence
    - Chance to show in %
 */