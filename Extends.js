/**
 * (父类“动物”)
 * 原型链的作用：避免函数重复声明，减少空间占用，节省内存
 */

function Animal(type, food) {
  this.type = type;
  this.food = food;
}

Animal.prototype.say = function() {
  console.log("Hello, My type is", this.type);
};

Animal.prototype.eat = function() {
  console.log("I eating", this.food);
};

Animal.prototype.feature = function() {
  console.log("I have a head");
};

/**
 * (子类“狗🐕”)
 * 原型链继承
 * 缺点: 无法向父类构造函数传参
 *       不支持多继承
 *       所有新实例都会共享父类的实例属性
 */
let Dog = function(color) {
  this.voice = "汪汪";
  this.color = color;
};
Dog.prototype = new Animal("dog", "bone");
Dog.prototype.myVoice = function() {
  console.log("my voice is", this.voice);
};
Dog.prototype.myColor = function() {
  console.log("my color is", this.color);
};
let dog = new Dog("gray with white");
console.log(dog.type);
dog.myColor();

/**
 * (子类“猫🐱”)
 * 构造继承
 * 优点: 只继承父类构造属性，无继承父类原型属性
 *       可以多继承
 *       可向父类传参
 * 缺点: 只能继承父类构造函数属性
 *       无法实现构造函数的复用
 *       每个实例都有父类构造函数的副本
 */
let Cat = function(color) {
  Animal.call(this, "cat", "fish");
  this.color = color;
};
Cat.prototype.myColor = function() {
  console.log("my color is", this.color);
};
let cat = new Cat("yellow");
console.log(cat.type);
cat.myColor();

/**
 * (子类“羊🐏”)
 * 实例继承
 * 优点：不限制调用方式，既可以new，也可以fn();
 * 缺点：实例是父类的实例，且不支持多继承
 */
let Sheep = function(color) {
  let instance = new Animal("sheep", "grass");
  instance.color = color;
  instance.myColor = this.myColor;
  return instance;
};
Sheep.prototype.myColor = function() {
  console.log("my color is", this.color);
};
let sheep = new Sheep("white");
console.log(sheep.type);
sheep.myColor();

/**
 * (子类“牛🐂”)
 * 拷贝继承
 * 优点：支持多继承
 * 缺点：效率较低，无法继承父类不可枚举的属性，所有新实例都会共享到父类的实例属性
 */
let Cattle = function(color) {
  let instance = new Animal("cattle", "grass");
  for (let p in instance) {
    Cattle.prototype[p] = instance[p];
  }
  this.color = color;
};
Cattle.prototype.myColor = function() {
  console.log("my color is", this.color);
};
let cattle = new Cattle("brown");
console.log(cattle.type);
cattle.myColor();

/**
 * (子类“仓鼠🐹”)
 * 组合继承
 * 优点：可以继承实例属性，也可以继承原型属性
 * 缺点：调用了两次父类构造函数
 */
let Hamster = function(color) {
  Animal.call(this, "hamster", "paddy");
  this.color = color;
};
Hamster.prototype = new Animal("hamster", "paddy");
Hamster.prototype.myColor = function() {
  console.log("my color is", this.color);
};
let hamster = new Hamster("gray with white");
console.log(hamster.type);
hamster.myColor();
