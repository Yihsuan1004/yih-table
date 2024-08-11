export const generateRandomNameData = (numRecords: number) => {
    const names = ['John Doe', 'Jane Smith', 'Michael Brown', 'Alice Johnson', 'Chris Lee', 'Emma Wilson'];
    const data = [];
  
    for (let i = 1; i <= numRecords; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAge = Math.floor(Math.random() * 60) + 18; // Random age between 18 and 77
  
      data.push({
        id: i,
        name: `${randomName} ${i}`, 
        age: randomAge,
      });
    }
  
    return data;
  }
  