window.Credits = function(){
		
		this.brown = new Image();
		this.brown.src = "images/brown.png";
		this.back = new Image();
		this.back.src = "images/back.png";


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
                
                    BS.Draw.Image(this.brown,BS.WIDTH/2 -114.5,BS.HEIGHT/2 - 135);
                    BS.Draw.Image(this.back,235,350);                        
                    BS.Draw.text("Programmers:",BS.WIDTH/2 -109.5, BS.HEIGHT/2-100, 30, 'black');
                    BS.Draw.text("Harold",BS.WIDTH/2 -99.5,BS.HEIGHT/2-70, 30, 'black');
                    BS.Draw.text("Nicko", BS.WIDTH/2 -99.5,BS.HEIGHT/2-40, 30, 'black');
                    BS.Draw.text("Clyde", BS.WIDTH/2 -99.5,BS.HEIGHT/2-10, 30, 'black');
                    BS.Draw.text("CSC 193 Project", BS.WIDTH/2 -109.5,BS.HEIGHT/2+30, 20, 'black');
                    BS.Draw.text("A.Y. 2014-2015", BS.WIDTH/2 -109.5,BS.HEIGHT/2+60, 20, 'black');
                    BS.Draw.text("version 1.0", BS.WIDTH/2 -109.5,BS.HEIGHT/2+90, 20, 'black');
                
            }

}            