export type Task = {
  id: number;
  title: string;
  content: string;
  scheduledDate: Date | null;
  udpatedDate: Date;
  completed: boolean;
};
export type ThemeColor ={
  bgColor: string;
  textColor: string;
  accentColor: string;
}