function isPalindrome(str) {
    const cleanedStr = str.toLowerCase();
    
    let i = 0;
    let j = cleanedStr.length - 1;
  
    while (i < j) {
      if (cleanedStr[i] !== cleanedStr[j]) {
        return "Not a palindrome";
      }
      i++;
      j--;
    }
    
    return "Palindrome";
  }


  function findUniqueAndCountDuplicates(arr) {
    const result = []; 
    let duplicateCount = 0; 
  
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const firstIndex = arr.indexOf(item);
      const lastIndex = arr.lastIndexOf(item);
  
      if (firstIndex === lastIndex) {
        result.push(item);
      } else if (firstIndex === i) {
        duplicateCount++;
      }
    }
  
    return {
      uniqueValues: result,    
      duplicateCount: duplicateCount 
    };
  }
  