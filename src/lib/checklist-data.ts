import { ChecklistQuestion } from './types';

// Bug DoR Checklist
export const bugChecklist: ChecklistQuestion[] = [
  {
    id: 'reporter',
    question: '(When using a copy of the template) Change the reporter field',
    subItems: [],
  },
  {
    id: 'team',
    question: '(When not using a copy of the template) Change the team field',
    subItems: [],
  },
  {
    id: 'bug-format',
    question: 'It is in proper bug format',
    subItems: ['Fill in the blanks above'],
  },
  {
    id: 'acceptance-criteria',
    question: 'Well-defined acceptance criteria (or expected result)',
    subItems: ['Fill in the Acceptance Criteria blanks above'],
  },
  {
    id: 'breaking-changes',
    question: 'Does this break any existing functionality or upgrades?',
    subItems: [],
  },
  {
    id: 'reproduction-steps',
    question: 'Well-defined reproduction steps',
    subItems: ['Fill in the Steps to Reproduce above'],
  },
  {
    id: 'priority',
    question: 'Priority is defined and validated by the PM',
    subItems: ['Update Priority field'],
  },
  {
    id: 'linked-issues',
    question: 'Have (any applicable) relevant higher level or related Jira Issues been linked',
    subItems: [
      'Update EPIC Link field appropriately',
      'Update the Links to other JIRAs appropriately',
    ],
  },
  {
    id: 'task-breakdown',
    question: 'Task is broken down',
    subItems: ['Add specific tasks/steps to Description Field after Requirements'],
  },
  {
    id: 'upstream-downstream',
    question: 'Do any of the requirements or steps differ between upstream and downstream?',
    subItems: [
      'If so, create a separate Jira for the upstream contribution and document the differences in the description',
    ],
  },
  {
    id: 'team-understanding',
    question: 'Team members understand what they need to do (and have the tools) to complete the work',
    subItems: [],
  },
  {
    id: 'testing',
    question: 'Do we know how to test/verify this work?',
    subItems: ['Add Testing information in description field after Tasks/Steps'],
  },
  {
    id: 'documentation',
    question: 'Has relevant documentation requirements been identified?',
    subItems: ['Add documentation information in description field after testing information'],
  },
  {
    id: 'demo-needed',
    question: 'Should we Demo it?',
    subItems: [],
  },
  {
    id: 'demo-how',
    question: 'How are we going to demo? (from Testing results)',
    subItems: [
      'Add documentation requirements to description field after Testing',
      'If Demo is a separate Story, then create the story issue and link to this issue "is documented by"',
    ],
  },
  {
    id: 'affects-version',
    question: 'The RHOAI impacted version is defined',
    subItems: ['Update "Affects Version/s" Field'],
  },
  {
    id: 'target-version',
    question: 'The RHOAI target version is defined',
    subItems: ['Update "Target Version" Field'],
  },
  {
    id: 'estimated',
    question: 'Is it Estimated?',
    subItems: ['Team estimates using Story Poker', 'Update Estimate Field'],
  },
  {
    id: 'other-teams',
    question: 'Do any other teams need to be aware of the work?',
    subItems: ['Update the Component Field'],
  },
];

// Task DoR Checklist
export const taskChecklist: ChecklistQuestion[] = [
  {
    id: 'reporter',
    question: '(When using a copy of the template) Change the reporter field',
    subItems: [],
  },
  {
    id: 'team',
    question: '(When not using a copy of the template) Change the team field',
    subItems: [],
  },
  {
    id: 'task-format',
    question: 'It is in proper task format',
    subItems: ['Fill in the Task blanks above'],
  },
  {
    id: 'acceptance-criteria',
    question: 'Well-defined acceptance criteria',
    subItems: ['Fill in the Acceptance Criteria blanks above'],
  },
  {
    id: 'breaking-changes',
    question: 'Does this break any existing functionality or upgrades?',
    subItems: [],
  },
  {
    id: 'priority',
    question: 'Priority is defined and validated by the PM',
    subItems: ['Update Priority field'],
  },
  {
    id: 'linked-issues',
    question: 'Have (any applicable) relevant higher level or related Jira Issues been linked',
    subItems: [
      'Update EPIC Link field appropriately',
      'Update the Links to other JIRAs appropriately',
    ],
  },
  {
    id: 'feature-refinement',
    question: 'Are the Requirements informed by the feature refinement document',
    subItems: [
      'Add link to Feature Refinement document',
      'Add specific requirements to Description Field after Acceptance Criteria',
    ],
  },
  {
    id: 'task-breakdown',
    question: 'Task is broken down',
    subItems: ['Add specific tasks/steps to Description Field after Requirements'],
  },
  {
    id: 'upstream-downstream',
    question: 'Do any of the requirements or steps differ between upstream and downstream?',
    subItems: [
      'If so, create a separate Jira for the upstream contribution and document the differences in the description',
    ],
  },
  {
    id: 'team-understanding',
    question: 'Team members understand what they need to do (and have the tools) to complete the work',
    subItems: [],
  },
  {
    id: 'testing',
    question: 'Do we know how to test/verify this work?',
    subItems: ['Add Testing information in description field after Tasks/Steps'],
  },
  {
    id: 'documentation',
    question: 'Has relevant documentation requirements been identified?',
    subItems: ['Add documentation information in description field after testing information'],
  },
  {
    id: 'demo-needed',
    question: 'Should we Demo it?',
    subItems: [],
  },
  {
    id: 'demo-how',
    question: 'How are we going to demo? (from Testing results)',
    subItems: [
      'Add documentation requirements to description field after Testing',
      'If Demo is a separate Story, then create the story issue and link to this issue "is documented by"',
    ],
  },
  {
    id: 'target-version',
    question: 'RHOAI target version is defined',
    subItems: ['Update "Target Version" Field'],
  },
  {
    id: 'estimated',
    question: 'Is it Estimated?',
    subItems: ['Team estimates using Story Poker', 'Update Estimate Field'],
  },
  {
    id: 'other-teams',
    question: 'Do any other teams need to be aware of the work?',
    subItems: ['Update the Component Field'],
  },
];

// Story DoR Checklist
export const storyChecklist: ChecklistQuestion[] = [
  // Define the work
  {
    id: 'story-format',
    question: 'It is in proper story format',
    subItems: ['Fill in the User Story blanks above'],
    category: 'Define the work',
  },
  {
    id: 'acceptance-criteria',
    question: 'Well-defined acceptance criteria',
    subItems: ['Fill in the Acceptance Criteria blanks above'],
    category: 'Define the work',
  },
  {
    id: 'feature-refinement',
    question: 'Are the Requirements informed by the feature refinement document',
    subItems: [
      'Add link to Feature Refinement document',
      'Add specific requirements to Description Field after Acceptance Criteria',
    ],
    category: 'Define the work',
  },
  {
    id: 'task-breakdown',
    question: 'Task is broken down',
    subItems: ['Add specific tasks/steps to Description Field after Requirements'],
    category: 'Define the work',
  },
  // If applicable
  {
    id: 'testing',
    question: 'Do we know how to test/verify this work?',
    subItems: ['Add Testing information in description field after Tasks/Steps'],
    category: 'If applicable',
  },
  {
    id: 'dependencies',
    question: 'Add dependencies; external team dependencies, blockers, other\'s work, etc...',
    subItems: [
      'Update JIRA Links appropriately or if a JIRA is unavailable, note the dependencies in the description after Requirements',
    ],
    category: 'If applicable',
  },
  {
    id: 'documentation',
    question: 'Has relevant documentation requirements been identified?',
    subItems: ['Add documentation information in description field after testing information'],
    category: 'If applicable',
  },
  {
    id: 'demo',
    question: 'Should we Demo it? If yes,',
    subItems: [
      'Add demo requirements to description field after Testing',
      'If Demo is a separate Story, then create the story issue and link to this issue "is documented by"',
    ],
    category: 'If applicable',
  },
  {
    id: 'tools',
    question: 'Team members have the tools needed to complete the work',
    subItems: ['Note the tools in the description'],
    category: 'If applicable',
  },
  // Special Considerations
  {
    id: 'breaking-changes',
    question: 'Does this break any existing functionality or upgrades?',
    subItems: [],
    category: 'Special Considerations',
  },
  {
    id: 'upstream-downstream',
    question: 'Do any of the requirements or steps differ between upstream and downstream?',
    subItems: [
      'If so, create a separate Jira for the upstream contribution and document the differences in the description',
    ],
    category: 'Special Considerations',
  },
  {
    id: 'other-teams',
    question: 'Do any other teams need to be aware of the work?',
    subItems: ['Update the Component Field'],
    category: 'Special Considerations',
  },
  // JIRA Hygiene
  {
    id: 'reporter',
    question: '(When using a copy of the template) Change the reporter field',
    subItems: [],
    category: 'JIRA Hygiene',
  },
  {
    id: 'team',
    question: '(When not using a copy of the template) Change the team field',
    subItems: [],
    category: 'JIRA Hygiene',
  },
  {
    id: 'linked-issues',
    question: 'Have (any applicable) relevant higher level or related Jira Issues been linked',
    subItems: [
      'Update EPIC Link field appropriately',
      'Update the Links to other JIRAs appropriately',
    ],
    category: 'JIRA Hygiene',
  },
  {
    id: 'priority',
    question: 'Priority is defined and aligns with the Epic priority',
    subItems: ['Update Priority field'],
    category: 'JIRA Hygiene',
  },
  {
    id: 'target-version',
    question: 'The target RHOAI release is defined and aligns with the Epic target version',
    subItems: ['Update "Target Version" Field'],
    category: 'JIRA Hygiene',
  },
  // Final Summary
  {
    id: 'team-understanding',
    question: 'Team members understand what they need to do to complete the work (Confidence vote)',
    subItems: [],
    category: 'Final Summary',
  },
  {
    id: 'estimated',
    question: 'Is it Estimated?',
    subItems: ['Team estimates using Story Poker', 'Update Estimate Field'],
    category: 'Final Summary',
  },
];

// Issue type to checklist mapping
export type IssueType = 'Bug' | 'Task' | 'Story';

export function getChecklistForIssueType(issueType: string): ChecklistQuestion[] {
  const normalizedType = issueType.toLowerCase();
  
  if (normalizedType === 'bug') {
    return bugChecklist;
  } else if (normalizedType === 'task') {
    return taskChecklist;
  } else if (normalizedType === 'story') {
    return storyChecklist;
  }
  
  // Default to task checklist for unknown types
  return taskChecklist;
}

// Get display name for issue type
export function getIssueTypeDisplayName(issueType: string): string {
  const normalizedType = issueType.toLowerCase();
  
  if (normalizedType === 'bug') return 'Bug';
  if (normalizedType === 'task') return 'Task';
  if (normalizedType === 'story') return 'Story';
  
  return issueType;
}
