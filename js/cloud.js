
BS.Cloud = function (x, y) {

            this.x = x;
            this.y = y;
            this.h = BS.HEIGHT;
            this.r = 20;
            this.col = 'rgba(255,255,255,1)';
            this.type = 'cloud';
            // random values so particles do not
            // travel at the same speeds
            this.vy = 0.20;

            this.remove = false;

            this.update = function () {

                // update coordinates
                this.y += this.vy;
                if (this.y > (this.h)) {
                    this.respawn();
                }

            };


            this.render = function () {

                BS.Draw.circle(this.x + this.r, (this.y + this.r), this.r, this.col);
                BS.Draw.circle(this.x + 55, (this.y + this.r / 2), this.r / 0.88, this.col);
                BS.Draw.circle(this.x + 55, (this.y + this.r + 15), this.r, this.col);
                BS.Draw.circle(this.x + 85, (this.y + this.r), this.r, this.col);


            };

            this.respawn = function () {
                this.y = 0;
                this.x = ~~ (Math.random() * BS.WIDTH / 2)


            };

        };