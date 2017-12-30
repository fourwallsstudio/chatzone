export const allowedFile = file => {
  const allowedFileTypes = ['png', 'jpg', 'jpeg', 'gif'];
  const ext = file.name.split('.')[1].toLowerCase();
  return allowedFileTypes.includes(ext);
};
