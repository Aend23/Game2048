const Grid_Size = 4;
const Cell_Size = 20;
const Cell_Gap = 2;


export default class Grid{
    #cells
    constructor(gridElement){
        gridElement.style.setProperty('--grid-size',`${Grid_Size}`);
        gridElement.style.setProperty('--cell-size',`${Cell_Size}vmin`);
        gridElement.style.setProperty('--cell-gap',`${Cell_Gap}vmin`);
        this.#cells = createCellElements(gridElement).map((cellElement,index)=>{
            return new Cell(
                cellElement,
                (index % Grid_Size),
                Math.floor(index / Grid_Size))
        });
    }

    get cells(){
    return this.#cells;
    }

    get #emptyCells(){
        return  this.#cells.filter(cell => cell.tile == null)
    }
    randomEmptyCell(){
        const randomIdx = Math.floor(Math.random() * this.#emptyCells.length); 
        return this.#emptyCells[randomIdx]; 
    }

    get cellsByColumn(){
      return  this.#cells.reduce((cellGrid,cell)=>{
        cellGrid[cell.x] = cellGrid[cell.x] || [];
        cellGrid[cell.x][cell.y] = cell;
        return cellGrid;
      },[])
    }

    get cellsByRow(){
        return  this.#cells.reduce((cellGrid,cell)=>{
          cellGrid[cell.y] = cellGrid[cell.y] || [];
          cellGrid[cell.y][cell.x] = cell;
          return cellGrid;
        },[])
      }

}

class Cell{
    #cellElement
    #x 
    #y
    #tile
    #mergeTile 

    constructor(cellElement, x, y){
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }

    get tile(){
        return this.#tile;
    }
    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }

    get mergeTile(){
        return this.#mergeTile;
    }

    set mergeTile(value){
        this.#mergeTile = value;
        if(value == null) return;
        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }

    set tile(value){
        this.#tile =value;
        if(value == null) return;
        this.#tile.x = this.#x;
        // console.log(this.#x);console.log(this.#y);
        this.#tile.y = this.#y;
        // console.log(this.tile);
    }

    canAccept(tile){
        // console.log(tile);
        // console.log(tile.value);
        // console.log(this.tile);
        return(
             this.tile == null  ||
         (this.tile.value === tile.value && this.mergeTile == null)
         
         );
    }

    mergeTiles(){
        if(this.tile == null || this.mergeTile == null) return;
        this.tile.value = this.tile.value + this.mergeTile.value;
        this.mergeTile.remove();
        this.mergeTile = null;
    }

}


function createCellElements(gridElement){
    const cells=[];
    for(let i=0;i< Grid_Size * Grid_Size;i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        gridElement.append(cell);
    }
    return cells;
}