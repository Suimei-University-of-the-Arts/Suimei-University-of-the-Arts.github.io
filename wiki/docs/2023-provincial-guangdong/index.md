---
title: 2023 广东省大学生程序设计竞赛
date: 2023-05-15
---

# 2023 广东省大学生程序设计竞赛

## 基本信息

<table>
<tr>
<td><b>竞赛日期</b></td><td>2023/05/14</td>
</tr>
<tr>
<td><b>竞赛试题</b></td><td><a href="contest-en.pdf">English</a> | <a href="contest-zh.pdf">中文</a></td>
</tr>
<tr>
<td><b>竞赛榜单</b></td><td><a href="https://board.xcpcio.com/provincial-contest/2023/guangdong">XCPC Board</a> | <a href="board">SUA Board</a></td>
</tr>
<tr>
<td><b>在线练习</b></td><td></td>
</tr>
<tr>
<td><b>选手评价</b></td><td><a href="https://www.zhihu.com/question/600856118">zhihu</a></td>
</tr>
</table>

广东省赛将在 5 月 27 ~ 28 日作为 [Universal Cup](https://ucup.ac/zh/) Stage 18。题解与在线练习将在 UCUP 赛后一并提供。

## 统计数据

```vegalite
{
  "title": {
    "text": "题目通过数统计",
    "fontSize": 20
  },
  "data": {
    "values": [
      {"id": "A", "ac": 236, "type": "正式赛队"},
      {"id": "A", "ac": 59, "type": "非正式赛队"},
      {"id": "B", "ac": 32, "type": "正式赛队"},
      {"id": "B", "ac": 25, "type": "非正式赛队"},
      {"id": "C", "ac": 198, "type": "正式赛队"},
      {"id": "C", "ac": 56, "type": "非正式赛队"},
      {"id": "D", "ac": 145, "type": "正式赛队"},
      {"id": "D", "ac": 44, "type": "非正式赛队"},
      {"id": "E", "ac": 30, "type": "正式赛队"},
      {"id": "E", "ac": 21, "type": "非正式赛队"},
      {"id": "F", "ac": 11, "type": "正式赛队"},
      {"id": "F", "ac": 20, "type": "非正式赛队"},
      {"id": "G", "ac": 0, "type": "正式赛队"},
      {"id": "G", "ac": 2, "type": "非正式赛队"},
      {"id": "H", "ac": 0, "type": "正式赛队"},
      {"id": "H", "ac": 6, "type": "非正式赛队"},
      {"id": "I", "ac": 123, "type": "正式赛队"},
      {"id": "I", "ac": 43, "type": "非正式赛队"},
      {"id": "J", "ac": 2, "type": "正式赛队"},
      {"id": "J", "ac": 7, "type": "非正式赛队"},
      {"id": "K", "ac": 135, "type": "正式赛队"},
      {"id": "K", "ac": 44, "type": "非正式赛队"},
      {"id": "L", "ac": 0, "type": "正式赛队"},
      {"id": "L", "ac": 0, "type": "非正式赛队"},
      {"id": "M", "ac": 6, "type": "正式赛队"},
      {"id": "M", "ac": 13, "type": "非正式赛队"}
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
      {"ac": 0, "cnt": 6, "type": "正式赛队"},
      {"ac": 0, "cnt": 1, "type": "非正式赛队"},
      {"ac": 1, "cnt": 35, "type": "正式赛队"},
      {"ac": 1, "cnt": 3, "type": "非正式赛队"},
      {"ac": 2, "cnt": 40, "type": "正式赛队"},
      {"ac": 2, "cnt": 9, "type": "非正式赛队"},
      {"ac": 3, "cnt": 23, "type": "正式赛队"},
      {"ac": 3, "cnt": 2, "type": "非正式赛队"},
      {"ac": 4, "cnt": 36, "type": "正式赛队"},
      {"ac": 4, "cnt": 3, "type": "非正式赛队"},
      {"ac": 5, "cnt": 59, "type": "正式赛队"},
      {"ac": 5, "cnt": 16, "type": "非正式赛队"},
      {"ac": 6, "cnt": 19, "type": "正式赛队"},
      {"ac": 6, "cnt": 3, "type": "非正式赛队"},
      {"ac": 7, "cnt": 14, "type": "正式赛队"},
      {"ac": 7, "cnt": 4, "type": "非正式赛队"},
      {"ac": 8, "cnt": 8, "type": "正式赛队"},
      {"ac": 8, "cnt": 6, "type": "非正式赛队"},
      {"ac": 9, "cnt": 1, "type": "正式赛队"},
      {"ac": 9, "cnt": 5, "type": "非正式赛队"},
      {"ac": 10, "cnt": 1, "type": "正式赛队"},
      {"ac": 10, "cnt": 6, "type": "非正式赛队"},
      {"ac": 11, "cnt": 0, "type": "正式赛队"},
      {"ac": 11, "cnt": 2, "type": "非正式赛队"},
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
