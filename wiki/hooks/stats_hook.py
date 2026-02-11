"""
MkDocs hook to generate VegaLite charts from stats data.

Usage in markdown:
```stats
problem_ac:
  A: [142, 10]
  B: [0, 0]
  ...
team_ac:
  0: [0, 0]
  1: [53, 0]
  ...
```
"""

import re
import yaml

def on_page_markdown(markdown, page, config, files):
    """Process markdown to replace stats blocks with VegaLite charts."""
    pattern = r'```stats\n(.*?)\n```'
    matches = re.findall(pattern, markdown, re.DOTALL)

    # Detect if this is an English page
    is_english = page.file.src_uri.endswith('.en.md')

    for match in matches:
        try:
            data = yaml.safe_load(match)
            charts = generate_charts(data, is_english)
            markdown = markdown.replace(f'```stats\n{match}\n```', charts)
        except Exception as e:
            print(f"Error processing stats block: {e}")
            continue

    return markdown

def generate_charts(data, is_english=False):
    """Generate VegaLite chart code from stats data."""
    problem_ac = data.get('problem_ac', {})
    team_ac = data.get('team_ac', {})

    problem_chart = generate_problem_chart(problem_ac, is_english)
    team_chart = generate_team_chart(team_ac, is_english)

    return f"{problem_chart}\n\n{team_chart}"

def generate_problem_chart(problem_ac, is_english=False):
    """Generate problem AC count chart."""
    values = []
    for problem_id, (official, unofficial) in problem_ac.items():
        values.append({"id": problem_id, "ac": official, "type": "Official" if is_english else "正式赛队"})
        values.append({"id": problem_id, "ac": unofficial, "type": "Unofficial" if is_english else "非正式赛队"})

    if is_english:
        title = "Number of Accepted Teams Per Problem"
        x_title = "Problem"
        y_title = "# of Accepted Teams"
        tooltip_type = "Team Type"
        tooltip_ac = "# of Accepted Teams"
        domain = ["Official", "Unofficial"]
    else:
        title = "题目通过数统计"
        x_title = "题目编号"
        y_title = "通过数"
        tooltip_type = "队伍类型"
        tooltip_ac = "通过数"
        domain = ["正式赛队", "非正式赛队"]

    chart = f'''```vegalite
{{
"title": {{
"text": "{title}",
"fontSize": 20
}},
"data": {{
"values": {format_values(values)}
}},
"transform": [{{
"calculate": "if(datum.type === 'off', 0, 1)",
"as": "typeOrder"
}}],
"layer": [
{{
  "mark": {{"type": "bar", "tooltip": true, "width": {{"band": 0.5}}}},
  "encoding": {{
    "x": {{
      "field": "id",
      "type": "nominal",
      "axis": {{"labelAngle": 0, "labelFontSize": 14, "title": "{x_title}", "titleFontSize": 14}},
      "sort": "-y"
    }},
    "y": {{
      "field": "ac",
      "aggregate": "sum",
      "type": "quantitative",
      "axis": {{"labelAngle": 0, "labelFontSize": 14, "title": "{y_title}", "titleFontSize": 14}}
    }},
    "tooltip": [
      {{
        "field": "type",
        "type": "nominal",
        "title": "{tooltip_type}"
      }},
      {{
        "field": "ac",
        "aggregate": "sum",
        "type": "quantitative",
        "title": "{tooltip_ac}"
      }}
    ],
    "color": {{
      "field": "type",
      "type": "nominal",
      "scale": {{
        "domain": {format_values(domain)},
        "range": ["#4c78a8", "#616166"]
      }},
      "legend": null
    }},
    "order": {{"field": "typeOrder"}}
  }}
}},
{{
  "mark": {{"type": "text", "style": "label", "fontSize": 14, "dy": -10}},
  "encoding": {{
    "x": {{
      "field": "id",
      "type": "nominal",
      "sort": "-y"
    }},
    "y": {{
      "field": "ac",
      "aggregate": "sum",
      "type": "quantitative"
    }},
    "text": {{
      "field": "ac",
      "aggregate": "sum",
      "type": "quantitative"
    }}
  }}
}}
]
}}
```
'''
    return chart

def generate_team_chart(team_ac, is_english=False):
    """Generate team AC count chart."""
    values = []
    for ac_count, (official, unofficial) in team_ac.items():
        values.append({"ac": ac_count, "cnt": official, "type": "Official" if is_english else "正式赛队"})
        values.append({"ac": ac_count, "cnt": unofficial, "type": "Unofficial" if is_english else "非正式赛队"})

    if is_english:
        title = "Number of Accepted Problems Per Team"
        x_title = "# of Accepted Problems"
        y_title = "# of Teams"
        tooltip_type = "Team Type"
        tooltip_cnt = "# of Teams"
        domain = ["Official", "Unofficial"]
    else:
        title = "队伍过题数统计"
        x_title = "过题数"
        y_title = "队伍数"
        tooltip_type = "类型"
        tooltip_cnt = "队伍数"
        domain = ["正式赛队", "非正式赛队"]

    chart = f'''```vegalite
{{
"title": {{
"text": "{title}",
"fontSize": 20
}},
"data": {{
"values": {format_values(values)}
}},
"layer": [
{{
  "mark": {{"type": "bar", "tooltip": true, "width": {{"band": 0.5}}}},
  "encoding": {{
    "x": {{
      "field": "ac",
      "type": "nominal",
      "axis": {{"labelAngle": 0, "labelFontSize": 14, "title": "{x_title}", "titleFontSize": 14}}
    }},
    "y": {{
      "field": "cnt",
      "aggregate": "sum",
      "type": "quantitative",
      "axis": {{"labelAngle": 0, "labelFontSize": 14, "title": "{y_title}", "titleFontSize": 14}}
    }},
    "tooltip": [
      {{
        "field": "type",
        "type": "nominal",
        "title": "{tooltip_type}"
      }},
      {{
        "field": "cnt",
        "aggregate": "sum",
        "type": "quantitative",
        "title": "{tooltip_cnt}"
      }}
    ],
    "color": {{
      "field": "type",
      "type": "nominal",
      "scale": {{
        "domain": {format_values(domain)},
        "range": ["#4c78a8", "#616166"]
      }},
      "legend": null
    }},
    "order": {{"field": "typeOrder"}}
  }}
}},
{{
  "mark": {{"type": "text", "style": "label", "fontSize": 14, "dy": -10}},
  "encoding": {{
    "x": {{
      "field": "ac",
      "type": "nominal"
    }},
    "y": {{
      "field": "cnt",
      "aggregate": "sum",
      "type": "quantitative"
    }},
    "text": {{
      "field": "cnt",
      "aggregate": "sum",
      "type": "quantitative"
    }}
  }}
}}
]
}}
```
'''
    return chart

def format_values(values):
    """Format values list for JSON output."""
    import json
    return json.dumps(values, ensure_ascii=False, separators=(',', ': '))