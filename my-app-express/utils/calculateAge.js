function calculateAge(birthInput) {
    const currentYear = new Date().getFullYear();
    let birthYear;
  
    if (typeof birthInput === 'number') {
      // 输入为年份数字
      birthYear = birthInput;
    } else if (typeof birthInput === 'string') {
      // 输入为字符串
      if (/^\d{4}$/.test(birthInput)) {
        // 字符串是一个年份（四位数字）
        birthYear = parseInt(birthInput, 10);
      } else {
        // 字符串是一个完整日期
        const birthDate = new Date(birthInput);
        if (!isNaN(birthDate)) {
          birthYear = birthDate.getFullYear();
        } else {
          throw new Error('Invalid date format');
        }
      }
    } else if (birthInput instanceof Date) {
      // 输入为 Date 对象
      birthYear = birthInput.getFullYear();
    } else {
      throw new Error('Invalid input type');
    }
  
    const age = currentYear - birthYear;
    return age;
  }
  
  // 示例调用 --直接在外部需要处理年纪计算的时候，调用函数传递参数即可
  try {
    console.log(`今年 ${calculateAge(1990)} 岁`);  // 数字年份: 今年 34 岁
    console.log(`今年 ${calculateAge('1990')} 岁`);  // 字符串年份: 今年 34 岁
    console.log(`今年 ${calculateAge('1990-01-01')} 岁`);  // 日期字符串: 今年 34 岁
    console.log(`今年 ${calculateAge('01/01/1990')} 岁`);  // 日期字符串: 今年 34 岁
    console.log(`今年 ${calculateAge(new Date('1990-01-01'))} 岁`);  // Date 对象: 今年 34 岁
    // 以上年龄格式都可以
  } catch (error) {
    console.error(error.message);
  }
  

export {calculateAge};