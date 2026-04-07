#!/usr/bin/env python3
"""
脚本用于将文档中的"开发板"修改为具体产品名称或"主板"
规则：
1. 如果是通用文档（如配件、注意事项等），将"开发板"修改为"主板"
2. 如果是具体产品文档，将"开发板"修改为具体产品名称
3. 保持"单板计算机"分类不变
"""

import os
import re
import sys
from pathlib import Path

def get_product_name_from_path(filepath):
    """从文件路径中提取产品名称"""
    path_str = str(filepath)
    
    # 匹配各种产品路径模式
    patterns = [
        (r'docs/rock5/rock5([a-z]+)', 'ROCK 5\\1'),
        (r'docs/rock4/rock4([a-z]+)', 'ROCK 4\\1'),
        (r'docs/rock3/rock3([a-z]+)', 'ROCK 3\\1'),
        (r'docs/rock2/rock2([a-z]+)', 'ROCK 2\\1'),
        (r'docs/cubie/([a-z0-9]+)', 'Cubie \\1'.upper()),
        (r'docs/dragon/([a-z0-9]+)', 'Dragon \\1'.upper()),
        (r'docs/nio/([a-z0-9]+)', 'NIO \\1'.upper()),
        (r'docs/aicore/([a-z0-9]+)', 'AICore \\1'.upper()),
        (r'docs/orion/([a-z0-9]+)', 'Orion \\1'.upper()),
        (r'docs/roobi/([a-z0-9]+)', 'Roobi \\1'.upper()),
        (r'docs/sirider/([a-z0-9]+)', 'Sirider \\1'.upper()),
        (r'docs/x/([a-z0-9]+)', 'X\\1'.upper()),
        (r'docs/zero/([a-z0-9]+)', 'Zero \\1'.upper()),
    ]
    
    for pattern, replacement in patterns:
        match = re.search(pattern, path_str)
        if match:
            product_name = re.sub(pattern, replacement, path_str)
            # 清理产品名称
            product_name = product_name.split('/')[-1]  # 取最后一部分
            product_name = re.sub(r'[-_]', ' ', product_name)  # 替换分隔符为空格
            return product_name
    
    return None

def is_general_document(filepath):
    """判断是否为通用文档"""
    path_str = str(filepath)
    
    # 通用文档的路径模式
    general_patterns = [
        r'docs/accessories/',
        r'docs/common/',
        r'docs/template/',
        r'docs/notice\.md$',
    ]
    
    for pattern in general_patterns:
        if re.search(pattern, path_str):
            return True
    
    return False

def process_file(filepath):
    """处理单个文件"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 判断文档类型
        if is_general_document(filepath):
            # 通用文档：将"开发板"修改为"主板"
            content = re.sub(r'开发板', '主板', content)
        else:
            # 具体产品文档：尝试提取产品名称
            product_name = get_product_name_from_path(filepath)
            if product_name:
                # 将"开发板"修改为具体产品名称
                content = re.sub(r'开发板', product_name, content)
            else:
                # 无法确定产品名称，使用"主板"
                content = re.sub(r'开发板', '主板', content)
        
        # 如果内容有变化，写回文件
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    
    except Exception as e:
        print(f"处理文件 {filepath} 时出错: {e}")
        return False

def main():
    # 查找所有包含"开发板"的Markdown文件
    docs_dir = Path("docs")
    changed_files = []
    
    for md_file in docs_dir.rglob("*.md"):
        # 检查文件是否包含"开发板"
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                if '开发板' in f.read():
                    print(f"找到包含'开发板'的文件: {md_file}")
                    if process_file(md_file):
                        changed_files.append(str(md_file))
        except Exception as e:
            print(f"读取文件 {md_file} 时出错: {e}")
    
    # 输出结果
    print(f"\n总共处理了 {len(changed_files)} 个文件:")
    for file in changed_files:
        print(f"  - {file}")

if __name__ == "__main__":
    main()