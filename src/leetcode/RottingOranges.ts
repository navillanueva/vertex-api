function orangesRotting(grid: number[][]): number {

    // example input
    // grid = [[2,1,1],[1,1,0],[0,1,1]]

    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
        [0, 1],  // Right
        [1, 0],  // Down
        [0, -1], // Left
        [-1, 0]  // Up
    ];

    const queue: [number, number][] = []; // setting up BFS
    let freshCount = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]); // Add rotten orange to the queue
            } else if (grid[r][c] === 1) {
                freshCount++; // Count fresh oranges
            }
        }
    }

    if (freshCount === 0) return 0;

    let minutes = 0;

    while (queue.length > 0) {
        const size = queue.length; // number of rotten oranges to process this minute
        let hasNewRotten = false;

        for(let i=0; i<size; i++){
            // we load the row and column of the rotten tomato
            const [r, c] = queue.shift()!;


            for (const [dr, dc] of directions) {
                const newR = r + dr;
                const newC = c + dc;

                if (newR < 0 || newC < 0 || newR >= rows || newC >= cols || grid[newR][newC] !== 1) {
                    continue;
                }

                grid[newR][newC] = 2; // Mark the orange as rotten
                queue.push([newR, newC]);
                freshCount--;
                hasNewRotten = true;
            }
        }



    }



};