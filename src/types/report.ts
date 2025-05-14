export interface ReportEntry {
  time: string;
  tasks: string[];
}

export interface Report {
  id: string;
  date: string;
  entries: ReportEntry[];
}
