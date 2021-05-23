//无重复字符的最长子串
let str = "abcabcbb";
function maxLen(str) {
  let arr = [],
    i = 0;
  for (; i < str.length; i++) {
    if (arr.indexOf(str[i]) === -1) {
      arr.push(str[i]);
    }
  }
  console.log(arr);
  return arr.length;
}
maxLen(str);
