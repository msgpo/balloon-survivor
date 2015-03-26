BS.Pipe = function (y, h) {

            this.y = y;
            this.w = BS.WIDTH;
            this.h = h;
            this.vy = 2;
            this.type = 'pipe';

            for(var n=0;n<10;n++){
                var img = new Image();
                img.src = "images/font_small_" + n +'.png';
                BS.fonts.push(img);
            }
            BS.digits = ["0"]; 


            this.update = function () {
                // update coordinates
                this.y += this.vy;
                if (this.y > BS.HEIGHT) {
                    this.respawn();
                    BS.score ++;
                    this.vy +=0.5;                               
                    BS.digits = BS.score.toString().split('');                    
                    play_sound(soundScore);
                }
            };

            this.render = function () {

                //score             
                var X = (BS.WIDTH/2-(BS.digits.length*14)/2);               
                for(var i = 0; i < BS.digits.length; i++)   
                {
                  BS.Draw.Image(BS.fonts[Number(BS.digits[i])],X+(i*14),10);
                }               
              
                BS.Draw.rect(0, this.y, this.x - 75, this.h, '#D2691E');
                BS.Draw.rect(this.x + 75, this.y, this.w - this.x, this.h , '#D2691E');                
            }

            this.respawn = function () {
                this.x = this.randomIntFromInterval(70, 300);
                this.y = 0;
                
            }

            this.randomIntFromInterval = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            this.x = this.randomIntFromInterval(70, 300);
        }

/*BS.Pipe2 = function (y, h) {
            
            this.y = BS.HEIGHT/2;
            //this.coin = true;
            this.w = BS.WIDTH;
            this.h = h;
            this.vy = 1;
            this.type = 'pipe2';


            for(var n=0;n<10;n++){
                var img = new Image();
                img.src = "images/font_small_" + n +'.png';
                BS.fonts.push(img);
            }
            BS.digits = ["0"]; 


            this.update = function () {
                // update coordinates
                this.y += this.vy;
                if (this.y > BS.HEIGHT) {
                    this.respawn();                
                    BS.score ++;
                    this.vy +=0.5;                                
                    BS.digits = BS.score.toString().split('');                    
                    play_sound(soundScore);

                }
            };

            this.render = function () {

               
                BS.Draw.rect(0, this.y, this.x - 75, this.h, '#D2691E');
                BS.Draw.rect(this.x + 75, this.y, this.w - this.x, this.h , '#D2691E'); 

                //score             
                var X = (BS.WIDTH/2-(BS.digits.length*14)/2);               
                for(var i = 0; i < BS.digits.length; i++)   
                {
                  BS.Draw.Image(BS.fonts[Number(BS.digits[i])],X+(i*14),10);
                }               
            }

            this.respawn = function () {
                this.x = this.randomIntFromInterval(70, 300);
                this.y = 0;              
                //this.coin = true;
            }

            this.randomIntFromInterval = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            this.x = this.randomIntFromInterval(70, 300);
        }*/
