// factorial using tabulation

function Factorial(){
    this.factorial=[1];

    this.findFactorial= function(x){
        for(i=1;i<=x;i++){
            this.factorial[i]=i* this.factorial[i-1];
        }
        return this.factorial[x];
    }
}

console.log(new Factorial().findFactorial(6))