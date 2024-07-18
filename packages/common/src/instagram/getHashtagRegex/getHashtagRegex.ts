export default (): RegExp => {
  return /#[^ `~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+/g;
};
