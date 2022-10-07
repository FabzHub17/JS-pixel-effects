//load event listener will make sure all the resources are loaded beforehand so there won't be any lagging
window.addEventListener('load',() =>{
    const canvas = document.getElementById('canvas-1');
    const ctx = canvas.getContext('2d');

    class Particle{
        //blueprint to create individual particles
        constructor(){
            this.x = 0;
            this.y = 0;
            this.size = 3;
        }

    }

    class Effect{
        //handles all particles at the same time

    }

    const animate = () =>{
        // animation loop to make everything animated and interactive

    }

}); 