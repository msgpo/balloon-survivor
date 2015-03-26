window.HighScore = function(){
				


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
                   

                play_sound(soundSwoosh);
                BS.distance = 0;
                BS.bg_grad = "day";
                BS.entities = [];
                BS.score = 0;
                BS.watch = 0;

                
                //Add entities
                BS.entities.push(new BS.Cloud(30, ~~ (Math.random() * BS.HEIGHT / 2)));
                BS.entities.push(new BS.Cloud(130, ~~ (Math.random() * BS.HEIGHT / 2)));
                BS.entities.push(new BS.Cloud(230, ~~ (Math.random() * BS.HEIGHT / 2)));
                BS.entities.push(new BS.Cloud(330, ~~ (Math.random() * BS.HEIGHT / 2)));
                BS.entities.push(new BS.Cloud(430, ~~ (Math.random() * BS.HEIGHT / 2)));      

                var that = this;

                setTimeout(function() {                    
                    that.brown = new Image();
                    that.brown.src = "images/brown.png";
                    that.back = new Image();
                    that.back.src = "images/back.png";                                        
                    that.highscore = that.getHighScore() ;
                }, 500);
                                
            }
            
            this.update = function(){  

            	for (i = 0; i < BS.entities.length; i += 1) {
                    BS.entities[i].update();                    
                }

                if (BS.Input.tapped) {
                    var x = BS.Input.x;
                    var y = BS.Input.y;                  
                    if((x >= 235 && x <= 235+57) && (y >= 350 && y <= 350+60)){       
                        BS.changeState('Menu');
                    }
                    BS.Input.tapped = false;
                }                
            }
            
            this.render = function(){

            	if(this.brown){        
                    BS.Draw.Image(this.brown,BS.WIDTH/2 -114.5,BS.HEIGHT/2 - 135);
                    BS.Draw.Image(this.back,235,350);                        	
                    BS.Draw.text("Best Score!", BS.WIDTH/2 -104.5, BS.HEIGHT/2 - 90, 30, 'black');                   
                    BS.Draw.text(this.highscore, BS.WIDTH/2 -54.5, BS.HEIGHT/2, 60, 'black');
                }
		}
}            