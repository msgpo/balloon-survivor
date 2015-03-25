 window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
            };
        })();
         //sounds        
        var soundPlay = new Audio("sound/Ako_ay_may_Lobo.ogg");
        var soundJump = new Audio("sound/wing.ogg");
        var soundScore = new Audio("sound/point.ogg");
        var soundHit = new Audio("sound/hit.ogg");
        var soundDie = new Audio("sound/die.ogg");
        var soundSwoosh = new Audio("sound/swooshing.ogg");
         //http://www.storiesinflight.com/html5/audio.html
        var channel_max = 10; // number of channels
        audiochannels = new Array();
        for (a = 0; a < channel_max; a++) { // prepare the channels
            audiochannels[a] = new Array();
            audiochannels[a]['channel'] = new Audio(); // create a new audio object
            audiochannels[a]['finished'] = -1; // expected end time for this channel
        }

        function play_sound(s) {
            for (a = 0; a < audiochannels.length; a++) {
                thistime = new Date();
                if (audiochannels[a]['finished'] < thistime.getTime()) { // is this channel finished?
                    audiochannels[a]['finished'] = thistime.getTime() + s.duration * 1000;
                    audiochannels[a]['channel'].src = s.src;
                    audiochannels[a]['channel'].load();
                    audiochannels[a]['channel'].play();
                    break;
                }
            }
        }
        
        function getCookie(cname)
        {
           var name = cname + "=";
           var ca = document.cookie.split(';');
           for(var i=0; i<ca.length; i++) 
           {
              var c = ca[i].trim();
              if (c.indexOf(name)==0) return c.substring(name.length,c.length);
           }
           return "";
        }

        function setCookie(cname,cvalue,exdays)
        {
           var d = new Date();
           d.setTime(d.getTime()+(exdays*24*60*60*1000));
           var expires = "expires="+d.toGMTString();
           document.cookie = cname + "=" + cvalue + "; " + expires;
        }

         // namespace our game
        var BS = {
            // set up some inital values
            WIDTH: window.innerWidth,
            HEIGHT: window.innerHeight,
            scale: 1,
            // the position of the canvas
            // in relation to the screen
            offset: {
                top: 0,
                left: 0
            },
            // store all Balloon, touches, pipes etc
            entities: [],
            currentWidth: null,
            currentHeight: null,
            canvas: null,
            ctx: null,
            score: 0,
            distance: 0,
            digits:[],
            fonts:[],
            // we'll set the rest of these
            // in the init function
            RATIO: null,
            bg_grad: "day",
            game: null,
            currentWidth: null,
            currentHeight: null,
            canvas: null,
            ctx: null,
            ua: null,
            android: null,
            ios: null,
            gradients: {},
            img1: null,
            watch: 0,
            init: function () {
                var grad;
                // the proportion of width to height
                BS.RATIO = BS.WIDTH / BS.HEIGHT;
                // these will change when the screen is resize
                BS.currentWidth = BS.WIDTH;
                BS.currentHeight = BS.HEIGHT;
                // this is our canvas element
                BS.canvas = document.getElementsByTagName('canvas')[0];
                // it's important to set this
                // otherwise the browser will
                // default to 320x200
                BS.canvas.width = BS.WIDTH;
                BS.canvas.height = BS.HEIGHT;
                // the canvas context allows us to 
                // interact with the canvas api
                BS.ctx = BS.canvas.getContext('2d');
                // we need to sniff out android & ios
                // so we can hide the address bar in
                // our resize function
                BS.ua = navigator.userAgent.toLowerCase();
                BS.android = BS.ua.indexOf('android') > -1 ? true : false;
                BS.ios = (BS.ua.indexOf('iphone') > -1 || BS.ua.indexOf('ipad') > -1) ? true : false;

                // setup some gradients
                grad = BS.ctx.createLinearGradient(0, 0, 0, BS.HEIGHT);
                grad.addColorStop(0, '#036');
                grad.addColorStop(0.5, '#69a');
                grad.addColorStop(1, 'yellow');
                BS.gradients.dawn = grad;

                grad = BS.ctx.createLinearGradient(0, 0, 0, BS.HEIGHT);
                grad.addColorStop(0, '#69a');
                grad.addColorStop(0.5, '#9cd');
                grad.addColorStop(1, '#fff');
                BS.gradients.day = grad;

                grad = BS.ctx.createLinearGradient(0, 0, 0, BS.HEIGHT);
                grad.addColorStop(0, '#036');
                grad.addColorStop(0.3, '#69a');
                grad.addColorStop(1, 'pink');
                BS.gradients.dusk = grad;

                grad = BS.ctx.createLinearGradient(0, 0, 0, BS.HEIGHT);
                grad.addColorStop(0, '#036');
                grad.addColorStop(1, 'black');
                BS.gradients.night = grad;

                // listen for clicks
                window.addEventListener('click', function (e) {
                    e.preventDefault();
                    BS.Input.set(e);
                }, false);

                // listen for touches
                window.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    // the event object has an array
                    // called touches, we just want
                    // the first touch
                    BS.Input.set(e.touches[0]);
                }, false);
                window.addEventListener('touchmove', function (e) {
                    // we're not interested in this
                    // but prevent default behaviour
                    // so the screen doesn't scroll
                    // or zoom
                    e.preventDefault();
                }, false);
                window.addEventListener('touchend', function (e) {
                    // as above
                    e.preventDefault();
                }, false);

                // we're ready to resize
                BS.resize();
                BS.changeState("Menu");
                
                BS.loop();

            },

            resize: function () {

                BS.currentHeight = window.innerHeight;
                // resize the width in proportion
                // to the new height
                BS.currentWidth = BS.currentHeight * BS.RATIO;

                // this will create some extra space on the
                // page, allowing us to scroll pass
                // the address bar, and thus hide it.
                if (BS.android || BS.ios) {
                    document.body.style.height = (window.innerHeight) + 'px';
                }

                // set the new canvas style width & height
                // note: our canvas is still 320x480 but
                // we're essentially scaling it with CSS
                BS.canvas.style.width = BS.currentWidth + 'px';
                BS.canvas.style.height = BS.currentHeight + 'px';

                // the amount by which the css resized canvas
                // is different to the actual (480x320) size.
                BS.scale = BS.currentWidth / BS.WIDTH;
                // position of canvas in relation to
                // the screen
                BS.offset.top = BS.canvas.offsetTop;
                BS.offset.left = BS.canvas.offsetLeft;

                // we use a timeout here as some mobile
                // browsers won't scroll if there is not
                // a small delay
                window.setTimeout(function () {
                    window.scrollTo(0, 1);
                }, 1);
            },
                        
            // this is where all entities will be moved
            // and checked for collisions etc
            update: function () {
                BS.game.update();
                BS.Input.tapped = false;
            },

            // this is where we draw all the entities
            render: function () {

                BS.Draw.rect(0, 0, BS.WIDTH, BS.HEIGHT, BS.gradients[BS.bg_grad]);
                 
                // cycle through all entities and render to canvas
                for (i = 0; i < BS.entities.length; i += 1) {
                    BS.entities[i].render();
                }
                    
                BS.game.render();
                
            },

            // the actual loop
            // requests animation frame
            // then proceeds to update
            // and render
            loop: function () {

                requestAnimFrame(BS.loop);

                BS.update();
                BS.render();
            },
            changeState: function(state) {                   
                BS.game = new window[state]();
                BS.game.init();
            }
        };

         // abstracts various canvas operations into
         // standalone functions
        BS.Draw = {

            clear: function () {
                BS.ctx.clearRect(0, 0, BS.WIDTH, BS.HEIGHT);
            },

            rect: function (x, y, w, h, col) {
                BS.ctx.fillStyle = col;
                BS.ctx.fillRect(x, y, w, h);
            },
            circle: function (x, y, r, col) {
                BS.ctx.fillStyle = col;
                BS.ctx.beginPath();
                BS.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
                BS.ctx.closePath();
                BS.ctx.fill();
            },
            Image: function(img,x,y){                
                BS.ctx.drawImage(img,x,y);
            },
            Sprite: function (img, srcX, srcY, srcW, srcH, destX, destY, destW, destH, r) {
                BS.ctx.save();
                BS.ctx.translate(destX, destY);
                BS.ctx.rotate(r * (Math.PI / 180));
                BS.ctx.translate(-(destX + destW / 2), -(destY + destH / 2));
                BS.ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
                BS.ctx.restore();
            },
            semiCircle: function (x, y, r, col) {
                BS.ctx.fillStyle = col;
                BS.ctx.beginPath();
                BS.ctx.arc(x, y, r, 0, Math.PI, false);
                BS.ctx.closePath();
                BS.ctx.fill();
            },

            text: function (string, x, y, size, col) {
                BS.ctx.font = 'bold ' + size + 'px Monospace';
                BS.ctx.fillStyle = col;
                BS.ctx.fillText(string, x, y);
            }

        };

        BS.Input = {

            x: 0,
            y: 0,
            tapped: false,

            set: function (data) {
                this.x = (data.pageX - BS.offset.left) / BS.scale;
                this.y = (data.pageY - BS.offset.top) / BS.scale;
                this.tapped = true;

            }

        };

        
        window.addEventListener('load', BS.init, false);
        window.addEventListener('resize', BS.resize, false);


 