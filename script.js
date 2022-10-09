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
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.size = 100;
        }
        draw(context) {
            context.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    class Effect {
        //handles all particles at the same time
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image-1');
        }
        init() {
            for (let i = 0; i < 10; i++) {
                this.particlesArray.push(new Particle(this)); //we pass the reference to class effect but since we are already inside of it, we use 'this'.
            }
        }
        draw(context) {
            this.particlesArray.forEach(particle => { particle.draw(context) })
            context.drawImage(this.image, 0, 0);

        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init();
    effect.draw(ctx);
    console.log(effect);



    const animate = () => {
        // animation loop to make everything animated and interactive

    }

    // ctx.fillRect(0,0,100,200); // draws rectagle using built in method
    // ctx.drawImage(image1,100,100,400,300);

}); 