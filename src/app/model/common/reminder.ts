export interface Reminder {
    title: string;
    time: Date;
    status: 'pending' | 'quoted' | 'waiting';
  }