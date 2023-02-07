const notFound = (req, res, next) => {
  res.send(`It seems that you are lost; go to <a href="/">homepage</a>`);
};

module.exports = notFound;
