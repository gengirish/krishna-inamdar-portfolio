# Resume Data Schema

Exact TypeScript schema for `src/data/resume-data.ts`. Every exported constant is required for the portfolio to render correctly.

## personalInfo

```typescript
export const personalInfo = {
  name: string,           // Full name
  title: string,          // Professional title
  tagline: string,        // One-line career summary with key stats
  summary: string,        // 2-3 sentence professional summary
  aiSummary: string,      // How the AI chat introduces the person
  currentPursuit?: {      // Optional: current education/certification
    title: string,
    institution: string,
    institutionFull: string,
    status: string,       // "Currently Pursuing" | "Completed"
    startDate: string,
    specializations: string[],
    url?: string,
  },
  location: string,
  linkedin: string,       // Full URL
  github: string,         // Full URL
  email: string,
};
```

## stats

Array of exactly 4 stat objects displayed in the hero section.

```typescript
export const stats = [
  { value: string, label: string },  // e.g., { value: "10+", label: "Years Experience" }
];
```

Recommended stat labels: Years Experience, Projects Shipped, Industry Domains, Technologies

## skillCategories

Array of 3-5 skill category objects. Each category gets a section in the skills display.

```typescript
export const skillCategories = [
  {
    name: string,       // Category name
    icon: string,       // Single emoji
    color: string,      // Hex color from theme palette
    skills: string[],   // 6-10 skills per category
  },
];
```

## experience

Array of work experience objects, ordered most recent first. Each entry maps to a timeline item.

```typescript
export const experience = [
  {
    epoch: number,        // Career phase number (0-based, earliest = 0)
    phase: string,        // Phase name (e.g., "Foundation", "Growth", "Leadership")
    title: string,        // Job title
    company: string,      // Company descriptor (anonymized if needed)
    companyType: string,  // Domain/industry
    period: string,       // "MMM YYYY – MMM YYYY" or "MMM YYYY – Present"
    domain: string,       // Short domain label
    domainColor: string,  // Hex color from theme
    accuracy: number,     // 50-97, increases with career progression
    loss: number,         // 0.03-0.50, decreases with career progression (1 - accuracy/100)
    description: string,  // 1-2 sentence role summary
    highlights: string[], // 3-4 achievement bullets with metrics
    tech: string[],       // Technologies used in this role
  },
];
```

### Accuracy/Loss Guidelines
- First role: accuracy 50-60, loss 0.40-0.50
- Mid-career: accuracy 70-85, loss 0.15-0.30
- Recent roles: accuracy 88-95, loss 0.05-0.12
- Current role: accuracy 95-97, loss 0.03-0.05

## featuredProjects

Array of 3-7 project objects. Each gets a card in the project showcase.

```typescript
export const featuredProjects = [
  {
    title: string,
    client: string,
    domain: string,
    domainColor: string,  // Hex color from theme
    description: string,  // 1-2 sentences
    impact: string,       // Metrics or key result
    tech: string[],       // 4-6 technologies
    url?: string,         // Live project URL
    github?: string,      // GitHub repo URL
  },
];
```

## certifications

```typescript
export const certifications = [
  {
    title: string,
    issuer: string,
    date: string,
    description: string,
    isCurrent?: boolean,  // true if currently pursuing
    url?: string,
  },
];
```

## testimonials

Array of 1-4 testimonial objects.

```typescript
export const testimonials = [
  {
    text: string,           // The quote (include surrounding quotes in text if desired)
    author: string,
    relationship: string,   // "Colleague", "Manager", "Client", etc.
    linkedin?: string,
  },
];
```

## domains

Industry domains the person has worked in.

```typescript
export const domains = [
  { name: string, icon: string },  // icon = single emoji
];
```

## skillJourney

Tracks skill progression over time for the SkillFlow visualization.

```typescript
export const skillJourney = [
  {
    skill: string,        // Skill name
    color: string,        // Hex color
    milestones: [
      {
        company: string,  // Short company label (matches graphNodes id)
        year: number,
        level: number,    // 0-100, skill proficiency at that point
      },
    ],
  },
];
```

## projectConnections

Links between career roles for the SkillGraph visualization.

```typescript
export const projectConnections = [
  {
    from: string,          // graphNode id
    to: string,            // graphNode id
    sharedSkills: string[],
    strength: number,      // 1-8, higher = more shared skills
  },
];
```

## graphNodes

Nodes for the career graph visualization.

```typescript
export const graphNodes = [
  {
    id: string,         // Short company label
    domain: string,     // Industry domain
    color: string,      // Hex color
    years: string,      // "YYYY-YYYY" or "YYYY-Now"
    size: number,       // 1-5, relative importance/duration
  },
];
```

## Color Assignment Rules

Assign colors from the theme palette consistently:
- Same domain = same color across all data structures
- Use `domainColor` in experience and projects, `color` in graphNodes and skillCategories
- Ensure at least 3 distinct colors are used across all entries
