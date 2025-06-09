// leave.model.ts

export interface Leave {
    id: number;
    emloyeeid: number;
    startDay: string; 
    endDay: string;   
    numberOfDay: number;
    details: string;
    leaveType: string; 
  }
  