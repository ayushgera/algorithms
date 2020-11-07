"""
    Given an unsorted array of N elements and an element X. 
    The task is to write a recursive function to check whether the element X is present in the given array or not
    array[] = {1, 2, 3, 4, 5} X = 3 return True
"""

def contains(A, index, val):
    if index == len(A):
        return False
    if A[index] == val:
        return True    
    return contains(A, index+1, val)

"""
    Given a set represented as a string, write a recursive code to print all the subsets of it.
    The subsets can be printed in any order.
    Input : set = "abc"
    Output : "". "a", "b", "c", "ab", "ac", "bc", "abc"

    Input : set = "abcd"
    Output : "" "a" "ab" "abc" "abcd" "abd" "ac" "acd"
            "ad" "b" "bc" "bcd" "bd" "c" "cd" "d"
"""

def subsets(s, index = 0, current = ""):
    if index == len(s):  
        print(current)
        return
    
    subsets(s, index+1, current+s[index])
    subsets(s, index+1, current)


"""
    Joesphus's problem:

    There are n people standing in a circle waiting to be executed. 
    The counting out begins at some point in the circle and proceeds around the circle in a fixed direction. 
    In each step, a certain number of people are skipped and the next person is executed. 
    The elimination proceeds around the circle (which is becoming smaller and smaller as the executed people are removed), 
    until only the last person remains, who is given freedom. Given the total number of persons n and a number k which indicates 
    that k-1 persons are skipped and kth person is killed in a circle. The task is to choose the place in the initial circle so 
    that you are the last one remaining and so survive.

    For example, if n = 5 and k = 2, then the safe position is 3. Firstly, the person at position 2 is killed, then the person at position 4 is killed, then the person at position 1 is killed. Finally, the person at position 5 is killed. So the person at position 3 survives.
    If n = 7 and k = 3, then the safe position is 4. The persons at positions 3, 6, 2, 7, 5, 1 are killed in order, and the person at position 4 survives
"""
# TODO: refer to https://stackoverflow.com/questions/31775604/explanation-for-recursive-implementation-of-josephus-problem for explanation
# TODO: https://www.geeksforgeeks.org/josephus-problem-using-bit-magic/?ref=rp bitwise in k=2 case


class CircularLinkedList():
    def __init__(self):
        self.head = None
        self.size = 0

    def __create_node(self, value):
        return {
            'value': value,
            'next': None
        }

    def insert(self, position= None, value= None):
        if position is None:
            position = self.size-1
        node = self.__create_node(value)
        if self.head == None:
            # first node
            self.head = node
            self.head['next'] = self.head
            self.size = self.size+1
            return True
        if position >= self.size:
            return False
        current = self.head
        if position > 0:
            for i in range(position):
                current  = current['next']
        node['next'] = current['next']
        current['next'] = node
        if position == self.size-1:
            node['next'] = self.head
        self.size = self.size+1
        return True
    
    def print(self):
        current = self.head
        for i in range(self.size):
            print(current['value'])
            current = current['next']

def josephus(n, k):
    """
        TODO: Recursive implementation
        josephus(n, k) = (josephus(n - 1, k) + k-1) % n + 1
        josephus(1, k) = 1
    """
    cll = CircularLinkedList()
    for i in range(n):
        cll.insert(value=i+1)
    current = cll.head
    while cll.size > 1:
        for i in range(k-2):
            current = current['next']
        temp = current['next']
        current['next'] = temp['next']
        cll.size = cll.size-1
        del temp
        if cll.size > 1:
            current = current['next']
        else:
            cll.head = current
    cll.print()


"""
    Given a string, print all permutations of it.

    Input : str = "ABC"
    Output : ABC ACB BAC BCA CAB CBA
"""
def permute(s, index=0, current=""):
    if index == len(s):
        print(current)
        return
    # temp = [c for c in s if c not in current]
    temp = s[:]
    for c in current:
        temp = temp.replace(c,"", 1)
    for i in temp:
        permute(s, index+1, current+i)


"""
    Tower of Hanoi
"""
class TOH:
    def __init__(self):
        self.total = 0
        
    def toh(self, N, fromm, to, aux):
        # Your code here
        if N==0:
            return
        self.toh(N-1, fromm, aux, to)
        print("move disk {} from rod {} to rod {}".format(N,fromm,to))
        self.toh(N-1, aux, to, fromm)
        self.total = self.total+1
        return self.total
        

"""
    Lucky numbers:
    Take the set of integers
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,……
    First, delete every second number, we get following reduced set.
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19,…………
    Now, delete every third number, we get
    1, 3, 7, 9, 13, 15, 19,….….
    Continue this process indefinitely……
    Any number that does NOT get deleted due to above process is called “lucky”.
"""
def isLucky(n, i=2):
    #RETURN 1 OR 0
    if n == 1 or n== 0 or i>n:
        return 1
    if n%i == 0:
        return 0
    return isLucky(n-int(n/i), i+1)


"""
    power using recursion Log(P)
"""
def power(N,R):
    #Your code here
    if R==0:
        return 1
    if R==1:
        return N
    temp = power(N, int(R/2))
    return temp*temp%1000000007 if R%2==0 else temp*temp*N%1000000007


"""
    power using iterative Log(y)
"""
def powerIterative(x, y): 
  
    # Initialize result 
    res = 1
      
    while (y > 0): 

        # to understand: represent x^(y in binary)
          
        # If y is odd, multiply 
        # x with result 
        if ((y & 1) == 1) : 
            res = res * x 
  
        # n must be even  
        # now y = y/2 
        y = y >> 1
          
        # Change x to x^2 
        x = x * x 
      
    return res 


"""
    Lexicographically sorted power set of a string
"""
def powerSet(s, i=0, current="", powerset=None):
    '''
    :param s: given string s
    :return: list containing power set of s.
    '''
    if powerset is None:
        powerset = []
    if i==len(s):
        return [current]
    powerset=powerset+powerSet(s, i+1, current+s[i])
    powerset=powerset+powerSet(s, i+1, current)
    return powerset

"""
    Possible Words From Phone Digits 
"""
l = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
}
##Complete this function
def possibleWords(a,N,i=0,current=""):
    ##Your code here
    total = []
    if i==N:
        return [current]
    chars = l[a[i]]
    for c in chars:
        total = total+possibleWords(a,N,i+1,current+c)
    return total


if __name__ == "__main__":
    #print(contains([1,2,3,4,5],0,3))
    #subsets("abcde")
    #josephus(5,2)
    #permute("abc")
    #print(TOH().toh(3,'a','b', 'c'))
    #print(isLucky(5))
    #print(power(2,2))
    #print(powerSet("abcd"))
    print(possibleWords([2,3,4],3))
