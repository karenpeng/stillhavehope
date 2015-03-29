function BinaryTree(value, position, left, right) {
  this.value = value;
  this.left = left || null;
  this.right = right || null;
  this.length = this.value.length;
  this.position = position || [0, 0];
}

BinaryTree.prototype.render = function (ctx) {
  //var w = can.width;
  //var ctx = can.getContext('2d');
  //ctx.translate(w/2,0);

  // ctx.fillText(this.value, this.position[0], this.position[1]);
  ctx.translate(this.position[0], this.position[1]);
  ctx.fillText(this.value, 0, 0);
  if (this.left && !this.right) {
    ctx.translate(0, 20);
    render(this.left);
  }
  if (this.left && this.right) {
    ctx.translate(0, 20);
    translate(-this.length / 2, 0);
    render(this.left);
    translate(this.length / 2, 0);
    render(this.right);
  }
}

BinaryTree.prototype.drawText = function () {

}

BinaryTree.prototype.setRight = function (right) {
  this.right = right;
}

BinaryTree.prototype.setValue = function (value) {
  this.value = value;
}

BinaryTree.prototype.setLeft = function (left) {
  this.left = left;
}

module.exports = BinaryTree;