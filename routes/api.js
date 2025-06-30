const express = require('express');
const router = express.Router();

router.get(['/', '/:date'], (req, res) => {
  let input = req.params.date;
  
  // 处理空日期参数 (测试要求7-8)
  if (!input) return handleDate(res, new Date());
  
  // 处理Unix时间戳格式 (测试要求4)
  if (/^\d+$/.test(input)) input = parseInt(input);
  
  // 解析日期 (测试要求5)
  const date = new Date(input);
  
  // 无效日期处理 (测试要求6)
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  
  // 返回有效结果 (测试要求2-3)
  handleDate(res, date);
});

function handleDate(res, date) {
  res.json({
    unix: date.getTime(),          // Unix时间戳(毫秒)
    utc: date.toUTCString()        // UTC格式字符串
  });
}

module.exports = router;
