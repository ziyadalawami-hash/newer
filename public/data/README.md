# Portfolio Data Structure

All portfolio content is stored in JSON files for easy editing without touching the code.

## Files

### hero.json
Contains hero section data (name, title, description, button text)

### projects.json
Contains all project cards with:
- title
- description
- achievements
- image URL
- categories
- tags
- github link
- live demo link

### experience.json
Contains work experience items with:
- role
- company
- period
- description
- achievements
- logo (optional - leave empty string if no logo)

### education.json
Contains education items with:
- institution
- degree
- period
- description
- achievements
- logo (optional - leave empty string if no logo)

### skills.json
Contains skills organized by categories:
- AI
- Software
- Other

### translations.json
Contains all UI labels and text (buttons, headings, etc.)

## Structure

Each file contains both English (en) and Arabic (ar) versions:

```json
{
  "en": { ... },
  "ar": { ... }
}
```

## Editing

Simply edit the JSON files to update your portfolio content. No code changes needed!
