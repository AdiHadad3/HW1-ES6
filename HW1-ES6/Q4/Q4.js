class Point {
    //Q1
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        const str = `(${this.x},${this.y})`;
        console.log(str);
        return str;
    }
    Equals(p) {
        if (this.x == p.x && this.y == p.y)
            return true;
        return false;
    }
}

const check1 = (arrP,x,y)=>
{
    return arrP.some(pCheck => pCheck.x == x && pCheck.y == y);
}

const check2 = (arrP, p) => {
    return answer = arrP.some(pCheck => pCheck.Equals(p))
}

const calculateR = (arrP) => {
    let dist = 0;
    for (let i = 0; i < arrP.length-1; i++) {
        dist += Math.sqrt((arrP[i].x - arrP[i+1].x) ** 2 + (arrP[i].y - arrP[i+1].y) ** 2);
    }
    return dist;
}


window.addEventListener('load', () => {
    //Q2
    const arr = [];
    const p1 = new Point(1, 3);
    const p2 = new Point(1, 4);
    const p3 = new Point(2,3);
    const p4 = new Point(5,2);
    arr.push(p1,p2,p3,p4);
    const a=check1(arr,1,3);
    const b=check1(arr,1, 2);
    console.log(a);
    console.log(b);

    //Q3
    const checkP1 = new Point(1, 4);
    const checkP2 = new Point(1, -4);
    const c = check2(arr, checkP1);
    const d = check2(arr, checkP2);
    console.log(c);
    console.log(d);

    //Q4
    const details = document.querySelector("#details");
    let str = `<p>points:</p>`;
    arr.forEach(p => {
        str+=`<p>${p.show()}</p>`
    })
    str += `distance: ${calculateR(arr)}`;
    details.innerHTML = str;
})
