export const msg = (text) => {
  return `react-context-store: ${text}`;
};

export const warning = (text) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(msg(text));
  }
};
