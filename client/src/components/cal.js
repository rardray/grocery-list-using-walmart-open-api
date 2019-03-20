let years = [];
for (let i = 0; i < 16; i++) {
  years[i] = [];
  for (let k = 0; k < 12; k++) {
    years[i][k] = [];
    let len = 0;
    if (k === 1 && i % 4 === 1) {
      len = 36;
    } else if (k === 1) {
      len = 35;
    } else if (k === 3 || k === 5 || k === 8 || k === 10) {
      len = 37;
    } else {
      len = 38;
    }
    for (let j = 0; j < len; j++) {
      if (j < 7) {
        years[i][k][j] = "";
      } else {
        years[i][k][j] = j - 6;
      }
    }
  }
}
var flattened = years.flat(2);
flattened.splice(0, 5);

var i,
  j,
  temp,
  chunk = 7;
var newArr = [];
for (i = 0; i < flattened.length; i += chunk) {
  temp = flattened.slice(i, i + chunk);
  newArr[i] = temp;
}
const AnewArr = newArr.filter(el => {
  return el !== undefined;
});

AnewArr.forEach((el, i) => {
  if (el.includes(1)) {
    let j = 0;
    return el.unshift([(j += 1)]);
  }
});

let mons = [];
let yrs = [];
for (let i = 0; i < 12; i++) {
  mons[i] = i;
  for (let k = 0; k < 16; k++) {
    yrs[k] = mons;
  }
}
const index = yrs.flat();
let n = -1;
let hYear = 2018;
for (let i = 0; i < AnewArr.length; i++) {
  if (AnewArr[i].length === 8) {
    n += 1;
    AnewArr[i][0] = [index[n], hYear];
    if (AnewArr[i][0][0] === 0) {
      hYear += 1;
      AnewArr[i][0] = [index[n], hYear];
    }
  }
}
let fill = [];
for (let r = 0; r < AnewArr.length; r++) {
  if (AnewArr[r].length === 8) {
    fill = AnewArr[r][0];
  }
  if (AnewArr[r].length === 7) {
    AnewArr[r].unshift(fill);
  }
}

var calander = AnewArr;

export default calander;
