let img1 = new Image();
class Duck {
    constructor(Name, color, age, weight, image) {
        this.name = Name;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.image = image;
    }

    show()//print detail on duck
    {
        document.querySelector("#details").innerHTML = `name: ${this.name}<br/>
        color: ${this.color}<br/>
        age: ${this.age}<br/>
        weight: ${this.weight}<br/>
        image: <img src="${this.image.src}" alt:"Duck img" width="200">`;
    }

    Quack() {
        const duckSound = document.querySelector('#duckSound');

        for (let i = 0; i < 3; i++)//make a sound
        {
            setTimeout(() => {
                duckSound.play();
            }, i*2500);
        }
        
        const times = (this.age * this.weight) / 2; //times of Quake
        let str = "";
        for (let i = 0; i < times; i++) {
            str += "Quack "
        }
        document.querySelector("#details").innerHTML = str;
    }
}

window.addEventListener("load", () => {
    
    document.querySelector("#show").style.display = "none";
    document.querySelector("#quack").style.display = "none";

    document.querySelector("#send").addEventListener('click', () => {

        document.querySelector("#send").style.display = "none";
        document.querySelector("#show").style.display = "block";
        document.querySelector("#quack").style.display = "block";
        const name1 = document.querySelector("#txt1").value;
        const color = document.querySelector("#txt2").value;
        const age = document.querySelector("#txt3").value;
        const weight = document.querySelector("#txt4").value;
        const imageInput = document.querySelector("#image1");
        const reader = new FileReader();
        reader.readAsDataURL(imageInput.files[0]);
        reader.onload = () => {
            const image = new Image();
            image.src = reader.result;
            duck1 = new Duck(name1, color, age, weight, image);
        }

    });

    document.querySelector(`#show`).addEventListener('click', () => duck1.show());
    document.querySelector(`#quack`).addEventListener('click', () => duck1.Quack());
});
