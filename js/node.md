EC(G)全局执行上下文
VO(G)全局变量对象
AO(FN)是VO的子集，私有的变量对象（函数）
GO 全局对象（window,存在堆内存中）
JS 从右向左解析
优先级
（）>对象属性
## 函数执行
创建函数
1. 开辟一个推内存【在堆内存中开辟一个空间，有一个16进制的地址】
2. 存储的内容
+ 函数体中的代码当作字符串先存起来
  - 初始化作用域链SCOPE-CHAIN<EC(FN),EC(G)>左侧：私有上下文，右侧函数作用域
  - 初始化this指向
  - 初始化arguments
  - 形参赋值（形参是私有变量，会在私有变量对象中存储）
  - 变量提升
  - 代码执行
+ 当作一个普通函数对象也会存一些键值对（eg:name:函数名，prototype，[scope]）
3. 创建函数的时候，声明了其作用域【创建函数所在的上下文】
4. 把推内存的地址放置在栈中，供函数名调用