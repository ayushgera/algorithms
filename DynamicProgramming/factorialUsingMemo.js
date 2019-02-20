// factorial using memoization

function Factorial(){
    this.factorial = [];
    this.factorial.push(1,1)
    this.findFactorial= function(x){
        return this.factorial[x] || x*this.findFactorial(x-1)
    }
}

console.log(new Factorial().findFactorial(9))