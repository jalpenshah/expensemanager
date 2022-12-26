const addCorsHeadersInResponse = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
};

export { addCorsHeadersInResponse };
