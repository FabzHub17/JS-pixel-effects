//load event listener will make sure all the resources are loaded beforehand so there won't be any lagging
window.addEventListener('load',() =>{
    const canvas = document.getElementById('canvas-1');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const image1 = document.getElementById('image-1');

    class Particle{
        //blueprint to create individual particles
        constructor(){
            this.x = 200;
            this.y = 150;
            this.size = 100;
        }
        draw(){
            ctx.fillRect(this.x,this.y,this.size,this.size);
        }
    }

    class Effect{
        //handles all particles at the same time
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.particlesArray = [];
        }
        init(){
            this.particlesArray.push(new Particle());
        }
        draw(){
            this.particlesArray.forEach(particle =>{particle.draw()})
        }
    }

    const effect = new Effect(canvas.width,canvas.height);
    effect.init();
    effect.draw();
    console.log(effect);

    

    const animate = () =>{
        // animation loop to make everything animated and interactive

    }

   // ctx.fillRect(0,0,100,200); // draws rectagle using built in method
   // ctx.drawImage(image1,100,100,400,300);

}); 