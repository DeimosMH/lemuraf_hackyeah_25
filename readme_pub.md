# Publishing Odyssey to GitHub Pages via GitHub Actions Pipeline

This guide explains how to publish the Odyssey website to GitHub Pages using the **GitHub Actions pipeline** method. The `.github/workflows/` directory contains the automation scripts that handle the deployment process.

## GitHub Actions Pipeline Overview

The **`.github/workflows/deploy.yml`** file contains the complete automation pipeline that:
- Triggers on every push to main/master branches
- Builds and validates the static site
- Deploys to GitHub Pages automatically
- Provides error handling and status reporting

## Quick Start

### Step 1: Repository Setup

1. **Create a new repository** on GitHub (or use existing one)
2. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

3. **Copy the Odyssey files** into your repository:
   ```bash
   # Copy all Odyssey project files
   cp -r /path/to/Odyssey/* .
   ```

4. **Set up the GitHub Actions pipeline**:
   ```bash
   mkdir -p .github/workflows
   # The deploy.yml file should be placed here: .github/workflows/deploy.yml
   ```

### Step 2: Configure GitHub Pages

1. **Go to your repository** on GitHub
2. **Navigate to Settings > Pages**
3. **Under "Source"**, select **"GitHub Actions"**

### Step 3: Deploy via Pipeline

1. **Commit and push** your files:
   ```bash
   git add .
   git commit -m "Initial commit: Add Odyssey website with GitHub Actions pipeline"
   git push origin main
   ```

2. **The pipeline automatically**:
   - Detects the push to main branch
   - Runs the workflow defined in `.github/workflows/deploy.yml`
   - Builds the site and uploads it to GitHub Pages
   - Provides real-time status in the "Actions" tab

3. **Monitor deployment**:
   - Go to the **"Actions"** tab in your repository
   - Watch the **"Deploy Odyssey to GitHub Pages"** workflow run
   - The site will be available at `https://your-username.github.io/repo-name/` once deployment completes

## Repository Structure

### The .github/ Directory

The **`.github/`** directory contains all GitHub-specific configuration files:

```
your-repo-name/
├── .github/                   # GitHub configuration directory
│   └── workflows/            # Automation workflows
│       └── deploy.yml        # Main deployment pipeline
├── Odyssey/                  # Website files
│   ├── index.html
│   ├── dashboard.html
│   ├── simulator.html
│   ├── community.html
│   ├── investors.html
│   ├── wallet.html
│   ├── events.html
│   ├── routine.html
│   ├── accomplishments.html
│   ├── logistics.html
│   ├── app.js
│   ├── .nojekyll             # Tells GitHub Pages to serve as static site
│   └── assets/
│       ├── android_store.webp
│       ├── ios_store.png
│       └── tree/
├── readme.md                  # Project documentation
├── readme_pub.md             # This publishing guide
└── [other project files]
```

### Key Files Explained

#### `.github/workflows/deploy.yml`
- **Purpose**: Main deployment automation
- **Triggers**: Push to main/master, manual trigger
- **Actions**: Checkout, configure pages, upload artifact, deploy
- **Runtime**: Ubuntu latest with GitHub Pages permissions

#### `Odyssey/.nojekyll`
- **Purpose**: Tells GitHub Pages not to process the site with Jekyll
- **Why needed**: GitHub Pages by default runs Jekyll (a static site generator) on all sites
- **Effect**: Ensures raw HTML/CSS/JS files are served exactly as-is without Jekyll processing
- **Critical for**: Projects with existing HTML files that don't need Jekyll's template processing

#### Other Important Files
- **All HTML files**: The actual website pages
- **app.js**: JavaScript functionality
- **assets/**: Images, icons, and static resources

## Customization Options

### Custom Domain (Optional)

1. **Purchase a domain** from a registrar
2. **Add CNAME file**:
   ```bash
   echo "yourdomain.com" > Odyssey/CNAME
   ```

3. **Configure DNS**:
   - Point your domain to GitHub Pages
   - Add CNAME record: `your-username.github.io`

### Repository Settings

1. **Repository name**: Use descriptive name (e.g., `odyssey-demo`)
2. **Branch**: Deploy from `main` or `master`
3. **Visibility**: Public repository required for GitHub Pages

## GitHub Actions Pipeline Details

### How the Pipeline Works

The **`.github/workflows/deploy.yml`** file contains the complete automation:

```yaml
name: Deploy Odyssey to GitHub Pages
on:
  push:
    branches: [ main, master ]
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './Odyssey'
  deploy:
    needs: build
    uses: actions/deploy-pages@v4
```

### Pipeline Stages

1. **Trigger**: Activates on push to main/master or manual trigger
2. **Build Job**:
   - Checks out your code
   - Configures GitHub Pages
   - Uploads the `Odyssey/` folder as deployment artifact
3. **Deploy Job**:
   - Takes the build artifact
   - Publishes to GitHub Pages
   - Updates the live site

### Automatic Deployment

The workflow automatically deploys when you:
- **Push to main branch**: `git push origin main`
- **Push to master branch**: `git push origin master`
- **Manual trigger**: Via GitHub Actions tab

### Manual Deployment

1. **Go to Actions tab** in your repository
2. **Select "Deploy Odyssey to GitHub Pages"** workflow
3. **Click "Run workflow"** button
4. **Confirm** the deployment

### Workflow Status Monitoring

- **Actions Tab**: Real-time workflow execution status
- **Build Step**: Shows checkout, configuration, and upload progress
- **Deploy Step**: Shows publishing progress and completion status
- **Commits**: Each commit triggers a new workflow run

## Site URL

After deployment, your site will be available at:
```
https://your-username.github.io/repository-name/
```

For example:
- Repository: `odyssey-demo`
- URL: `https://your-username.github.io/odyssey-demo/`

## Troubleshooting

### Common Issues

1. **Site not loading**
   - Check if workflow completed successfully
   - Verify GitHub Pages is enabled in repository settings
   - Check repository is public (required for GitHub Pages)
   - Ensure `.nojekyll` file exists in the repository

2. **Styles not loading**
   - Ensure Tailwind CSS CDN links are working
   - Check browser console for errors
   - Verify `.nojekyll` file is present (Jekyll might strip styles without it)

3. **JavaScript not working**
   - Verify all JS files are present in repository
   - Check for console errors
   - Ensure `.nojekyll` file exists (Jekyll processing can break JS functionality)

4. **Files not found (404 errors)**
   - Confirm all HTML files are in the repository
   - Check file paths and names match exactly
   - Verify `.nojekyll` file is in place

### Debug Steps

1. **Check Actions tab** for workflow errors
2. **View deployed site** and check browser console
3. **Verify file structure** matches expected layout
4. **Test locally** before pushing

## Local Development

### Test Locally

1. **Use a local server**:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve Odyssey/
   ```

2. **Open browser** to `http://localhost:8000`

### Development Tips

- **Edit files** in `Odyssey/` directory
- **Test changes** locally before pushing
- **Use browser dev tools** to debug issues
- **Validate HTML** for compatibility

## Why .nojekyll is Required

### What is Jekyll?
Jekyll is a static site generator that GitHub Pages uses by default to process websites. It:
- Processes Markdown files into HTML
- Uses templates and layouts
- Handles site structure and navigation
- Optimizes files for deployment

### Why Disable Jekyll for Odyssey?

The Odyssey project consists of **pre-built HTML/CSS/JS files** that don't need Jekyll processing:

1. **Already HTML**: Files are ready-to-serve HTML pages
2. **Custom Structure**: Uses specific file organization that Jekyll might alter
3. **JavaScript Functionality**: Contains interactive elements that Jekyll could break
4. **External Dependencies**: Uses CDN links and custom styling that Jekyll might interfere with

### What Happens Without .nojekyll?

Without the `.nojekyll` file, GitHub Pages will:
- Try to process `.html` files as Jekyll templates
- Look for Markdown source files
- Attempt to apply Jekyll's default theme
- Potentially break JavaScript functionality
- Restructure folders according to Jekyll conventions

### The Solution

The empty `.nojekyll` file tells GitHub Pages:
> "Don't process this site with Jekyll - serve the files exactly as they are"

This ensures your carefully crafted HTML pages, CSS styles, and JavaScript functionality remain intact and work exactly as intended.

## Understanding the Pipeline Configuration

### Workflow File Breakdown

The **`.github/workflows/deploy.yml`** file contains:

```yaml
name: Deploy Odyssey to GitHub Pages          # Workflow name

on:                                           # Trigger conditions
  push:
    branches: [ main, master ]                # Auto-deploy on push
  workflow_dispatch:                          # Allow manual trigger

permissions:                                  # Required permissions
  contents: read
  pages: write
  id-token: write

jobs:
  build:                                      # Build job
    runs-on: ubuntu-latest                    # Run on GitHub's servers
    steps:
      - uses: actions/checkout@v4             # Get your code
      - uses: actions/configure-pages@v4      # Setup Pages deployment
      - uses: actions/upload-pages-artifact@v3 # Upload site files
        with:
          path: './Odyssey'                   # Source directory

  deploy:                                     # Deploy job
    needs: build                              # Wait for build to complete
    uses: actions/deploy-pages@v4            # Deploy to Pages
```

### Key Configuration Options

#### Trigger Configuration
```yaml
on:
  push:
    branches:
      - main           # Deploy when pushing to main
      - master         # Deploy when pushing to master
  workflow_dispatch: # Adds manual trigger button
```

#### Path Configuration
```yaml
with:
  path: './Odyssey'    # Deploys contents of Odyssey folder
```

#### Permission Settings
```yaml
permissions:
  contents: read      # Read repository contents
  pages: write        # Write to GitHub Pages
  id-token: write     # Required for Pages deployment
```

## Advanced Configuration

### Workflow Customization

Edit `.github/workflows/deploy.yml` to:

- **Change trigger branches**: Modify the `branches` list
- **Add environment variables**: Use `env` section for custom variables
- **Modify deployment settings**: Adjust timeout, artifact retention
- **Add build steps**: Include linting, validation, or processing

### Multiple Environments

For different deployment environments:

1. **Create branches** (dev, staging, prod)
2. **Customize workflows** per environment:
   ```yaml
   # Example: Different settings per branch
   if: github.ref == 'refs/heads/main'
   ```

3. **Use different GitHub Pages settings** for each environment

### Pipeline Optimization

#### Caching
Add caching for faster builds:
```yaml
- uses: actions/cache@v3
  with:
    path: .cache
    key: ${{ github.ref }}
```

#### Build Matrix
For multiple configurations:
```yaml
strategy:
  matrix:
    node-version: [18, 20]
```

## Support

### Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Troubleshooting Guide](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors)

### Common Patterns

- **Project repositories**: Use for demos and showcases
- **User/Organization repositories**: For personal/company sites
- **Custom domains**: For branded deployments

## Next Steps

1. **Set up repository** following this guide
2. **Enable GitHub Pages** in repository settings
3. **Push code** to trigger deployment
4. **Verify site** is accessible
5. **Customize** domain and settings as needed

Your Odyssey website will be live and accessible worldwide once deployment completes!