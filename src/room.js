"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor(colour) {
        this.walls = [];
        this.obstacles = [];
        this.paintCoats = 1;
        this.colour = colour;
    }
    addWall(height, width) {
        this.walls.push({ height, width });
    }
    addObstacle(height, width) {
        this.obstacles.push({ height, width });
    }
    setPaintCoats(coats) {
        this.paintCoats = coats;
    }
    getTotalRoomArea() {
        let totalRoomArea = 0;
        for (let wall of this.walls) {
            totalRoomArea += wall.height * wall.width;
        }
        for (let obstacle of this.obstacles) {
            totalRoomArea -= obstacle.height * obstacle.width;
        }
        return totalRoomArea * this.paintCoats;
    }
}
exports.Room = Room;
