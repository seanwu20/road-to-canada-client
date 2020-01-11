import {store} from "../store";
import {SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT} from "../constants";

export default function handleMovement(player) {
  function getNewPosition(oldPos, direction) {
    // moves the player
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  }

  function isTopOfMap(direction) {
    const oldPos = store.getState().player.position;
    const nextPos = getNewPosition(oldPos, direction);
    // const nextPos = getNewPosition(oldPos, "NORTH");
    console.log("nexPos", nextPos);
    // if (nextPos[1] === 0) {
    //   //   console.log("Choose next destination");
    //   return true
    // }
    return nextPos[1] === 0 && nextPos[0] >= 480 && nextPos[0] <= 720;
  }

  function getSpriteLocation(direction) {
    switch (direction) {
      case "NORTH":
        return "move_north";
      case "SOUTH":
        return "move_south";
      case "EAST":
        return "move_east";
      case "WEST":
        return "move_west";
    }
  }
  //   function getSpriteLocation(direction) {
  //     switch (direction) {
  //       case "NORTH":
  //         return "-120px";
  //       case "SOUTH":
  //         return "-180px";
  //       case "EAST":
  //         return "0px";
  //       case "WEST":
  //         return "-60px";
  //     }
  //   }

  function observeBoundaries(oldPos, newPos) {
    // checks if next tile is a map boundary
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
    );
  }

  function observeImpassable(oldPos, newPos) {
    // checks if next tile is an obstacle
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    // 0-3 are walkable (grass, dirt, etc)
    // 4-9 are obstacles (trees, rocks, etc)
    return nextTile < 3;
  }

  function dispatchMove(direction, newPos) {
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        // ...store.getState(),
        position: newPos,
        direction,
        spriteLocation: getSpriteLocation(direction),
        topOfMap: isTopOfMap(direction)
      }
    });
  }

  function attemptMove(direction) {
    // compares current position to surrounding tiles
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);

    // if next tile is walkable, allow player to move
    if (
      observeBoundaries(oldPos, newPos) &&
      observeImpassable(oldPos, newPos)
    ) {
      dispatchMove(direction, newPos);
    }
  }

  function handleKeyDown(e) {
    e.preventDefault();

    switch (e.keyCode) {
      case 37:
        return attemptMove("WEST");
      case 38:
        return attemptMove("NORTH");
      case 39:
        return attemptMove("EAST");
      case 40:
        return attemptMove("SOUTH");
      default:
        console.log(e.keyCode);
    }
  }

  document.addEventListener("keydown", e => {
    // 32 - spacebar
    if ([32, 37, 38, 39, 40].includes(e.keyCode)) {
      handleKeyDown(e);
    }
  });

  return player;
}
