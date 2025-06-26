# Unified Blog Migration

This script consolidates all blog migration steps into a single, comprehensive process that properly handles line breaks and maintains all existing functionality.

## The Problem

The original migration process had multiple steps:
1. `preprocessblog.js` - Converted `<br>` tags to `\n\n`
2. `migrateblog.js` - Removed all `<br>` tags before HTML-to-Markdown conversion

This caused line breaks to be lost because the preprocessing step's `\n\n` was treated as plain text, not HTML structure, and the main migration removed the original `<br>` tags.

## The Solution

The unified script (`unified_migration.js`) fixes this by:

1. **Properly converting line breaks**: Instead of converting `<br>` to `\n\n`, it converts sequences of `<br>` tags to proper paragraph breaks (`<p>` tags) before HTML-to-Markdown conversion
2. **Maintaining all existing functionality**: Comments, tags, images, metadata extraction, etc.
3. **Providing better control**: Command-line options for testing, verbose output, and processing specific entries

## Usage

```bash
# Process all entries
node unified_migration.js

# Process a specific entry
node unified_migration.js --entry 1504

# Dry run to see what would happen
node unified_migration.js --dry-run

# Verbose output for debugging
node unified_migration.js --verbose

# Combine options
node unified_migration.js --entry 1504 --verbose --dry-run
```

## Complete Functionality Preserved

The unified migration preserves **all** existing functionality from the original migration scripts while fixing the line break issue:

### Core Content Processing
- **HTML to Markdown conversion** using Turndown with proper formatting
- **Line break preservation** (NEW: converts `<br>` sequences to paragraph breaks)
- **Entry content extraction** from Dreamwidth HTML structure
- **Safe filename generation** from titles with proper character escaping
- **HTML structure cleanup** during preprocessing

### Metadata Extraction & Processing
- **Post titles** from `<h3 class="entry-title"><a>...</a></h3>`
- **Publication dates** from `<span class="datetime">...</span>` with ISO 8601 formatting
- **Tags** from `<div class="tag"><ul><li><a rel="tag">...</a></li></ul></div>`
- **Original Dreamwidth URLs** from permalink elements
- **Userpic images** from `<div class="userpic img">` elements
- **Front matter generation** with proper YAML formatting for Eleventy

### Advanced Content Transformations
- **Heading conversion**: `<div><strong>` and `<p><strong>` → `<h2>` headings
- **Link preprocessing**: Handles poetry/lyrics with embedded line breaks
  - Splits multi-line links into separate paragraphs + final link
  - Preserves verse/poetry formatting in blog posts
- **HTML entity handling** and proper encoding preservation

### Comment System Processing
- **Nested comment thread extraction** with proper tree structure
- **Comment metadata**: author, date, title, content
- **OpenID username mapping** via `comments/commenters.yml`
- **Anonymous comment handling** with fallback names
- **Comment tree rendering** in Markdown with proper hierarchy
- **Comment content conversion** from HTML to Markdown
- **Threaded replies** flattened with horizontal rule separators

### Integration with Other Migration Scripts
The unified script now **includes** functionality from specialized scripts:

- **✅ Image URL conversion** (from `img/update-all-markdown-image-refs.js`)
  - Uses existing `blog-image-audit-*.json` to map external URLs to local paths
  - Converts both Markdown `![](url)` and HTML `<img src="url">` references
  - **Does NOT download images** - assumes they're already downloaded
  
- **✅ Embed restoration** (from `embeds/restore-embeds.js`)
  - Uses existing `embed-restoration-plan.json` to restore video embeds
  - Handles YouTube and Vimeo embeds with proper iframe code
  - Replaces `<site-embed>` tags or inserts using pattern matching
  
- **✅ Username normalization** (built-in)
  - Maps OpenID usernames to readable names via `comments/commenters.yml`
  - Applied during comment processing automatically
  
- **Companion scripts** (run separately as needed):
  - **Tag management** (`tags/apply-tag-recommendations.js`) - Updates tags in batch
  - **Image downloading** (`img/localize-all-blog-images.js`) - Downloads images first
  - **Embed auditing** (`embeds/audit-embeds.js`) - Creates restoration plans

### File Format & Structure Support
- **Multiple input sources**: Prefers preprocessed files when available
- **Flexible file discovery** with proper error handling for missing files
- **Output standardization** with consistent naming conventions
- **Backup compatibility** with existing blog structure

### Error Handling & Robustness
- **File parsing errors** with context logging
- **Date parsing fallbacks** for malformed dates
- **Missing element handling** with sensible defaults
- **HTML parsing resilience** using JSDOM
- **Encoding preservation** throughout the pipeline

### Command-Line Interface
- **Single entry processing** for testing and debugging
- **Dry-run capability** to preview changes
- **Verbose logging** for troubleshooting
- **Batch processing** with progress tracking
- **Error reporting** with file-specific context

## File Structure

```
blog_migration_scripts/
├── unified_migration.js        # Main consolidated script
├── comments/
│   ├── commenters.yml         # Username mappings
│   └── migrateblog.js         # Original migration script
├── linebreaks/
│   ├── preprocessblog.js      # Original preprocessing
│   └── findmissinglinebreaks.js
└── [other specialized scripts]
```

## Migration Process

1. **Input**: Original HTML files from `dreamwidth/entries/`
2. **Preprocessing**: 
   - Handle links with embedded line breaks
   - Convert `<br>` sequences to paragraph tags
   - Convert certain formatting to headings
3. **Extraction**: Extract post content, metadata, and comments
4. **Conversion**: Convert HTML to Markdown using Turndown
5. **Output**: Write Markdown files with front matter to `src/blog/`

## Dependencies

Required npm packages (already in package.json):
- `jsdom` - HTML parsing and manipulation
- `turndown` - HTML to Markdown conversion
- `gray-matter` - Front matter handling
- `js-yaml` - YAML parsing

## Comparison with Original

| Original Process | Unified Process |
|------------------|-----------------|
| Multi-step (preprocess → migrate) | Single step |
| Line breaks lost | Line breaks preserved |
| Manual coordination | Automated |
| Limited error handling | Comprehensive error handling |
| No dry-run option | Full dry-run support |
| Limited debugging | Verbose logging |

## Testing

Before running on all files, test with specific entries:

```bash
# Test the problematic entry that was missing line breaks
node unified_migration.js --entry 1504 --verbose --dry-run

# Test a few entries
node unified_migration.js --entry 1500 --verbose
node unified_migration.js --entry 1505 --verbose
```

## Backup Strategy

Before running the full migration:

1. **Backup existing files**:
   ```bash
   cp -r src/blog src/blog.backup.$(date +%Y%m%d_%H%M%S)
   ```

2. **Test on a subset**:
   ```bash
   node unified_migration.js --dry-run | head -20
   ```

3. **Run full migration**:
   ```bash
   node unified_migration.js --verbose
   ```

## Error Handling

The script includes comprehensive error handling:
- File not found errors
- HTML parsing errors
- Date parsing errors
- Output writing errors

Each error is logged with context, and the script continues processing other files.

## Future Improvements

Potential enhancements:
- Progress bar for large batches
- Parallel processing for speed
- Diff comparison with existing files
- Selective re-processing based on file modification dates
- Integration with other migration scripts (images, embeds, etc.)
