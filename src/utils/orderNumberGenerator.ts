const generateOrderNumber = (): string => {
    const currentDate: Date = new Date();
    const year: string = currentDate.getFullYear().toString();
    const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const day: string = currentDate.getDate().toString().padStart(2, '0');
  
    const randomSixDigitNumber: string = Math.floor(100000 + Math.random() * 900000).toString();
  
    let counter: number = 0;
    function getIncrementingFourDigitNumber(): string {
      return (counter++ % 10000).toString().padStart(4, '0');
    }
  
    const incrementingFourDigitNumber: string = getIncrementingFourDigitNumber();
  
    return `${year}${month}${day}${randomSixDigitNumber}${incrementingFourDigitNumber}`;
  };
  

export default generateOrderNumber;