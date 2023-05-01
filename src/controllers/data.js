const addData = async (req, res) => {
  const { task_id, data_text } = req.body;
  res.send(200);
};

module.exports = {
  addData,
};
