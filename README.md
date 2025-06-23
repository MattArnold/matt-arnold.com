# matt-arnold.com

Matt Arnold's personal website - a collection of projects, writings, and creative endeavors spanning over two decades of blogging, podcasting, game design, and community building.

## About This Site

This is the personal website of Matt Arnold, president of i3Detroit maker space, long-time organizer of Penguicon convention, podcast narrator, board game designer, and front-end web developer based in Detroit, Michigan.

## Site Features

### **Projects Portfolio**
Showcase of ongoing and completed projects across multiple domains:
- **Audio & Video**: Podcast narration including UNSONG by Scott Alexander and works by David Chapman
- **Board Games**: Original designs including Overworld (successful $49K Kickstarter), GaiaVora, and Ruhana
- **Gatherings & Events**: Fluidity Forum conference, Authentic Relating groups, and community events
- **Physical Making**: Giant parade puppets and maker space projects
- **Writing**: Blog posts and essays on technology, philosophy, and community building

### **Extensive Blog Archive**
- **1,500+ blog posts** dating back to 2004, migrated from LiveJournal and Dreamwidth
- Topics spanning technology, science fiction, philosophy, polyamory, atheism, community organizing, and personal reflections
- Full-text search and tag-based organization
- Modern responsive design with dark/light mode toggle

### **Gallery**
Visual documentation of projects, events, and creative works

### **Elsewhere**
Links to social media and email

### **Automated Changelog**
The Updates page automatically generates a changelog of recent content changes when the site builds, providing visitors with a real-time overview of new content.

## Technical Stack

Built with modern web technologies:
- **[Eleventy (11ty)](https://11ty.io/)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **Webpack** - Asset bundling and optimization
- **Nunjucks** - Templating engine
- **Node.js** - Build tooling and blog migration scripts

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/username/matt-arnold.com.git
cd matt-arnold.com
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run serve
```
The site will be available at `http://localhost:8080`

4. Build for production:
```bash
npm run build
```

## Development

### Available Scripts

- `npm run serve` - Start development server with hot reload
- `npm run build` - Build production site
- `npm run clean` - Clean build artifacts

### Project Structure

```
├── src/                    # Source files
│   ├── _data/             # Global data files
│   ├── _includes/         # Templates and partials
│   ├── assets/            # Static assets
│   ├── blog/              # Blog posts and templates
│   │   └── posts/         # Individual blog posts (2004-2025)
│   ├── img/               # Images
│   ├── pages/             # Site pages (about, contact, etc.)
│   └── styles/            # CSS and styling
├── blog_migration_scripts/ # Scripts for migrating blog content
├── dreamwidth/            # Original blog export data
├── preprocessed/          # Processed blog entries
└── _site/                 # Generated site (production)
```

### Blog Migration

The site includes comprehensive blog migration scripts that converted 20+ years of blog content from LiveJournal and Dreamwidth formats to modern Markdown with frontmatter. Key features:

- HTML to Markdown conversion with Turndown
- Metadata extraction and frontmatter generation
- Comment system integration
- Image migration and optimization
- URL preservation for legacy links

## Content Management

### Adding New Blog Posts

Create new markdown files in `src/blog/` with the following frontmatter:

```yaml
---
layout: layouts/post.njk
title: "Your Post Title"
date: 2025-01-01T00:00:00.000Z
tags: ["tag1", "tag2"]
---
```

### Navigation

Pages automatically appear in navigation when they include:

```yaml
---
eleventyNavigation:
  key: Page Name
  order: 1
---
```

## License

Content © Matt Arnold. Code available under MIT license.

## Contact

- Website: [matt-arnold.com](https://matt-arnold.com)
- Email: [Contact page](https://matt-arnold.com/contact/)
- Location: Detroit, Michigan

---

*This site represents over two decades of continuous creative output, community building, and technological exploration. It serves as both a personal archive and an ongoing platform for sharing projects and ideas.*
