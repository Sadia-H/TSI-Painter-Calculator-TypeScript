export class Room {
    private walls: {height: number, width: number}[] = [];
    private obstacles: {height: number, width: number}[] = [];
    private paintCoats: number = 1;
    private colour: string; 

    constructor(colour: string) {
        this.colour = colour;
    }


    addWall(height: number, width: number) {
        this.walls.push({height, width});
    }

    addObstacle(height: number, width: number) {
        this.obstacles.push({height, width});
    }

    setPaintCoats(coats: number): void {
        this.paintCoats = coats;
    }

    getTotalRoomArea(): number {
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