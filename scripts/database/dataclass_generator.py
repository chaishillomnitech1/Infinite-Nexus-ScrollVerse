"""
PostgreSQL Dataclass Generator for ScrollVerse
Generates Python dataclasses from PostgreSQL table schemas
Frequency: 528Hz | Akashic Schema Alignment
"""

import os
import sys
from datetime import datetime
from typing import Dict, List, Any, Optional


class DataclassGenerator:
    """
    Generate Python dataclasses from PostgreSQL table schemas
    Integrates with ScrollVerse backend for real-time data operations
    """
    
    TYPE_MAPPING = {
        'integer': 'int',
        'bigint': 'int',
        'smallint': 'int',
        'serial': 'int',
        'bigserial': 'int',
        'varchar': 'str',
        'char': 'str',
        'text': 'str',
        'boolean': 'bool',
        'timestamp': 'datetime',
        'timestamptz': 'datetime',
        'date': 'date',
        'time': 'time',
        'decimal': 'Decimal',
        'numeric': 'Decimal',
        'real': 'float',
        'double': 'float',
        'jsonb': 'Dict[str, Any]',
        'json': 'Dict[str, Any]',
        'uuid': 'UUID',
        'bytea': 'bytes'
    }
    
    def __init__(self, output_dir: str = './generated/dataclasses'):
        """Initialize dataclass generator"""
        self.output_dir = output_dir
        self.frequency = 528
        os.makedirs(output_dir, exist_ok=True)
        
    def generate_from_schema(self, table_name: str, schema: Dict[str, Any]) -> str:
        """Generate dataclass code from table schema"""
        class_name = self._to_pascal_case(table_name)
        
        # Build imports
        imports = self._build_imports(schema['columns'])
        
        # Build fields
        fields = self._build_fields(schema['columns'])
        
        # Build methods
        methods = self._build_methods(class_name, schema['columns'])
        
        # Assemble dataclass
        code = self._assemble_dataclass(
            class_name=class_name,
            table_name=table_name,
            imports=imports,
            fields=fields,
            methods=methods,
            schema=schema
        )
        
        return code
    
    def _to_pascal_case(self, snake_str: str) -> str:
        """Convert snake_case to PascalCase"""
        return ''.join(word.capitalize() for word in snake_str.split('_'))
    
    def _to_camel_case(self, snake_str: str) -> str:
        """Convert snake_case to camelCase"""
        words = snake_str.split('_')
        return words[0].lower() + ''.join(word.capitalize() for word in words[1:])
    
    def _build_imports(self, columns: List[Dict[str, Any]]) -> List[str]:
        """Build import statements based on column types"""
        imports = [
            'from dataclasses import dataclass, field',
            'from typing import Optional, Dict, Any'
        ]
        
        type_imports = set()
        for col in columns:
            base_type = col['type'].split('(')[0].lower()
            python_type = self.TYPE_MAPPING.get(base_type, 'Any')
            
            if 'datetime' in python_type:
                type_imports.add('from datetime import datetime')
            elif 'date' in python_type and 'datetime' not in python_type:
                type_imports.add('from datetime import date')
            elif 'time' in python_type and 'datetime' not in python_type:
                type_imports.add('from datetime import time')
            elif 'Decimal' in python_type:
                type_imports.add('from decimal import Decimal')
            elif 'UUID' in python_type:
                type_imports.add('from uuid import UUID')
        
        imports.extend(sorted(type_imports))
        return imports
    
    def _build_fields(self, columns: List[Dict[str, Any]]) -> List[str]:
        """Build dataclass fields from columns"""
        fields = []
        
        for col in columns:
            base_type = col['type'].split('(')[0].lower()
            python_type = self.TYPE_MAPPING.get(base_type, 'Any')
            
            # Make field optional if nullable (assume all non-PK are nullable)
            if not col.get('primary_key', False):
                python_type = f"Optional[{python_type}]"
                default = " = None"
            else:
                default = ""
            
            # Add field documentation
            comment = f"  # {col.get('description', '')}" if col.get('description') else ""
            
            fields.append(f"    {col['name']}: {python_type}{default}{comment}")
        
        return fields
    
    def _build_methods(self, class_name: str, columns: List[Dict[str, Any]]) -> List[str]:
        """Build helper methods for dataclass"""
        methods = []
        
        # to_dict method
        col_names = [col['name'] for col in columns]
        to_dict = f"""    def to_dict(self) -> Dict[str, Any]:
        \"\"\"Convert dataclass to dictionary for database operations\"\"\"
        return {{
            {', '.join(f"'{name}': self.{name}" for name in col_names)}
        }}"""
        methods.append(to_dict)
        
        # from_dict classmethod
        from_dict = f"""    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> '{class_name}':
        \"\"\"Create dataclass instance from dictionary\"\"\"
        valid_fields = {{{', '.join(f"'{name}'" for name in col_names)}}}
        return cls(**{{k: v for k, v in data.items() if k in valid_fields}})"""
        methods.append(from_dict)
        
        # to_json method
        to_json = f"""    def to_json(self) -> str:
        \"\"\"Convert dataclass to JSON string\"\"\"
        import json
        return json.dumps(self.to_dict(), default=str)"""
        methods.append(to_json)
        
        # validate method
        validate = f"""    def validate(self) -> bool:
        \"\"\"Validate dataclass fields against ScrollVerse constraints\"\"\"
        # Add custom validation logic here
        return True"""
        methods.append(validate)
        
        return methods
    
    def _assemble_dataclass(
        self,
        class_name: str,
        table_name: str,
        imports: List[str],
        fields: List[str],
        methods: List[str],
        schema: Dict[str, Any]
    ) -> str:
        """Assemble complete dataclass code"""
        
        # Build header
        header = f'''"""
{class_name} - PostgreSQL Dataclass for ScrollVerse
Generated from table: {table_name}

Frequency: 528Hz | Akashic Schema Alignment
Generated at: {datetime.now().isoformat()}
"""

'''
        
        # Build imports section
        imports_section = '\n'.join(imports) + '\n\n'
        
        # Build dataclass
        dataclass_section = f'''@dataclass
class {class_name}:
    """
    Data model for {table_name} table
    
    ScrollVerse PostgreSQL Integration
    Resonance Frequency: 528Hz
    """
{chr(10).join(fields)}

{chr(10).join(methods)}
'''
        
        # Add query helper if relationships exist
        if schema.get('relationships'):
            query_helper = self._build_query_helper(class_name, table_name, schema['relationships'])
            dataclass_section += '\n' + query_helper
        
        # Assemble final code
        code = header + imports_section + dataclass_section
        
        return code
    
    def _build_query_helper(
        self,
        class_name: str,
        table_name: str,
        relationships: List[Dict[str, Any]]
    ) -> str:
        """Build query helper methods for relationships"""
        
        helper = f'''
class {class_name}Query:
    """Query helper for {class_name} with relationship support"""
    
    @staticmethod
    def get_by_id(conn, id: int) -> Optional[{class_name}]:
        """Fetch {class_name} by ID"""
        query = f"SELECT * FROM {table_name} WHERE id = %s"
        # Execute query with connection
        # result = conn.execute(query, (id,))
        # return {class_name}.from_dict(result) if result else None
        pass
    
    @staticmethod
    def get_all(conn, limit: int = 100) -> List[{class_name}]:
        """Fetch all {class_name} records"""
        query = f"SELECT * FROM {table_name} LIMIT %s"
        # Execute query with connection
        # results = conn.execute(query, (limit,))
        # return [{class_name}.from_dict(row) for row in results]
        pass
'''
        
        # Add relationship queries
        for rel in relationships:
            if rel['type'] == 'hasMany':
                rel_table = rel['table']
                rel_fk = rel['foreign_key']
                helper += f'''
    @staticmethod
    def get_with_{rel_table}(conn, id: int):
        """Fetch {class_name} with related {rel_table}"""
        query = f"""
            SELECT * FROM {table_name} t
            JOIN {rel_table} r ON t.id = r.{rel_fk}
            WHERE t.id = %s
        """
        # Execute query with connection
        pass
'''
        
        return helper
    
    def generate_and_save(
        self,
        table_name: str,
        schema: Dict[str, Any],
        filename: Optional[str] = None
    ) -> str:
        """Generate dataclass and save to file"""
        
        # Generate code
        code = self.generate_from_schema(table_name, schema)
        
        # Determine filename
        if not filename:
            filename = f"{table_name}_model.py"
        
        filepath = os.path.join(self.output_dir, filename)
        
        # Save to file
        with open(filepath, 'w') as f:
            f.write(code)
        
        print(f"✓ Generated dataclass for {table_name}: {filepath}")
        
        return filepath
    
    def generate_batch(self, schemas: Dict[str, Dict[str, Any]]) -> List[str]:
        """Generate dataclasses for multiple tables"""
        filepaths = []
        
        print(f"🔮 Generating {len(schemas)} dataclasses at {self.frequency}Hz...")
        
        for table_name, schema in schemas.items():
            try:
                filepath = self.generate_and_save(table_name, schema)
                filepaths.append(filepath)
            except Exception as e:
                print(f"✗ Failed to generate {table_name}: {e}")
        
        print(f"✨ Generated {len(filepaths)}/{len(schemas)} dataclasses")
        
        return filepaths


def main():
    """Main entry point for dataclass generator"""
    print("=" * 60)
    print("ScrollVerse PostgreSQL Dataclass Generator - 528Hz")
    print("=" * 60)
    
    # Example schemas for ScrollVerse tables
    schemas = {
        'nft_metadata': {
            'columns': [
                {'name': 'id', 'type': 'integer', 'primary_key': True},
                {'name': 'token_id', 'type': 'varchar(255)', 'unique': True},
                {'name': 'name', 'type': 'varchar(255)'},
                {'name': 'frequency', 'type': 'integer'},
                {'name': 'metadata_uri', 'type': 'text'},
                {'name': 'created_at', 'type': 'timestamp'}
            ],
            'relationships': [
                {'type': 'hasMany', 'table': 'frequency_layers', 'foreign_key': 'nft_id'}
            ]
        },
        'akashic_frequencies': {
            'columns': [
                {'name': 'id', 'type': 'integer', 'primary_key': True},
                {'name': 'frequency', 'type': 'integer'},
                {'name': 'type', 'type': 'varchar(100)'},
                {'name': 'resonance', 'type': 'decimal(5,2)'},
                {'name': 'description', 'type': 'text'}
            ],
            'relationships': [
                {'type': 'hasMany', 'table': 'frequency_layers', 'foreign_key': 'frequency_id'}
            ]
        },
        'frequency_layers': {
            'columns': [
                {'name': 'id', 'type': 'integer', 'primary_key': True},
                {'name': 'nft_id', 'type': 'integer'},
                {'name': 'frequency_id', 'type': 'integer'},
                {'name': 'layer_depth', 'type': 'integer'},
                {'name': 'resonance_data', 'type': 'jsonb'}
            ],
            'relationships': [
                {'type': 'belongsTo', 'table': 'nft_metadata', 'foreign_key': 'nft_id'},
                {'type': 'belongsTo', 'table': 'akashic_frequencies', 'foreign_key': 'frequency_id'}
            ]
        }
    }
    
    # Generate dataclasses
    generator = DataclassGenerator('./generated/dataclasses')
    filepaths = generator.generate_batch(schemas)
    
    print("\n📚 Generated Files:")
    for filepath in filepaths:
        print(f"  - {filepath}")
    
    print("\n✨ Dataclass generation complete!")


if __name__ == "__main__":
    main()
