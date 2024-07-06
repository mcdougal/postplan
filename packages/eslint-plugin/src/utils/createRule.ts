import { ESLintUtils } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator((ruleName) => {
  return ruleName;
});
