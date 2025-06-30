const express = require('express');
const router = express.Router();

// 处理所有日期请求
router.get('/:date?', (req, res) => {
  let dateInput = req.params.date;
  
  // 处理空日期参数 (测试要求7-8)
  if (!dateInput) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }
  
  // 检查是否为纯数字时间戳 (测试要求4)
  if (/^\d+$/.test(dateInput)) {
    dateInput = parseInt(dateInput);
  }
  
  // 尝试解析日期 (测试要求5)
  const dateObj = new Date(dateInput);
  
  // 无效日期处理 (测试要求6)
  if (isNaN(dateObj.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  
  // 返回有效结果 (测试要求2-3)
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

module.exports = router;
```

### 关键修正点

1. **路由修复**：
   ```diff
   - router.get('/:date', ...)
   + router.get('/:date?', ...) // 添加?使参数可选
   ```

2. **纯数字时间戳处理**：
   ```javascript
   if (/^\d+$/.test(dateInput)) {
     dateInput = parseInt(dateInput); // 转换为数字
   }
