interface LineTypeFormat {
  sample: string;
  canMirror: boolean;
}

interface LineType {
  format: LineTypeFormat;
  cooldown: number;
  repeat: number;
  chance: number; 
}

interface World {
  repeat: Function;
  repeatCounter: number;
  cooldownGrass: number;
  cooldownCombat: number;
  cooldownCombatDodge: number;
}

export namespace Builder {
  const mapLineTypes = new Map<string, LineType>();
  mapLineTypes.set("corridor", {
    format: {
      sample: "111000111",
      canMirror: true
    },
    cooldown: 0,
    repeat: 0,
    chance: 0.5
  });
  mapLineTypes.set("combat", {
    format: {
      sample: "111003111",
      canMirror: true
    },
    cooldown: 3,
    repeat: 0,
    chance: 0.1
  });
  mapLineTypes.set("combatDodgeble", {
    format: {
      sample: "111030111",
      canMirror: true
    },
    cooldown: 3,
    repeat: 0,
    chance: 0.1
  });
  mapLineTypes.set("grass", {
    format: {
      sample: "111222111",
      canMirror: true
    },
    cooldown: 2,
    repeat: 2,
    chance: 0.3
  });

  const buildLine = (map:string[], type:string):string[] => {
    map.push(mapLineTypes.get(type)!.format.sample);
    return map;
  }
  
  const buildCorridor = (map:string[]):string[] => buildLine(map, "corridor")
  const buildGrass = (map:string[]):string[] => buildLine(map, "grass")
  const buildCombat = (map:string[]):string[] => buildLine(map, "combat")
  const buildCombatDodgeble = (map:string[]):string[] => buildLine(map, "combatDodgeble")
  
  const buildCorridorTimes = (map:string[], times:number):string[] => {
    if (!times) return map;
    return buildCorridorTimes(buildCorridor(map), times - 1);
  }

  const nullFunc = () => {};

  const world: World = {
    repeat: nullFunc,
    repeatCounter: 0,
    cooldownGrass: 0,
    cooldownCombat: 0,
    cooldownCombatDodge: 0
  };

  const updateWorld = (builder:Function) => {
    switch (builder) {
      case buildGrass:
        if (world.repeat === buildGrass) {
          world.repeatCounter = world.repeatCounter - 1;
          if (world.repeatCounter <= 0) {
            world.repeat = nullFunc;
            world.cooldownGrass = 2;
          }
        } else if (!world.repeat) {
          world.repeat = buildGrass;
          world.repeatCounter = 2;
        }
        break;
      case buildCombat:
        world.cooldownCombat = 3;
        break;
      case buildCombatDodgeble:
        world.cooldownCombatDodge = 3;
        break;
    }
  }

  const gatherBuildFunctions = ():Function[] => {
    let functions:Function[] = [buildCorridor];
    if (world.cooldownGrass <= 0) {
      functions.push(buildGrass);
    } else {
      world.cooldownGrass = Math.max(0, world.cooldownGrass - 1);
    }
    if (world.cooldownCombat <= 0) {
      functions.push(buildCombat);
    } else {
      world.cooldownCombat = Math.max(0, world.cooldownCombat - 1);
    }
    if (world.cooldownCombatDodge <= 0) {
      functions.push(buildCombatDodgeble);
    } else {
      world.cooldownCombatDodge = Math.max(0, world.cooldownCombatDodge - 1);
    }
    if (world.repeat != nullFunc) {
      functions = [world.repeat];
    }
    return functions;
  }

  const buildLineByChance = (map:string[]):string[] => {
    const builders = gatherBuildFunctions();
    const index = Math.floor(Math.random() * builders.length);
    const builder = builders[index];
    updateWorld(builder);
    return builder(map);
  }
  
  export const buildFirstCorridor = (map:string[]):string[] =>
    buildCorridorTimes(map, 5);
  
  export const buildLineTimes = (map:string[], times:number):string[] => {
    if (!times) return map;
    map = buildLineByChance(map);
    return buildLineTimes(map, times - 1);
  }
}