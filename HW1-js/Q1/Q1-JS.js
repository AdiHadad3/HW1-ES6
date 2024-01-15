const counter1 = new counter();
class counter { 
    constructor() {
        this.value = 0;
    }
    Initialize() {
        this.value = document.querySelector("#txt").value;
    }
    Increment() {
        this.value++;
        document.querySelector("#txt").value = counter1.value;
    }
    Go() {
        let str = "";
        for (let i = 0; i <= this.value; i++) {
            str += " " + i;
        }
        document.querySelector("#p1").innerHTML = str;
    }
}


//when I have some elements to wait for them
window.addEventListener("load", () => {

    document.querySelector('#btnStart').addEventListener('click', () => counter1.Initialize());
    document.querySelector('#btnPlus').addEventListener('click', () => counter1.Increment());
    document.querySelector('#btnGo').addEventListener('click', () => counter1.Go());

});