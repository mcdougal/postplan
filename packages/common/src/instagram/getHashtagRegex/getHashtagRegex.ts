export default (): RegExp => {
  return /#[^ `~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?\n]+/g;
};
