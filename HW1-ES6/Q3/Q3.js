const arr5 = [];
class Clock {
    constructor(hours, minutes, seconds, Cname) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.Cname = Cname; 
    }
    
    ConverToSeconds()//return in seconds view
    {
        const sec = this.hours * 3600 + this.minutes * 60 + this.seconds;
        return sec;
    }

    Show() //return the hour format
    {
        const arr = [this.hours, this.minutes, this.seconds];
        const newArr = arr.map(i => {
            if (i < 10)
                return "0" + i;
            else return i;
        })
        const format = newArr.join(":");
        return format;
    }
}


window.addEventListener('load', () => {
    document.querySelector("#btn").addEventListener('click', () => {
        const h = document.querySelector("#hour").value;
        const m = document.querySelector("#minute").value;
        const s = document.querySelector("#sec").value;
        const c = document.querySelector("#country").value;
        const clock1 = new Clock(h, m, s, c);
        arr5.push(clock1);//new clock to array
        if (arr5.length == 5)//get to 5 items, so print
        {
            let str = "";
            arr5.forEach((c) => {
                str += `<p>contry: ${c.Cname}, hour: ${c.Show()}, in seconds: ${c.ConverToSeconds()}</p>`;
            })
            document.querySelector("#details").innerHTML = str;
        }
    })
    
})