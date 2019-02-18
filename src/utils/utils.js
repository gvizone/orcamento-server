module.exports = {
  handleError (err) {
    return {
      success: false,
      error: err
    };
  },
  handleSuccess (data) {
    return {
      success: true,
      data: data
    };
  }
};
