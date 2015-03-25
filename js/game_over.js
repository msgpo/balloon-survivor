 window.GameOver = function(){
   

            this.getHighScore = function(){
                var savedscore = getCookie("highscore");
                if(savedscore != ""){
                    var hs = parseInt(savedscore) || 0;
                    if(hs < BS.score)
                    {
                     hs = BS.score
                     setCookie("highscore", hs, 999);
                    }
                    return hs;
                  }
                  else
                  {                  
                    setCookie("highscore", BS.score, 999);
                    return  BS.score;
                  }
            }
            this.init = function(){
                        
                 
                var that = this;

                setTimeout(function() {
                    play_sound(soundDie);
                    that.brown = new Image();
                    that.brown.src = "images/brown.png";
                    that.gm = new Image();
                    that.gm.src = "images/gameover.png";
                    that.back = new Image();
                    that.back.src = "images/back.png";                    
                    that.replay = new Image();                    
                    that.replay.src = "images/replay.png";
                    that.highscore = that.getHighScore() ;
                }, 500);

                
            }
            
            this.update = function(){               
                if (BS.Input.tapped) {
                    var x = BS.Input.x;
                    var y = BS.Input.y;                  
                    if((x >= 70 && x <= 70+60) && (y >= 350 && y <= 350+60)){       
                        BS.changeState('Splash');
                    }

                    if((x >= 235 && x <= 235+57) && (y >= 350 && y <= 350+60)){       
                        BS.changeState('Menu');
                    }

                    BS.Input.tapped = false;
                }                
            }
            
            this.render = function(){
                if(this.brown){        
                    BS.Draw.Image(this.brown,45,120);
                    BS.Draw.Image(this.gm,55,120);
                    BS.Draw.Image(this.back,235,350);    
                    BS.Draw.Image(this.replay,70,350);
                    BS.Draw.text("Score :", 60, 200, 20, 'black');
                    BS.Draw.text("Best :", 60, 250, 20, 'black');                    
                    BS.Draw.text(BS.score, 220, 200, 20, 'black');
                    BS.Draw.text(this.highscore, 220, 250, 20, 'black');
                }

           }
        
        }
