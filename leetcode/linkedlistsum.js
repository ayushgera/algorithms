/**
 * You are given two non-empty linked lists representing two non-negative integers. 
 * The digits are stored in reverse order and each of their nodes contain a single digit. 
 * Add the two numbers and return it as a linked list. You may assume the two numbers do 
 * not contain any leading zero, except the number 0 itself.
 */

 /**
  * Part 1 : 
  * List are stored with head pointing to unit's place
  * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
  * Output: 7 -> 0 -> 8
  * Explanation: 342 + 465 = 807.
  */
 var linkedList = {
     value: undefined,
     next: null,
     addToList : function(value){
        // if list is empty, this is the first element 
        if(typeof(this.value) === "undefined"){
            this.value = value;
        }else{
            var newObj = Object.create(linkedList);
            newObj.value = value; 
            newObj.next = null;
            var current = this;
            while(current.next!==null) current= current.next;
            current.next = newObj;
        }
        return this;
     },
     toString : function(){
        // for the last element null is passed as context which means global 
        // not a good practice, just wanted to show off
        if(this === ((function () { return this; }).call(null))){
            return "";
        }
        if(this.value===undefined){
            console.error("List is empty!")
        }
        return this.value+this.toString.call(this.next);
     }
 }

 var a = Object.create(linkedList).addToList(2).addToList(4).addToList(3);
 var b = Object.create(linkedList).addToList(5).addToList(6).addToList(4).addToList(8).addToList(9);
 
 console.log("Inverse List Sum:");
 console.log("Inputs:\t"+a.toString()+"\t"+b.toString());
 console.log("Output:\t"+inverseSum(a,b).toString());

 // iterative approach (we'll use fancy recursion later)
 function inverseSum(a,b){
    var i=1;
    var sum= 0;
    var carry= 0;
    var sumList= Object.create(linkedList);
    while(a!==null && b!==null){
        sum= a.value+b.value+carry;
        carry= sum>9?1:0;
        sumList.addToList(sum%10);
        a= a.next;
        b= b.next;
    }
    var remainigList= a || b;
    while(remainigList!==null){
        sumList.addToList(remainigList.value+carry);
        carry=0;
        remainigList= remainigList.next;
    }
    return sumList;
 }


 /**
  * Part 2 : 
  * List are stored in reverse manner
  * Input: (3 -> 4 -> 6) + (4 -> 6 -> 6)
  * Output: 8 -> 1 -> 2
  * Explanation: 346 + 466 = 812.
  */

 var a2 = Object.create(linkedList).addToList(3).addToList(4).addToList(6);
 var b2 = Object.create(linkedList).addToList(4).addToList(6).addToList(6);

 console.log("\nOrdered List Sum:");
 console.log("Inputs:\t"+a2.toString()+"\t"+b2.toString());
 console.log("Output:\t"+sum(a2,b2).toString());

 
/**
 * returns the sum of 2 integer linked lists
 * digits are stored in order
 * 3->4->6 = 346
 * 
 * TODO: handle variable length inputs
 * 
 * @param {linked list} a 
 * @param {linked list} b 
 */
 function sum(a, b){
    
    var sumList = _temporarySum(a2, b2, Object.create(linkedList));
    _fixSum(sumList);
    return sumList;

    /**
     * _temporarySum:
     * adds to lists and gives a temporary sum list
     * each node value can be > 10
     * i.e carry is not taken into account
     */
    function _temporarySum(a, b, currentSumList){
        if(a===null || b===null){
            return currentSumList;
        }
        return _temporarySum(a.next, b.next, currentSumList.addToList(a.value+b.value));
     }
    
     /**
      * _fixSum:
      * fixes the temporary linked list created by _temporarySum
      * each node value is added to the next node's generated carry
      * and the result is modulo 10
      */
     function _fixSum(sumList){
        if(sumList===null){
            return 0;
        }
        var carry = _fixSum(sumList.next);
        var currentSum = sumList.value+carry;
        sumList.value = currentSum%10;
        return Math.floor(currentSum/10);
     }
 }


