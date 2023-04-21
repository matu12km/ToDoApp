/**
 * Taskの型定義
 * id タスクのID
 * title タスクのタイトル
 * content タスクの内容
 * scheduledDate タスクの予定日
 * udpatedDate タスクの更新日
 * completed タスクの完了状態
 */
export type Task = {
  id: number;
  title: string;
  content: string;
  scheduledDate: Date | null;
  udpatedDate: Date;
  completed: boolean;
};
/**
 * ThemeColorの型定義
 * bgColor 背景色
 * textColor 文字色
 */
export type ThemeColor ={
  bgColor: string;
  textColor: string;
  accentColor: string;
}