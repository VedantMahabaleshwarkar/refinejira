# JIRA Refinement Tool

A Next.js web application that helps teams refine JIRA tickets using a Definition of Ready (DoR) checklist tailored to each issue type.

## Features

- **JIRA Lookup**: Enter a JIRA key (e.g., `RHOAIENG-123`) or paste a full JIRA URL
- **Markdown Rendering**: View JIRA descriptions with proper markdown formatting
- **Issue-Type Specific Checklists**: Different DoR checklists for Bug, Task, and Story issue types
- **Interactive Questionnaire**: Answer Yes/No/N/A for each checklist item
- **Copyable Output**: Generate a formatted checklist ready to paste back into JIRA
  - `(/)` for "Yes" answers
  - `[ ]` for "No" answers
  - `[N/A]` for "Not Applicable" answers

## DoR Checklists by Issue Type

### Bug Checklist (19 items)
Covers bug-specific items like:
- Proper bug format
- Reproduction steps
- Affects Version/s field
- Breaking changes impact

### Task Checklist (18 items)
Covers task-specific items like:
- Proper task format
- Feature refinement document links
- Task breakdown
- Target version

### Story Checklist (20 items)
Organized into categories:
- **Define the work**: Story format, acceptance criteria, requirements
- **If applicable**: Testing, dependencies, documentation, demo
- **Special Considerations**: Breaking changes, upstream/downstream
- **JIRA Hygiene**: Reporter, links, priority, version
- **Final Summary**: Team understanding, estimation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Usage

1. **Enter JIRA**: On the home page, enter a JIRA key (e.g., `PROJ-123`) or paste a JIRA URL
2. **View Details**: Review the JIRA title, issue type, and description
3. **Start Checklist**: Click "Prepare DoR Checklist" to begin the questionnaire
4. **Answer Questions**: For each question, select Yes, No, or N/A
5. **Copy Result**: Once complete, copy the formatted checklist to paste into JIRA comments

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page with JIRA input
│   ├── jira/[key]/page.tsx      # JIRA details & checklist page
│   └── api/jira/[key]/route.ts  # API route (for future server-side fetching)
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── JiraInput.tsx            # JIRA key/URL input form
│   ├── JiraDetails.tsx          # JIRA info display with issue type badge
│   ├── MarkdownRenderer.tsx     # Markdown content renderer
│   ├── DoRChecklist.tsx         # Checklist controller (issue-type aware)
│   ├── Question.tsx             # Single question component
│   └── ChecklistResult.tsx      # Final output with copy button
├── hooks/
│   └── useChecklist.ts          # Checklist state management
└── lib/
    ├── types.ts                 # TypeScript interfaces
    ├── checklist-data.ts        # Bug, Task, Story checklists
    └── jira-utils.ts            # JIRA key parsing & formatting
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19 + Tailwind CSS 4
- **Markdown**: react-markdown with remark-gfm
- **Language**: TypeScript

## Future Enhancements

- [ ] Integrate with JIRA API via MCP for real ticket fetching
- [ ] Save checklist progress to local storage
- [ ] Export checklist as PDF
- [ ] Team-specific checklist customization
- [ ] History of reviewed JIRAs
- [ ] Epic checklist support

## License

MIT
