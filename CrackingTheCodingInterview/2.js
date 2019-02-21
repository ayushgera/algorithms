/**
 * Write code to reverse a C-Style String. (C-String means that “abcd” is 
 * represented as five characters, including the null character.)
 */

 // Strings are immutable in JS, so there is NO WAY to change the current string
 // instead of generating a new one

 function reverseString(s){
    if(s && typeof(s)==="string"){
        var chars= s.split("")
        for(var s=0,e=chars.length-1;s<e;s++,e--){
            var temp= chars[s];
            chars[s]= chars[e];
            chars[e]= temp;
        }
        return chars.join("");
    }
 }

 console.log(reverseString("ayushgera"));
