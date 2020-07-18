function MyPromise(fn) {
  this.resolveObserver = [];
  this.rejectFn = null;
  this.resolve = this.resolve.bind(this);
  fn.call(this, this.resolve, this.reject);
}

MyPromise.prototype.then = function(fn) {
  this.resolveObserver.push(fn);
  return this;
};

MyPromise.prototype.catch = function(fn) {
  this.rejectFn = fn;
  return this;
};

MyPromise.prototype.resolve = function(args) {
  let runObserver = function(observer, args) {
    let firstFn = observer.shift();
    if (observer.length > 0) {
      runObserver(observer, firstFn(args));
    } else {
      firstFn(args);
    }
  }.bind(this);
  runObserver(this.resolveObserver, args);
};

MyPromise.prototype.reject = function(args) {
  this.rejectFn && this.rejectFn(args);
};

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("abc");
  }, 1000);
})
  .then(data => {
    console.log("第一个then >> ", data);
    return "efg";
  })
  .then(data => {
    console.log("第二个then >> ", data);
  });
