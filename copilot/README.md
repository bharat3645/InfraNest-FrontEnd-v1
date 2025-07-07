# InfraNest Copilot CLI

The InfraNest Copilot is an AI-powered command-line interface that helps you build, deploy, and manage backend services with natural language.

## Installation

```bash
cd copilot
pip install -r requirements.txt
```

## Usage

### Describe Backend
Convert natural language to DSL specification:

```bash
python copilot.py describe_backend "Create a blog API with users, posts, and comments"
```

Save to file:
```bash
python copilot.py describe_backend "Create a blog API" --output blog.yml
```

### Preview Code
Preview generated code structure:

```bash
python copilot.py preview_code blog.yml --framework django
```

### Deploy Project
Deploy to cloud provider:

```bash
python copilot.py deploy_project blog.yml --provider railway
```

### View Logs
View deployment logs:

```bash
python copilot.py view_logs blog-api --lines 50
```

### Run Audit
Run security and performance audit:

```bash
python copilot.py run_audit blog.yml
```

### Simulate API
Simulate API endpoint responses:

```bash
python copilot.py simulate_api blog.yml /api/v1/posts/ --method GET
```

## Configuration

The CLI stores configuration in `~/.infranest/config.json`.

## Commands

- `describe_backend` - Convert natural language to DSL
- `preview_code` - Preview generated code structure
- `deploy_project` - Deploy to cloud provider
- `view_logs` - View deployment logs
- `run_audit` - Run security and performance audit
- `simulate_api` - Simulate API responses

## Examples

```bash
# Generate a complete e-commerce API
python copilot.py describe_backend "Build an e-commerce API with products, categories, shopping cart, orders, and user authentication" --output ecommerce.yml

# Preview Django code
python copilot.py preview_code ecommerce.yml --framework django

# Deploy to Railway
python copilot.py deploy_project ecommerce.yml --provider railway

# Check deployment logs
python copilot.py view_logs ecommerce-api

# Run security audit
python copilot.py run_audit ecommerce.yml
```