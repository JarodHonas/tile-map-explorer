/** @module Player
  * A class representing the player.
  */
export default class Player {
  /** @constructor
    * Constructs a new player instance
    * @param {float} x - the player's x position
    * @param {float} y - the player's y position
    */
  constructor(x, y, mapData) {
    this.x = x;
    this.y = y;
    this.xApproach = x;
    this.yApproach = y;
    this.sprite= new Image();
    this.sprite.src = "RightRun.png";
    this.direction = 0;
    this.map = mapData;
    //directions
    //right = 0
    //up = 1
    //left = 2
    //down = 3
    this.frame = 0;
    this.frameCount = 333;
  }

  /** @method update
    * Updates the player
    * @param {double} deltaT - the elapsed time
    * @param {Input} input - the input object
    */
  update(deltaT, input) {
    if(input.keyDown("ArrowLeft")) {
      if(this.map[(this.x -1) + (this.y)*32] == 1) return;
      this.x--;
      this.direction = 2;
    } 
    if(input.keyDown("ArrowRight")) 
    {
      if(this.map[(this.x +1) + (this.y)*32] == 1) return;
      this.x++;
      this.direction = 0;
    }
    if(input.keyDown("ArrowUp")) 
    {
      if(this.map[(this.x) + (this.y-1)*32] == 1) return;
      this.y--;
      this.direction = 1;
    }
    if(input.keyDown("ArrowDown")) 
    {
      if(this.map[(this.x) + (this.y+1)*32] == 1) return;
      this.y++;
      this.direction = 3;
    }
    if(Math.abs(this.xApproach - this.x) > .1) this.xApproach += .1 * Math.sign(this.x - this.xApproach);
    if(Math.abs(this.yApproach - this.y) > .1) this.yApproach += .1 * Math.sign(this.y - this.yApproach);
    this.frameCount -= deltaT;
    if(this.frameCount<0)
    {
      this.frameCount = 100;
      this.frame++;
      if(this.frame >2)this.frame = 0;
    }
    //if(Math.abs(this.xApproach - this.x < .1 && this.yApproach - this.y) < .1) this.frame = 0;
  }

  /** @method render
    * Renders the player
    * @param {double} deltaT - elapsed time
    * @param {Context2D} context - the rendering context
    */
  render(deltaT, context) {
    if(this.direction == 0) this.sprite.src = "RightRun.png";
    else if(this.direction == 1) this.sprite.src = "UpRun.png";
    else if (this.direction == 2) this.sprite.src = "LeftRun.png";
    else this.sprite.src = "DownRun.png";
    context.drawImage(this.sprite,this.frame*32,0,32,32,this.xApproach*32, this.yApproach*32,32,32);//sprite, scrX, srcY, width, height, xPos, yPos, width, height
    
  }

}
