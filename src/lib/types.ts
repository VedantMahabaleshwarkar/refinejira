// JIRA ticket data structure
export interface JiraTicket {
  key: string;
  summary: string;
  description: string | null;
  status: string;
  priority: string;
  assignee: string | null;
  reporter: string | null;
  issueType: string; // Bug, Task, Story, etc.
}

// Checklist question structure
export interface ChecklistQuestion {
  id: string;
  question: string;
  subItems: string[];
  category?: string; // Optional category for grouping (used in Story checklist)
}

// Possible answer values
export type AnswerValue = 'yes' | 'no' | 'na' | null;

// State for the checklist
export interface ChecklistState {
  answers: Record<string, AnswerValue>;
  currentIndex: number;
  isComplete: boolean;
}

// API response structure
export interface JiraApiResponse {
  success: boolean;
  data?: JiraTicket;
  error?: string;
}
