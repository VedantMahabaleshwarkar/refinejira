// Description templates for different issue types

export const bugTemplate = `Description of problem

[*]

Prerequisites (if any, like setup, operators/versions)

[*]

Steps to Reproduce

    [Steps]

Actual results

[*]

Expected results / Acceptance Criteria

[*]

Reproducibility (Always/Intermittent/Only Once): [*]

Found in what build: [*]

Describe any workarounds

[*]

Testing:

[*]

Documentation: 

[*]

Demo: 

[*]
`;

export const taskTemplate = `Task: I want to [do something], so that [benefit or reason].



Acceptance Criteria: Given [scenario],  when [action performed], then [expected state] 

Requirements:

[*]

Steps: 

[*]

Testing:

[*]

Documentation: 

[*]

Demo: 

[*] 
`;

export const storyTemplate = `User Story: As a [type of user], I want [some functionality or goal], so that [benefit or reason].



Acceptance Criteria: Given [scenario],  when [action performed], then [expected state] 

Requirements:

[*]

Steps: 

[*]

Testing:

[*]

Documentation: 

[*]

Demo: 

[*] 
`;

/**
 * Get the description template based on issue type
 * @param issueType - The JIRA issue type (Bug, Task, Story, etc.)
 * @returns The appropriate template string
 */
export function getDescriptionTemplate(issueType: string): string {
  const type = issueType.toLowerCase();
  
  switch (type) {
    case 'bug':
      return bugTemplate;
    case 'task':
      return taskTemplate;
    case 'story':
      return storyTemplate;
    default:
      // Default to task template for unknown types
      return taskTemplate;
  }
}

/**
 * Get a display name for the template type
 * @param issueType - The JIRA issue type
 * @returns Human-readable template name
 */
export function getTemplateDisplayName(issueType: string): string {
  const type = issueType.toLowerCase();
  
  switch (type) {
    case 'bug':
      return 'Bug Report';
    case 'task':
      return 'Task';
    case 'story':
      return 'User Story';
    default:
      return 'Task';
  }
}

