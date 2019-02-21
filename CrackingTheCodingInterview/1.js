/**
 * Implement an algorithm to determine if a string has all unique characters. 
 * What if you can not use additional data structures?
 */

 //Solution 1 : O(nlogn), s=1/O(n) deoending on reuse of same string, not in js
 // arrange in ascending order, then find the first duplicate, if it exists

 function hasUniqueCharactersWithSorting(s){
    if(s && typeof(s)==="string"){
        var sorted= s.split("").sort();
        for(var i=0;i<sorted.length-1;i++){
            if(sorted[i]==sorted[i+1]){
                return false;
            }
        }
        return true;
    }
 }

 // Solution 2 : t= O(n), s= O(1)
 // bitwise compare

 function hasUniqueCharactersUsingBits(s){
    if(s && typeof(s)==="string"){
        var mask = 0;
        for(var i=0;i<s.length-1;i++,mask|=1<<maskShift){
            var maskShift= s.charCodeAt(i)- "a".charCodeAt();
            if((mask & 1<<maskShift) > 0){
                return false;
            }
        }
        return true;
    }
 }

 console.log(hasUniqueCharactersWithSorting("hello"));
 console.log(hasUniqueCharactersWithSorting("Ayush"));

 console.log(hasUniqueCharactersUsingBits("hello"));
 console.log(hasUniqueCharactersUsingBits("Ayush"));