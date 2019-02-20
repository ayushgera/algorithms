// factorial using memoization and tabulation

function Fibonacci(){
    this.fibonacci=[0, 1];
    //n= index in the array
    this.findFibonacciTabulation= function(n){
        if(n<0){
            console.error("n should be at least 0");
            return;
        }
        if(n<2){
            return n;
        }
        for(i=2;i<=n;i++){
            this.fibonacci[i]= this.fibonacci[i-1]+this.fibonacci[i-2];
        }
        return this.fibonacci[n];
    }
    this.findFibonacciMemoization= function(n){
        if(n<0){
            console.error("n should be at least 0");
            return;
        }
        if(n<2){
            return n;
        }
        this.fibonacci[n]= (this.fibonacci[n-1] || this.findFibonacciMemoization(n-1)) + 
            (this.fibonacci[n-2] || this.findFibonacciMemoization(n-2));
        return this.fibonacci[n];
    }
    this.findFibonacciRecursion= function(n){
        if(n<0){
            console.error("n should be at least 0");
            return;
        }
        if(n<2){
            return n;
        }
        return (this.fibonacci[n-1] || this.findFibonacciMemoization(n-1)) + 
            (this.fibonacci[n-2] || this.findFibonacciMemoization(n-2));
    }
    this.getFibonacciSeries= function(n, type){
        var series=[];
        for(var i=0;i<n;i++){
            series.push(this["findFibonacci"+type || "Tabulation"](i));
        }
        return series;
    }
}

console.log(new Fibonacci().getFibonacciSeries(8, "Tabulation"));
console.log(new Fibonacci().getFibonacciSeries(8, "Memoization"));
console.log(new Fibonacci().getFibonacciSeries(8, "Recursion"));