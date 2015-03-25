window.Play = function(){
            
            bal_x = 0;
            bal_y = 0;
            BS.watch = 0;
            
            this.init = function(){             
                
                this.img1 = new Image();
                this.img1.src = 'images/balloon.png';                                    
                this.img1.type = 'Balloon';                
                bal_x = (BS.WIDTH * 0.75)/2;
                bal_y = BS.HEIGHT/2+BS.HEIGHT/3;
                       
                BS.pipe = new BS.Pipe(0, 50);
                BS.entities.push(BS.pipe);
               // BS.pipe2 = new BS.Pipe2(0, 50);
               // BS.entities.push(BS.pipe2);               

                BS.watch = navigator.accelerometer.watchAcceleration(this.success, this.failure, {frequency: 30});
            
            }

            this.success = function(accel){

                bal_x += -1 * (accel.x * 2);
                    
                if (bal_x < 0){
                   bal_x = 0;
                }
                if (bal_x > (BS.WIDTH * 0.77)){
                   bal_x = BS.WIDTH * 0.77;
                }
               
            }
                
            this.failure = function(){
                alert("Error.");
            }
            
            this.update = function() { 

                distance = true;

                BS.distance ++;
                var levelUp = ((BS.distance % 2048) === 0) ? true : false;
                if (levelUp) {
                    var bg = "day";
                    var gradients = ["day", "dusk", "night", "dawn"];
                    for (var j = 0; j < gradients.length; j++) {
                        if (BS.bg_grad === gradients[j]) {
                            if (j == gradients.length - 1) {
                                bg = "day";
                            } else {
                                bg = gradients[j + 1];
                            }
                        }
                    }
                    console.log("otin");
                    BS.bg_grad = bg;
                    //BS.pipe.vy++;
                   // BS.pipe2.vy++;
                    
              }
            
               // cycle through all entities and update as necessary
                for (i = 0; i < BS.entities.length; i++) {                    
                    BS.entities[i].update();                    
                    
                                       
                    if (BS.entities[i].type === 'pipe' ) {                     

                        console.log("otin");

                        //ballon's coordinate
                        var bx = bal_x; 
                        var by = bal_y;
                                             
                        var lpx1 = 0;
                        var lpx2 = BS.entities[i].x - 75;
                        var bal_h = bal_y - 58;
                        var bal_w = bal_x + 74; 
                               
                        var rpx1 = BS.entities[i].x + 75 ;                                    
                        var py = BS.entities[i].y;
                        var ph = BS.entities[i].y + BS.entities[i].h;                                    
                                                                       
                        var c3 = (bx >= lpx2)                        
                        var c4 = (py < bal_h )
                        var c5 = (bal_w <= rpx1)
                        var c6 = (by >= ph)

                        

                        //evasio
                        if (c3 && c5) {
                            return true;
                        }                        
                        else if (c4 && c6){
                            return true;
                        }
                        //colission                        
                        else {                        
                            play_sound(soundHit);                            
                            BS.changeState('GameOver');
                            break; 
                        }
                    }                                                                                                       
                }
            }      
        
            
            this.render = function() { 
                
                BS.Draw.Image(this.img1, bal_x, bal_y);
                
            }
        
        }