export function handleDrag(i, data, e) {
  let js = JSON.stringify(data);
  e.dataTransfer.setData("index", js);
  e.dataTransfer.setData("i", i);
}

export function onDragOver(e) {
  e.preventDefault();
}
export function handleDrop(e) {
  let index = e.dataTransfer.getData("index");
  let data = JSON.parse(index);
  let i = e.dataTransfer.getData("i");
  this.addToList(i, data);
}
