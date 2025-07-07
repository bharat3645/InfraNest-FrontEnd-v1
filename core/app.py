"""
InfraNest Core Generation Engine
Flask-based API for DSL parsing and code generation
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import yaml
import os
import tempfile
import zipfile
from datetime import datetime
import logging

from generators.django_generator import DjangoGenerator
from generators.go_generator import GoGenerator
from generators.rails_generator import RailsGenerator
from parsers.dsl_parser import DSLParser
from parsers.agentic_parser import AgenticParser

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Initialize generators
generators = {
    'django': DjangoGenerator(),
    'go-fiber': GoGenerator(),
    'rails': RailsGenerator()
}

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    })

@app.route('/api/v1/parse-prompt', methods=['POST'])
def parse_prompt():
    """Convert natural language prompt to DSL"""
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Use agentic parser to convert prompt to DSL
        parser = AgenticParser()
        dsl_spec = parser.parse_prompt(prompt)
        
        return jsonify({
            'dsl': dsl_spec,
            'timestamp': datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error parsing prompt: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/validate-dsl', methods=['POST'])
def validate_dsl():
    """Validate DSL specification"""
    try:
        data = request.get_json()
        dsl_spec = data.get('dsl', {})
        
        parser = DSLParser()
        validation_result = parser.validate(dsl_spec)
        
        return jsonify({
            'valid': validation_result['valid'],
            'errors': validation_result.get('errors', []),
            'warnings': validation_result.get('warnings', [])
        })
        
    except Exception as e:
        logger.error(f"Error validating DSL: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/generate-code', methods=['POST'])
def generate_code():
    """Generate backend code from DSL specification"""
    try:
        data = request.get_json()
        dsl_spec = data.get('dsl', {})
        framework = data.get('framework', 'django')
        
        if framework not in generators:
            return jsonify({'error': f'Unsupported framework: {framework}'}), 400
        
        # Parse and validate DSL
        parser = DSLParser()
        parsed_spec = parser.parse(dsl_spec)
        
        # Generate code
        generator = generators[framework]
        generated_files = generator.generate(parsed_spec)
        
        # Create zip file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.zip') as tmp_file:
            with zipfile.ZipFile(tmp_file.name, 'w') as zip_file:
                for file_path, content in generated_files.items():
                    zip_file.writestr(file_path, content)
            
            return send_file(
                tmp_file.name,
                as_attachment=True,
                download_name=f"{parsed_spec.get('meta', {}).get('name', 'project')}-{framework}.zip",
                mimetype='application/zip'
            )
            
    except Exception as e:
        logger.error(f"Error generating code: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/preview-code', methods=['POST'])
def preview_code():
    """Preview generated code structure without downloading"""
    try:
        data = request.get_json()
        dsl_spec = data.get('dsl', {})
        framework = data.get('framework', 'django')
        
        if framework not in generators:
            return jsonify({'error': f'Unsupported framework: {framework}'}), 400
        
        # Parse DSL
        parser = DSLParser()
        parsed_spec = parser.parse(dsl_spec)
        
        # Generate preview
        generator = generators[framework]
        preview = generator.preview(parsed_spec)
        
        return jsonify({
            'preview': preview,
            'framework': framework,
            'project_name': parsed_spec.get('meta', {}).get('name', 'project')
        })
        
    except Exception as e:
        logger.error(f"Error previewing code: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/v1/frameworks', methods=['GET'])
def get_frameworks():
    """Get list of supported frameworks"""
    return jsonify({
        'frameworks': [
            {
                'id': 'django',
                'name': 'Django + DRF',
                'description': 'Python web framework with Django REST Framework',
                'language': 'Python',
                'features': ['ORM', 'Admin Panel', 'Authentication', 'REST API']
            },
            {
                'id': 'go-fiber',
                'name': 'Go Fiber + GORM',
                'description': 'High-performance Go web framework with GORM ORM',
                'language': 'Go',
                'features': ['High Performance', 'ORM', 'Middleware', 'REST API']
            },
            {
                'id': 'rails',
                'name': 'Ruby on Rails',
                'description': 'Convention over configuration web framework',
                'language': 'Ruby',
                'features': ['ActiveRecord', 'Scaffolding', 'Authentication', 'REST API']
            }
        ]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)