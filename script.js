//load event listener will make sure all the resources are loaded beforehand so there won't be any lagging
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas-1');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    class Particle {
        //blueprint to create individual particles
        constructor(effect, x, y, color) { // passing reference of object of class Effect to have access to width and height of canvas, its better preactise.
            this.effect = effect;
            this.x = Math.random() * this.effect.width; // random assigned x position on canvas for animation.
            this.y = Math.random() * this.effect.height; // random assigned y position on canvas for animation.
            this.originX = Math.floor(x); // original x position of particle on canvas ; math floor is used to round off the value.
            this.originY = Math.floor(y); // original y position of particle on canvas.
            this.color = color;
            this.size = this.effect.gap;
            this.velocityX = 0;
            this.velocityY = 0;
            this.ease = 0.02; // this value determines how fast the image reassembles itself. (slow== very low number)
        }
        draw(context) {
            context.fillStyle = this.color;  // assigns color to the particle.
            context.fillRect(this.x, this.y, this.size, this.size); // draws the particles as black squares, default color is black, this is a built in method.
        }
        update() {
            // this method defines movement of each particle.

            //calculating mouse curser distance from particle

            this.dx = this.effect.mouse.x - this.x; //distance x from particle
            this.dy = this.effect.mouse.y - this.y; // distance y from particle

            //this.distance = Math.sqrt(this.dx * this.dx + this.dy *this.dy) // pi theorem to calculate distance
            this.distance = this.dx * this.dx + this.dy * this.dy; // not using Math.sqrt since it is a very demanding operation,
            // instead we give the mouse radius, in effect class, a very high value.

            //----------------------------------------------

            

            this.x += (this.originX - this.x) * this.ease;
            this.y += (this.originY - this.y) * this.ease;
        }
        warp() {
            // to change random position of particles when btn is pressed
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.ease = 0.05;
        }
    }

    class Effect {
        //handles all particles at the same time
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image-1');

            this.canvasCenterX = this.width * 0.5; // horizontal middle point of canvas
            this.canvasCenterY = this.height * 0.5;
            this.imageCenterX = this.canvasCenterX - (this.image.width * 0.5); // horizontal center point of image in the canvas.
            this.imageCenterY = this.canvasCenterY - (this.image.height * 0.5);
            this.gap = 3; // num of pixels to skip to decrease resolution and save computer power.
            this.mouse = {
                radius:3000,
                x:undefined,
                y:undefined
            }
            window.addEventListener('mousemove', event =>{
                this.mouse.x = event.x; //assigns x coordinate of the mouse point
                this.mouse.y = event.y;

            });

        }
        init(context) {
            context.drawImage(this.image, this.imageCenterX, this.imageCenterY);
            const pixels = context.getImageData(0, 0, this.width, this.height).data; // analyses and gets data of image inside specified area.


            //nested for loop to loop the whole canvas.
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4;  // 4 is the number of elements in the array that make up one color for one pixel.
                    // index constant holds the index of the pixel.
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = "rgb(" + red + "," + green + "," + blue + ")";

                    if (alpha > 0) {
                        //if pixel is not transparent(i.e. > 0) then create a particle.
                        this.particlesArray.push(new Particle(this, x, y, color));
                    }
                }
            }

        }
        draw(context) {
            this.particlesArray.forEach(particle => { particle.draw(context) });
        }
        update() {
            this.particlesArray.forEach(particle => { particle.update() });
        }
        warp() {
            this.particlesArray.forEach(particle => { particle.warp() });
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);


    const animate = () => {
        // animation loop to make everything animated and interactive
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();

        requestAnimationFrame(animate); // passing the parent method will make the call in a loop, this is a built in function.
    }
    animate();

    // warp btn

    const warpBtn = document.getElementById('warpBtn');
    warpBtn.addEventListener('click', () => {
        effect.warp();
    });



}); 