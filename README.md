# Mayura Coirs Website

A modern, scalable website for Mayura Coirs, featuring automated content embedding and API deployment.

## Project Structure

```
mayuracoirs-website/
├── src/                    # Source code directory
│   ├── api/               # API endpoints and logic
│   ├── scripts/           # Utility scripts
│   ├── static/            # Static assets
│   │   ├── css/          # Stylesheets
│   │   ├── js/           # JavaScript files
│   │   └── images/       # Image assets
│   ├── templates/         # HTML templates
│   ├── config/           # Configuration files
│   └── utils/            # Utility functions
├── docs/                  # Documentation
├── tests/                # Test files
├── .github/              # GitHub configuration
│   └── workflows/        # GitHub Actions workflows
└── requirements.txt      # Python dependencies
```

## Security Features

- Environment variables stored in `.env` (not committed to version control)
- Sensitive files excluded via `.gitignore`
- Automated security scanning in CI/CD pipeline
- Content embedding with secure API endpoints
- Rate limiting and request validation

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mayuracoirs-website.git
cd mayuracoirs-website
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
cd src
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp config/.env.example config/.env
# Edit config/.env with your configuration
```

5. Run the development server:
```bash
python scripts/run.py
```

## Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions. The workflow:
1. Runs content embedding
2. Builds the static site
3. Deploys to GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 