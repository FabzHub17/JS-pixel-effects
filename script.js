//load event listener will make sure all the resources are loaded beforehand so there won't be any lagging
window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas-1');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


    class Particle {
        //blueprint to create individual particles
        constructor(effect) { // passing reference of object of class Effect to have access to width and height of canvas, its better preactise.
            this.effect = effect;
            this.x = Math.random() * this.effect.width; // x position on canvas
            this.y = Math.random() * this.effect.height; // y position on canvas
            this.size = 5;
            this.velocityX = Math.random() * 2 -1;
            this.velocityY = Math.random() * 2 -1;
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

        }
        init(context) {
            // for (let i = 0; i < 100; i++) {
            //     this.particlesArray.push(new Particle(this)); //we pass the reference to class effect but since we are already inside of it, we use 'this'.
            // }
            context.drawImage(this.image,this.imageCenterX,this.imageCenterY);
            const particles = context.getImageData(0,0,this.width,this.height); // analyses and gets data of image inside specified area.
            console.log(particles);


        }
        draw(context) {
            this.particlesArray.forEach(particle => { particle.draw(context) });
            context.drawImage(this.image, this.imageCenterX, this.imageCenterY);
        }
        update() {
            this.particlesArray.forEach(particle => { particle.update()});
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    



    const animate = () => {
        // animation loop to make everything animated and interactive
        ctx.clearRect(0,0,canvas.width,canvas.height);
        effect.draw(ctx);
        effect.update();

        requestAnimationFrame(animate); // passing the parent method will make the call in a loop, this is a built in function.
    }
    //animate();
    

    // ctx.fillRect(0,0,100,200); // draws rectagle using built in method
    // ctx.drawImage(image1,100,100,400,300);

}); 