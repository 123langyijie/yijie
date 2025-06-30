const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// 核心路由处理
app.get("/api/:date?", (req, res) => {
  let input = req.params.date;
  
  // 处理空参数（当前时间）
  if (!input) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }
  
  // 检查是否是纯数字（Unix时间戳）
  if (/^\d+$/.test(input)) {
    const timestamp = parseInt(input);
    const date = new Date(timestamp);
    
    // 验证时间戳有效性
    if (date.toUTCString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    
    return res.json({
      unix: timestamp,
      utc: date.toUTCString()
    });
  }
  
  // 处理日期字符串
  const date = new Date(input);
  
  // 验证日期有效性
  if (date.toUTCString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// 测试路由
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
