---
title: 2019 山东省大学生程序设计竞赛
date: 2023-05-20
---

# 2019 山东省大学生程序设计竞赛

## 基本信息

<table>
<tr>
<td><b>竞赛日期</b></td><td>2019/05/12</td>
</tr>
<tr>
<td><b>竞赛试题</b></td><td><a href="contest-en.pdf">English</a></a></td>
</tr>
<tr>
<td><b>竞赛榜单</b></td><td><a href="board">SUA Board</a></td>
</tr>
<tr>
<td><b>在线练习</b></td><td><a href="https://board.xcpcio.com/provincial-contest/2019/sdcpc">XCPC Board</a> | <a href="https://pintia.cn/problem-sets/91827364500/exam/problems/type/7?page=31">ZOJ 4113 ~ 4125</a></td>
</tr>
<tr>
<td><b>选手评价</b></td><td><a href="https://www.zhihu.com/question/319681005">zhihu</a></td>
</tr>
</table>

## 统计数据

```vegalite
{
  "title": {
    "text": "题目通过数统计",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"id": "A", "ac": 241, "type": "正式赛队"},
      {"id": "A", "ac": 56, "type": "非正式赛队"},
      {"id": "B", "ac": 29, "type": "正式赛队"},
      {"id": "B", "ac": 5, "type": "非正式赛队"},
      {"id": "C", "ac": 171, "type": "正式赛队"},
      {"id": "C", "ac": 40, "type": "非正式赛队"},
      {"id": "D", "ac": 189, "type": "正式赛队"},
      {"id": "D", "ac": 44, "type": "非正式赛队"},
      {"id": "E", "ac": 13, "type": "正式赛队"},
      {"id": "E", "ac": 3, "type": "非正式赛队"},
      {"id": "F", "ac": 230, "type": "正式赛队"},
      {"id": "F", "ac": 53, "type": "非正式赛队"},
      {"id": "G", "ac": 1, "type": "正式赛队"},
      {"id": "G", "ac": 1, "type": "非正式赛队"},
      {"id": "H", "ac": 46, "type": "正式赛队"},
      {"id": "H", "ac": 9, "type": "非正式赛队"},
      {"id": "I", "ac": 1, "type": "正式赛队"},
      {"id": "I", "ac": 0, "type": "非正式赛队"},
      {"id": "J", "ac": 2, "type": "正式赛队"},
      {"id": "J", "ac": 0, "type": "非正式赛队"},
      {"id": "K", "ac": 15, "type": "正式赛队"},
      {"id": "K", "ac": 6, "type": "非正式赛队"},
      {"id": "L", "ac": 48, "type": "正式赛队"},
      {"id": "L", "ac": 13, "type": "非正式赛队"},
      {"id": "M", "ac": 238, "type": "正式赛队"},
      {"id": "M", "ac": 53, "type": "非正式赛队"}
    ]
  },
  "transform": [{
    "calculate": "if(datum.type === 'off', 0, 1)",
    "as": "typeOrder"
  }],
  "layer": [
    {
      "mark": {"type": "bar", "tooltip": true, "width": {"band": 0.5}},
      "encoding": {
        "x": {
          "field": "id",
          "type": "nominal",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "题目编号", "titleFontSize": 14},
          "sort": "-y"
        },
        "y": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "通过数", "titleFontSize": 14}
        },
        "tooltip": [
          {
            "field": "type",
            "type": "nominal",
            "title": "队伍类型"
          },
          {
            "field": "ac",
            "aggregate": "sum",
            "type": "quantitative",
            "title": "通过数"
          }
        ],
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["正式赛队", "非正式赛队"],
            "range": ["#4c78a8", "#616166"]
          },
          "legend": null
        },
        "order": {"field": "typeOrder"}
      }
    },
    {
      "mark": {"type": "text", "style": "label", "fontSize": 14, "dy": -10},
      "encoding": {
        "x": {
          "field": "id",
          "type": "nominal",
          "sort": "-y"
        },
        "y": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative"
        },
        "text": {
          "field": "ac",
          "aggregate": "sum",
          "type": "quantitative"
        }
      }
    }
  ]
}
```

```vegalite
{
  "title": {
    "text": "队伍过题数统计",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"ac": 0, "cnt": 2, "type": "正式赛队"},
      {"ac": 0, "cnt": 2, "type": "非正式赛队"},
      {"ac": 1, "cnt": 11, "type": "正式赛队"},
      {"ac": 1, "cnt": 2, "type": "非正式赛队"},
      {"ac": 2, "cnt": 6, "type": "正式赛队"},
      {"ac": 2, "cnt": 1, "type": "非正式赛队"},
      {"ac": 3, "cnt": 40, "type": "正式赛队"},
      {"ac": 3, "cnt": 8, "type": "非正式赛队"},
      {"ac": 4, "cnt": 24, "type": "正式赛队"},
      {"ac": 4, "cnt": 7, "type": "非正式赛队"},
      {"ac": 5, "cnt": 94, "type": "正式赛队"},
      {"ac": 5, "cnt": 21, "type": "非正式赛队"},
      {"ac": 6, "cnt": 30, "type": "正式赛队"},
      {"ac": 6, "cnt": 8, "type": "非正式赛队"},
      {"ac": 7, "cnt": 18, "type": "正式赛队"},
      {"ac": 7, "cnt": 2, "type": "非正式赛队"},
      {"ac": 8, "cnt": 16, "type": "正式赛队"},
      {"ac": 8, "cnt": 4, "type": "非正式赛队"},
      {"ac": 9, "cnt": 2, "type": "正式赛队"},
      {"ac": 9, "cnt": 2, "type": "非正式赛队"},
      {"ac": 10, "cnt": 3, "type": "正式赛队"},
      {"ac": 10, "cnt": 1, "type": "非正式赛队"},
      {"ac": 11, "cnt": 3, "type": "正式赛队"},
      {"ac": 11, "cnt": 0, "type": "非正式赛队"},
      {"ac": 12, "cnt": 0, "type": "正式赛队"},
      {"ac": 12, "cnt": 0, "type": "非正式赛队"},
      {"ac": 13, "cnt": 0, "type": "正式赛队"},
      {"ac": 13, "cnt": 0, "type": "非正式赛队"}
    ]
  },
  "layer": [
    {
      "mark": {"type": "bar", "tooltip": true, "width": {"band": 0.5}},
      "encoding": {
        "x": {
          "field": "ac",
          "type": "nominal",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "过题数", "titleFontSize": 14}
        },
        "y": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative",
          "axis": {"labelAngle": 0, "labelFontSize": 14, "title": "队伍数", "titleFontSize": 14}
        },
        "tooltip": [
          {
            "field": "type",
            "type": "nominal",
            "title": "类型"
          },
          {
            "field": "cnt",
            "aggregate": "sum",
            "type": "quantitative",
            "title": "队伍数"
          }
        ],
        "color": {
          "field": "type",
          "type": "nominal",
          "scale": {
            "domain": ["正式赛队", "非正式赛队"],
            "range": ["#4c78a8", "#616166"]
          },
          "legend": null
        },
        "order": {"field": "typeOrder"}
      }
    },
    {
      "mark": {"type": "text", "style": "label", "fontSize": 14, "dy": -10},
      "encoding": {
        "x": {
          "field": "ac",
          "type": "nominal"
        },
        "y": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative"
        },
        "text": {
          "field": "cnt",
          "aggregate": "sum",
          "type": "quantitative"
        }
      }
    }
  ]
}
```

## 题解列表
