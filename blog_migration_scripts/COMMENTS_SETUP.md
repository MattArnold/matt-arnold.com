# GitLab + Netlify Comments System

This implements a serverless commenting system for your static site generator using GitLab for storage and Netlify Functions for processing.

## How it Works

1. **Comment Submission**: Users fill out a comment form on blog posts
2. **Netlify Function**: Processes the comment and creates a merge request on GitLab
3. **File Modification**: Comments are appended directly to existing blog post markdown files
4. **Moderation**: Approve comments by merging the merge request (just like any code change)
5. **Auto-rebuild**: GitLab triggers a new Netlify build when comments are merged (like it already does)
6. **Display**: Comments appear at the bottom of the blog post markdown files

## Setup Instructions

### 1. GitLab Configuration

1. **Create a GitLab Personal Access Token**:
   - Go to GitLab → Settings → Access Tokens
   - Create a token with `api` scope
   - Save the token securely

2. **Get your GitLab Project ID**:
   - Go to your project → Settings → General
   - Note the Project ID number

### 2. Netlify Configuration

Add these environment variables to your Netlify site:

- `GITLAB_TOKEN`: Your GitLab personal access token
- `GITLAB_PROJECT_ID`: Your GitLab project ID
- `GITLAB_HOST`: `https://gitlab.com` (or your GitLab instance URL)

To add these:
1. Go to your Netlify site dashboard
2. Go to Site settings → Environment variables
3. Add each variable

### 3. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install @gitbeaker/rest
```

### 4. GitLab Webhook (Optional but recommended)

To automatically trigger rebuilds when comments are approved:

1. Go to your GitLab project → Settings → Webhooks
2. Add your Netlify build hook URL
3. Select "Merge request events" trigger

### 5. Using the Comment System

#### In your blog post templates

```html
<!-- Comment form -->
{% include "comment-form.njk" %}
```

#### Or use the complete blog post template

```html
---
layout: blog-post-with-comments
---

Your blog post content here...
```

Comments will automatically appear at the bottom of your blog post markdown files when approved.

## File Structure

```
src/
  _includes/
    comment-form.njk     # Comment submission form
    blog-post-with-comments.njk # Complete blog post template
  blog/
    posts/
      your-post.md       # Comments appended directly to markdown files

netlify/
  functions/
    comments.js          # Serverless function for processing comments
```

## Comment Moderation Workflow

1. User submits a comment on your blog
2. Netlify function creates a new branch with the comment appended to the blog post
3. A merge request is created for review
4. You review the comment in the merge request
5. If approved, merge the MR (comment appears in the blog post)
6. GitLab triggers a new build, and the comment appears on your site

## Comment Format

When approved, comments are appended to the bottom of your blog post markdown files in this format:

```markdown
## Comments

**John Doe** (January 15, 2025)  
Website: https://johndoe.com  
This is a great post! Thanks for sharing.

**Jane Smith** (January 16, 2025)  
Another insightful comment here.
```

## Security Features

- Email validation
- Input sanitization
- Comments require approval before appearing
- Email addresses are never displayed publicly
- Optional website links are properly sanitized

## Customization

### Styling

The comment form uses Tailwind CSS classes. You can customize the appearance by modifying the classes in `comment-form.njk`.

### Comment Fields

You can add or remove fields by:

1. Updating the form in `comment-form.njk`
2. Modifying the Netlify function in `comments.js`
3. Updating the comment format

### Notification

Consider adding email notifications when new comments are submitted by integrating with services like SendGrid or using GitLab's built-in notification features.

## Troubleshooting

### Common Issues

1. **Comments not appearing**: Check that the merge request was merged and the comment has `approved: true`
2. **Form submission errors**: Check Netlify function logs and environment variables
3. **GitLab API errors**: Verify your access token has the correct permissions

### Testing

You can test the comment system locally using:

```bash
netlify dev
```

This will run your Netlify functions locally for testing.
