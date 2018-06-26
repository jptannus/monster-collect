import { Builder } from "./builder";

const tileTypes = {
  "floor": 0,
  "wall": 1,
  "grass": 2,
  "npc": 3
};

const mapProperties = {
  width: 23
};

const generateMap = (height:number) => {
  let map = Builder.buildFirstCorridor([]);
  map = Builder.buildLineTimes(map, height);
  return map;
};

const printMap = (map:Array<string>) => {
  console.log("-- Map Begin ------");
  let counter = 0;
  map.forEach(line => {
    console.log(`${counter}. ${line}`);
    counter++;
  });
  console.log("-- Map Ends ------");
};
printMap(generateMap(20));