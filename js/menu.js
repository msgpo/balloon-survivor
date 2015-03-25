window.Menu = function(){
                        
            this.balg = new Image();
            this.balg.src = "images/bal_g.png";
            this.balsur = new Image();
            this.balsur.src = "images/bal_sur.png";
            this.play = new Image();
            this.play.src = "images/play.png";
            this.score = new Image();
            this.score.src = "images/score.png";
            this.credits = new Image();
            this.credits.src = "images/credits.png";
            this.ins = new Image();
            this.ins.src = "images/instructions.png";
            //play_sound(soundPlay);
            
            this.init = function(){

                
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
                    
                    if((x >= BS.WIDTH/2-51.5 && x <= BS.WIDTH/2-51.5+103) && (y >= 250 && y <= 250+30)){       
                        BS.changeState('Splash');
                    }
                    if((x >= BS.WIDTH/2-58 && x <= BS.WIDTH/2-58+116) && (y >= 300 && y <= 300+30)){       
                        BS.changeState('HighScore');
                    }

                    if((x >= BS.WIDTH/2-59.5 && x <= BS.WIDTH/2-59.5+119) && (y >= 350 && y <= 350+30)){       
                        BS.changeState('Credits');
                    }
                    if((x >= BS.WIDTH/2-157 && x <= BS.WIDTH/2-157+314) && (y >= 400 && y <= 400+30)){       
                        BS.changeState('Instruction');
                    }               
                    BS.Input.tapped = false;
                }
            }
            
            this.render = function(){


                //BS.Draw.Image(this.balg,5,60);
                BS.Draw.Image(this.balsur,BS.WIDTH/2-140,90);
                BS.Draw.Image(this.play,BS.WIDTH/2-51.5,250);
                BS.Draw.Image(this.score,BS.WIDTH/2-58,300);
                BS.Draw.Image(this.credits,BS.WIDTH/2-59.5,350);
                BS.Draw.Image(this.ins,BS.WIDTH/2-157,400);
            }
        
        }