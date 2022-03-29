const usersGet = (req, res) => {
  const { age, name } = req.query;

  res.status(200).json({
    msg: "get API - controller",
    age,
    name,
  });
};

const usersPost = (req, res) => {
  const { name, age } = req.body;

  res.json({
    msg: "post API - controllers",
    name,
    age,
  });
};

const usersPut = (req, res) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controller",
    id,
  });
};

const usersDelete = (req, res) => {
  res.json({
    msg: "delete API - controller",
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "patch API - controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
