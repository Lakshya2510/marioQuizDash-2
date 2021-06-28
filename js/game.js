class Game {
  constructor() {
    this.answered = 0
    this.score = 0
    this.highScore = 0
  }

  start() {
    form = new Form();
  }

  play() {
    reset.visible = false;
    gameOver.visible = false;
    this.score = this.score + Math.round(getFrameRate() / 60);
    
    console.log(this.score)
    
    if (keyDown("space") && mario.y > 450) {
      mario.velocityY = -18;
      //jumpSound.play()
    }
    mario.velocityY = mario.velocityY + 0.7;
    mario.collide(invisibleGround);
    
    ground.velocityX = -10;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawn.clouds();
    spawn.obstacles();
    
    if (mario.isTouching(smallObstacleGroup)) {
      gameState = END;
      // mario.changeAnimation("marioCollided", mario_collided);
      //dieSound.play()
    }
    if (mario.isTouching(bigObstacleGroup)) {
      quizForm = new QuizForm();
      gameState = QUIZ;
      
    }
    /*
    if (score % 100 == 0 && score > 0) {
      //checkPointSound.play()
      ground.velocityX = ground.velocityX - 1;
    }
    */
   drawSprites();
   
   textSize(20);
   fill("Green")
   stroke(51)
   text("Score= " + this.score, 960, 65);
   textSize(20);
   fill("Green")
   stroke(51)
   text("Best= " + this.highScore, 1100, 65); 
  }
  
  quiz(){
    
    quizForm.display();
    if(quizForm.answer){
      if(quizForm.answer == quizForm.correctAnswer){
        congrats1Image;
        this.score+=100;
        quizForm.hide();
        gameState = PLAY;
        this.answered+=1;
      }
      else{
        gameState = END;
        quizForm.hide();
      }
      
    }
  }
  
  end() {
    mario.visible = false;
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
    smallObstacleGroup.setVelocityXEach(0);
    cloudsGroup.destroyEach();
    smallObstacleGroup.destroyEach();
    bigObstacleGroup.destroyEach();
    cloudsGroup.setLifetimeEach(-1);
    smallObstacleGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    reset.visible = true;
    if (mousePressedOver(reset)) {
      this.reset();
    }
    drawSprites();
  }
  
  reset() {
    gameState = PLAY;
    mario.visible = true;
    
    mario.y = 450;
    reset.visible = false;
    gameOver.visible = false;
    ground.velocityX = -10;
    smallObstacleGroup.destroyEach();
    cloudsGroup.destroyEach();
    mario.changeAnimation("running", mario_running);
    if (score > highScore) {
      this.highScore = score;
    }
    this.score = 0;
  }
}
