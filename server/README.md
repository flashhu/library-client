# API 文档

### 用户注册

**请求URL**

* `http://localhost:8080/v1/user/register`

**请求方式**

* POST

**请求参数**

| 参数名   | 必选 | 类型   | 说明         |
| -------- | ---- | ------ | ------------ |
| id       | 是   | string | 用户学/工号  |
| name     | 是   | string | 用户姓名     |
| identity | 是   | int    | 身份编号     |
| college  | 是   | int    | 所属学院编号 |
| class    | 是   | int    | 所属班级编号 |
| phone    | 否   | string | 手机号       |
| email    | 否   | string | 邮箱         |
| passwd   | 是   | string | 密码         |

**返回示例**

```json
{
    "msg": "账号已存在",
    "error_code": 10000,
    "request": "POST /v1/user/register"
}
```

```json
{
    "msg": "所属班级/学院编码不存在",
    "error_code": 10000,
    "request": "POST /v1/user/register"
}
```

```json
{
    "msg": "该身份类型不存在",
    "error_code": 10000,
    "request": "POST /v1/user/register"
}
```

```json
{
    "msg": "ok",
    "error_code": 0,
    "request": "POST /v1/user/register"
}
```

### 用户登录

**请求URL**

* `http://localhost:8080/v1/token/`

**请求方式**

* POST

**请求参数**

| 参数名  | 必选 | 类型   | 说明        |
| ------- | ---- | ------ | ----------- |
| account | 是   | string | 用户学/工号 |
| passwd  | 是   | string | 密码        |

**返回示例**

```json
{
    "msg": "密码不正确",
    "error_code": 10004,
    "request": "POST /v1/token/"
}
```

```json
{
    "msg": "账号不存在",
    "error_code": 10000,
    "request": "POST /v1/token/"
}
```

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyMDE4MjEyMjEyNjc1Iiwic2NvcGUiOjgsImlhdCI6MTYwNzYxOTQ1MCwiZXhwIjoxNjEwMjExNDUwfQ.YcXxzEO0wLuut4MqTWnUS7jNd1XuJI2OA4jkZn9jO_Q",
    "info": {
        "name": "张三",
        "college": "信息科学与工程学院",
        "class": "计算机184",
        "email": "",
        "phone": "",
        "authority": 0
    }
}
```

### 获取用户信息

**简要描述**

使用 Basic Auth 携带 Token，可应用于带 Token 自动登录的情况

**请求URL**

* `http://localhost:8080/v1/user/info`

**请求方式**

* GET

**返回示例**

```json
{
    "msg": "token不合法",
    "error_code": 10006,
    "request": "GET /v1/user/info"
}
```

```json
{
    "msg": "token已过期",
    "error_code": 10006,
    "request": "GET /v1/user/info"
}
```

```json
{
    "info": {
        "name": "张三",
        "college": "信息科学与工程学院",
        "class": "计算机184",
        "email": "",
        "phone": "",
        "authority": 0
    }
}
```

### 获取学院列表

**请求URL**

* `http://localhost:8080/v1/college/list`

**请求方式**

* GET

**返回示例**

```json
{
    "collegeList": [
        {
            "id": 1,
            "name": "经济与管理学院"
        },
        {
            "id": 2,
            "name": "沈钧儒法学院"
        },
        {
            "id": 3,
            "name": "公共管理学院"
        }
    ]
}
```

### 获取班级列表

**请求URL**

* `http://localhost:8080/v1/class/list`

**请求方式**

* GET

**返回示例**

```json
{
    "msg": [
        "year字段是必填参数",
        "id字段是必填参数"
    ],
    "error_code": 10000,
    "request": "GET /v1/class/list"
}
```

```json
{
    "msg": [
        "id学院编码格式错误",
        "year年份格式错误"
    ],
    "error_code": 10000,
    "request": "GET /v1/class/list"
}
```

```json
{
    "classList": [
        {
            "id": 1,
            "college_id": 11,
            "year": "2018",
            "name": "计算机师范181"
        },
        {
            "id": 2,
            "college_id": 11,
            "year": "2018",
            "name": "计算机182"
        },
        {
            "id": 3,
            "college_id": 11,
            "year": "2018",
            "name": "计算机183"
        }
    ]
}
```

