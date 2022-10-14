//load event listener will make sure all the resources are loaded beforehand so there won't be any lagging
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas-1');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    class Particle {
        //blueprint to create individual particles
        constructor(effect,x,y,color) { // passing reference of object of class Effect to have access to width and height of canvas, its better preactise.
            this.effect = effect;
            this.x = Math.random() * this.effect.width; // random assigned x position on canvas for animation.
            this.y = Math.random() * this.effect.height; // random assigned y position on canvas for animation.
            this.originX = Math.floor(x); // original x position of particle on canvas ; math floor is used to round off the value.
            this.originY = Math.floor(y); // original y position of particle on canvas.
            this.color = color;
            this.size = 5;
            this.velocityX = Math.random() * 2 - 1;
            this.velocityY = Math.random() * 2 - 1;
        }
        draw(context) {
            context.fillRect(this.x, this.y, this.size, this.size); // draws the particles as black squares, default color is black
        }
        update() {
            // this method defines movement of each particle.
            this.x += this.velocityX;
            this.y += this.velocityY;
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
            this.imageCenterX = this.canvasCenterX - (this.image.width * 0.5); // horizontal center point of image in the canvas
            this.imageCenterY = this.canvasCenterY - (this.image.height * 0.5);
            this.gap = 5; // num of pixels to skip to decrease resolution and save computer power.

        }
        init(context) {
            // for (let i = 0; i < 100; i++) {
            //     this.particlesArray.push(new Particle(this)); //we pass the reference to class effect but since we are already inside of it, we use 'this'.
            // }
            context.drawImage(this.image, this.imageCenterX, this.imageCenterY);
            const pixels = context.getImageData(0, 0, this.width, this.height).data; // analyses and gets data of image inside specified area.
            //nested for loop to loop the whole canvas.
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4;  // 4 is the number of elements in the array that make up one color for one pixel
                    // index constant holds the index of the pixel 
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = "rgb(" + red + "," + green + "," + blue + ")" ;

                    if(alpha > 0){
                        //if pixel is not transparent(i.e. > 0) then create a particle
                        this.particlesArray.push(new Particle());
                    }

                }
            }

        }
        draw(context) {
            this.particlesArray.forEach(particle => { particle.draw(context) });
            context.drawImage(this.image, this.imageCenterX, this.imageCenterY);
        }
        update() {
            this.particlesArray.forEach(particle => { particle.update() });
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
    //animate();


    // ctx.fillRect(0,0,100,200); // draws rectagle using built in method
    // ctx.drawImage(image1,100,100,400,300);

}); 