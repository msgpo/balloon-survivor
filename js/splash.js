window.Splash = function(){
            
            this.banner = new Image();
            this.banner.src = "images/splash.png";
            
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
                    BS.changeState('Play');
                    BS.Input.tapped = false;
                }
            }
            
            this.render = function(){
                BS.Draw.Image(this.banner,(BS.WIDTH/6),(BS.HEIGHT/2)-(BS.HEIGHT/4));
            }
        
        }