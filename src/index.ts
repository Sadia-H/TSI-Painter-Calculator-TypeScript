import { Room } from './room';
import * as readlineSync from 'readline-sync';


const paintBrands = [
    { 
        name: 'Leyland', 
        prices: {
            1: 1.5,
            2.5: 3.0,
            5: 6.5,
            10: 12.0
        }
    },
    { 
        name: 'Dulux', 
        prices: {
            1: 2.5,
            2.5: 5.0,
            5: 9.0,
            10: 16.0
        }
    },
    { 
        name: 'GoodHome', 
        prices: {
            1: 5.6,
            2.5: 11.0,
            5: 18.0,
            10: 32.0
        }
    }
];

function main() {
    console.log("Welcome to Paint Calculator!");

    // Get number of rooms
    let roomCount = readValidNumber('How many rooms would you like to paint? ', 1);
    let rooms: Room[] = [];

    // RoomInfo - walls, colour, paint coats 
    for (let i = 0; i < roomCount; i++) {
        rooms.push(getRoomInfo(i + 1));
    }

    // Number of paint coats for all rooms
    let coats = readValidNumber('How many coats of paint for all rooms? ', 1);

    // Calculates the total area to paint for each room
    for (let i = 0; i < rooms.length; i++) {
        let room = rooms[i];
        let area = room.getTotalRoomArea();
        console.log(`The total area to paint for room ${i + 1}: ${area} square meters.`);
    }

    // Displays paint brand selected
    let selectedBrand = selectPaintBrand();
    console.log(`You have chosen ${selectedBrand.name} paint brand.`)

    // For the selected brand - calculate most efficient cost option
    let finalTotalArea = calculateTotalArea(rooms);
    let costEfficientOption = calculatePaintAndCost(finalTotalArea, coats, selectedBrand);
    console.log(`\nThe most cost-effective option for ${selectedBrand.name} is to buy ${costEfficientOption.cans.join(', ')} litre cans.`);
    console.log(`Total cost: £${costEfficientOption.cost.toFixed(2)}`);
}

function getRoomInfo(roomIndex: number): Room {
    console.log(`\nRoom ${roomIndex}:`);

    // User enters colour for room
    let colour = readlineSync.question('Enter the colour for the room: ');
    let room = new Room(colour);

    // For each wall, height and width dimensions are entered and added to the room
    let wallCount = readValidNumber(`How many walls are in room ${roomIndex}? `, 1);
    for (let i = 0; i < wallCount; i++) {
        let height = readValidNumber(`Enter height of wall ${i + 1} in room ${roomIndex} (in metres): `, 0);
        let width = readValidNumber(`Enter width of wall ${i + 1} in room ${roomIndex} (in metres): `, 0);
        room.addWall(height, width);
    }

    // User enters number of obstacles
    let obstacleCount = readValidNumber(`How many obstacles (e.g. doors, windows) are in room ${roomIndex}? If none, enter 0. `, 0);
    if (obstacleCount < 0) {
        obstacleCount = 0; // Ensure obstacles count is at least 0
    }
    for (let i = 0; i < obstacleCount; i++) {
        let height = readValidNumber(`Enter height of obstacle ${i + 1} in room ${roomIndex} (in metres): `, 0);
        let width = readValidNumber(`Enter width of obstacle ${i + 1} in room ${roomIndex} (in metres): `, 0);
        room.addObstacle(height, width);
    }

    return room;
}

function readValidNumber(prompt: string, minValue: number): number {
    while (true) {
        let input = readlineSync.question(prompt);
        let num = parseFloat(input);
        if (!isNaN(num) && num >= minValue) {
            return num;
        }
        console.log(`Input valid number (${minValue} or more), please.`);
    }
}

function calculateTotalArea(rooms: Room[]): number {
    let totalArea = 0;
    for (let i = 0; i < rooms.length; i++) {
        totalArea += rooms[i].getTotalRoomArea();
    }
    return totalArea;
}

function selectPaintBrand(): { name: string, prices: { [key: number]: number } } {
    console.log("\nChoose a paint brand:");
    for (let i = 0; i < paintBrands.length; i++) {
        console.log(`${i + 1}. ${paintBrands[i].name}`);
    }

    let brandIndex = -1;
    while (brandIndex < 0 || brandIndex >= paintBrands.length) {
        brandIndex = readValidNumber('Select a brand (1, 2, or 3): ', 1) - 1;
    }

    return paintBrands[brandIndex];
}

function calculatePaintAndCost(area: number, coats: number, selectedBrand: { name: string, prices: { [key: number]: number } }): { brand: string, cost: number, cans: number[] } {
    
    //Initialise with high value
    let minCost = Number.MAX_VALUE; 


    let bestOption: { brand: string, cost: number, cans: number[] } = {
        brand: '',
        //cost: Number.MAX_VALUE,
        cost : 10,
        cans: []
    };

    // // Iterate through can sizes
    // let canSizes: number[] = [1, 2.5, 5, 10];
    // for (let canSize of canSizes) {
        
    //     //Price for the can size of chosen brand
    //     let canPrice = selectedBrand.prices[canSize]; 
    //     if (canPrice !== undefined) {

    //         let totalPaintNeeded = (area * coats) / canSize; 
    //         let totalCansNeeded = Math.ceil(totalPaintNeeded); //Rounds up

    //         let totalCost = totalCansNeeded * canPrice;

            
    //         if (totalCost < minCost) {
    //             minCost = totalCost; 

    //             bestOption.brand = selectedBrand.name; 
    //             bestOption.cost = totalCost; 
    //             bestOption.cans = [canSize]; 
    //         } else if (totalCost === minCost) {
    //             bestOption.cans.push(canSize); 
    //         }
    //     }
    // }

    return bestOption; 
}


main();
