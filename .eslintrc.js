module.exports = {
  ignorePatterns: [
    // Files starting with '.' are ignored by default and must be explicitly
    // included
    `!.eslintrc.js`,
    `!.lintstagedrc.js`,
  ],
  overrides: [
    // Tell ESLint that our config files are running in a Node environment so
    // that it doesn't complain about Node features like `module.exports`
    { files: `.eslintrc.js`, env: { node: true } },
    { files: `.lintstagedrc.js`, env: { node: true } },
    {
      files: `*.{js,ts,tsx}`,
      extends: [
        `eslint:recommended`,
        `plugin:@typescript-eslint/recommended`,
        `plugin:no-unsanitized/DOM`,
        `plugin:react/jsx-runtime`,
        `plugin:react/recommended`,
        `prettier`,
        `plugin:import/recommended`,
        `plugin:import/typescript`,
      ],
      parser: `@typescript-eslint/parser`,
      plugins: [
        `@instaplan/eslint-plugin`,
        `filenames`,
        `import`,
        `react-hooks`,
      ],
      parserOptions: {
        project: [`./tsconfig.json`, `./packages/*/tsconfig.json`],
      },
      settings: {
        'import/external-module-folders': [`node_modules`, `@types`],
        'import/parsers': {
          '@typescript-eslint/parser': [`.ts`, `.tsx`],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
        next: {
          rootDir: `packages/app`,
        },
        react: {
          version: `detect`,
        },
      },
      rules: {
        // We have a pattern of using `index.ts` files to contain all exports
        // for a module. This could be done by importing everything at the top
        // of the file and then exporting it at the bottom, or by directly
        // exporting using an `export from`. The former is preferred because it
        // results in a clean list of everything exported from the module,
        // whereas the latter can be hard to read.
        '@instaplan/no-export-from': `error`,

        // Type assertions weaken the type safety of our system, increasing the
        // likelihood of runtime errors.
        '@instaplan/no-type-assertion': `error`,

        // Type assertions weaken the type safety of our system, increasing the
        // likelihood of runtime errors.
        '@instaplan/order-unassigned-imports': [
          `error`,
          {
            top: [`client-only`, `server-only`],
          },
        ],

        // Help keep module implementation details private by preventing imports
        // from anywhere but the top-level exports of the module.
        '@instaplan/package-imports': [
          `error`,
          {
            disallowedPatterns: [`^@/.*/.*/.*$`],
          },
        ],

        // Using the same style for array definitions across the codebase makes
        // it easier for developers to read and understand the types.
        '@typescript-eslint/array-type': [`error`, { default: `generic` }],

        // Using the same style for object definitions across the codebase makes
        // it easier for developers to read and understand the types. Choose
        // `Record<X, Y>` because 1) this matches enforcement of the `Array<X>`
        // style, 2) it is more concise, 3) it is the style recommended by the
        // error message for the `@typescript-eslint/ban-types` rule and 4) it
        // discourages relying on the key name since you can't name the key
        // in the `Record<X, Y>` style.
        '@typescript-eslint/consistent-indexed-object-style': [
          `error`,
          `record`,
        ],

        // `type` and `interface` are generally very similar, and can often be
        // used interchangeably. Using the same style consistently helps with
        // code readability.
        '@typescript-eslint/consistent-type-definitions': [`error`, `type`],

        // Explicit return types make it visually more clear what type is
        // returned by a function. They can also speed up TypeScript type
        // checking performance in large code bases with many large functions.
        '@typescript-eslint/explicit-function-return-type': `error`,

        // Explicit types for function return values and arguments makes it
        // clear to any calling code what is the module boundary's input and
        // output. Adding explicit type annotations for those types can help
        // improve code readability. It can also improve TypeScript type
        // checking performance on larger code bases.
        '@typescript-eslint/explicit-module-boundary-types': `error`,

        // Enforcing naming conventions helps keep the code base consistent,
        // and reduces overhead when thinking about how to name a variable.
        '@typescript-eslint/naming-convention': [
          `error`,
          {
            selector: `default`,
            format: [`camelCase`],
          },
          {
            // There are way too many 3rd party dependencies that would require
            // ignoring this rule all the time, e.g. ESLint config files,
            // Prisma where clauses, external API requests, etc.
            selector: `objectLiteralProperty`,
            format: null,
          },
          {
            // There are way too many 3rd party dependencies that would require
            // ignoring this rule all the time, e.g. ESLint config files,
            // Prisma where clauses, external API requests, etc.
            selector: `objectLiteralMethod`,
            format: null,
          },
          {
            // When destructuring an object, the variables are often coming
            // from a 3rd-party source so we don't want to enforce a particular
            // naming convention
            selector: `variable`,
            modifiers: [`destructured`],
            format: null,
          },
          {
            // Support React component functions in PascalCase and global
            // constants in UPPER_CASE
            selector: `variable`,
            modifiers: [`const`, `global`],
            format: [`camelCase`, `PascalCase`, `UPPER_CASE`],
          },
          {
            // Sometimes we pass React component functions as props, so we need
            // to support PascalCase for parameters
            selector: `parameter`,
            format: [`camelCase`, `PascalCase`],
          },
          {
            // The TypeScript docs use PascalCase for types & interfaces:
            // https://www.typescriptlang.org/docs/handbook/2/objects.html
            selector: `typeLike`,
            format: [`PascalCase`],
          },
          {
            // The TypeScript docs use PascalCase for enum members:
            // https://www.typescriptlang.org/docs/handbook/enums.html
            selector: `enumMember`,
            format: [`PascalCase`],
          },
          {
            // Sometimes we have type properties that need to match enum
            // members. Since these naming conventions clash, we allow
            // PascalCase type property names.
            selector: `typeProperty`,
            format: [`camelCase`, `PascalCase`],
          },
          {
            // Add known exceptions
            selector: `variable`,
            format: [`PascalCase`],
            filter: {
              regex: `^(EnhanceApp|WithApollo)$`,
              match: true,
            },
          },
          {
            selector: `import`,
            format: [`camelCase`, `PascalCase`],
          },
        ],

        // Using the `any` type undermines the value of TypeScript, so we want
        // it to be abundantly clear when we're using this escape hatch so we
        // can more easily spot areas for improvement.
        '@typescript-eslint/no-explicit-any': `error`,

        // Using assertions to tell the type system new information is often a
        // sign that code is not fully type-safe. It's generally better to
        // structure program logic so that TypeScript understands when values
        // may be nullable.
        '@typescript-eslint/no-non-null-assertion': `error`,

        // Variable shadowing can cause confusion and lead to bugs.
        '@typescript-eslint/no-shadow': `error`,

        // Unused variables clutter the code base and make it harder to read.
        '@typescript-eslint/no-unused-vars': `error`,

        // In JavaScript, prior to ES6, variable and function declarations are
        // hoisted to the top of a scope, so it’s possible to use identifiers
        // before their formal declarations in code. This can be confusing and
        // some believe it is best to always declare variables and functions
        // before using them.
        '@typescript-eslint/no-use-before-define': `error`,

        // ES2015 provides a default class constructor if one is not specified.
        // As such, it is unnecessary to provide an empty constructor or one
        // that simply delegates into its parent class. This rule will prevent
        // unneeded code that clutters the code base.
        '@typescript-eslint/no-useless-constructor': `error`,

        // String interpolation is a very common thing. Instead of starting
        // with a single or double quote then having to change it when you want
        // to inject a variable, it's easier to get in the habit of always using
        // backticks.
        '@typescript-eslint/quotes': [`error`, `backtick`],

        // The code base prefers braces around all arrow functions.
        //
        // Firstly, omitting the braces is more likely to cause bugs. If the
        // developer forgets to add braces after adding an extra statement to a
        // function, the second statement would no longer be a part of the
        // function.
        //
        // Secondly, having optional braces increases cognitive load. If braces
        // are optional, the developer must be careful that functions with a
        // side effect and no return include the braces, while functions without
        // a side effect and a return omit the braces.
        //
        // Thirdly, it is really annoying to go back and forth between braces
        // and no braces. It is common to add (or remove) a statement to a
        // function, which would require going to the beginning and end of the
        // function to add (or remove) the braces. This is especially annoying
        // when you want to temporarily add a console.log for debugging
        // purposes.
        //
        // Requiring braces does make the logic a little more cluttered, but the
        // justifications above outweigh the downside of visual clutter.
        //
        'arrow-body-style': [`error`, `always`],

        // Force arrow parents because it is more cognitive load to go back and
        // forth between the styles. Also, if you add a second argument then the
        // parens will already be there. This also ensure more consistency
        // between functions across the code base, making it easier to scan and
        // read.
        'arrow-parens': [`error`, `always`],

        // JavaScript allows the omission of curly braces when a block contains
        // only one statement. However, it is considered by many to be best
        // practice to never omit curly braces around blocks, even when they are
        // optional, because it can lead to bugs and reduces code clarity.
        curly: [`error`, `all`],

        // Dot notation is less verbose and thus easier to read, and the
        // majority of properties can be accessed this way. Force a consistent
        // style for accessing properties to avoid inconsistent code.
        'dot-notation': `error`,

        // It is considered good practice to use the type-safe equality
        // operators === and !== instead of their regular counterparts
        // == and !=. The reason for this is that == and != do type coercion
        // which follows the rather obscure Abstract Equality Comparison
        // Algorithm.
        eqeqeq: `error`,

        // Having consistent file names across the code base makes it easier to
        // navigate because you know what to expect without having to check
        // every file to see if it's camelCase or kebab-case or something else.
        // We're enforcing camelCase and PascalCase because we have a convention
        // of using the same name for the file and the default export.
        'filenames/match-regex': [`error`, `^[A-Za-z0-9.]+$`],

        // Using the same name for the file and the default export avoids bugs
        // such as this:
        //
        //   ```
        //   // Whoops, the default export is actually `getSeriousnessStep`
        //   import updateSeriousnessStep from './seriousnessStep';
        //   ```
        //
        // It also helps avoid confusion like this:
        //
        //   ```
        //   // What name should I give foo? I don't know without opening
        //   // up seriousnessStep and reading the code
        //   import foo from './seriousnessStep';
        //   ```
        //
        'filenames/match-exported': `error`,

        // Function declarations are hoisted, which means that it’s easy - too
        // easy - to reference the function before it is defined in the file.
        // This harms readability and maintainability.
        //
        // Regarding named vs anonymous functions: the code base prefers
        // anonymous expressions. Avoiding named functions reduces the
        // cognitive load on developers and creates more succinct, readable
        // code.
        //
        // Regarding the use of arrow functions: the code base prefers arrow
        // functions to be used always. This reduces cognitive load on the
        // developer because they can implement the same function style
        // everywhere. Arrow functions are preferred over the `function` keyword
        // because there are many situations where arrow functions _must_ be
        // used to maintain lexical scope.
        'func-style': [`error`, `expression`, { allowArrowFunctions: true }],

        // If an import is missing a file extension, it is intuitive to assume
        // that the imported file is either JS or TS code. If an imported file
        // is another type, we should always include the extension because
        // otherwise the file type would be unclear.
        'import/extensions': [
          `error`,
          `never`,
          {
            css: `always`,
            scss: `always`,
          },
        ],

        // Since imports are hoisted, keeping them all at the top prevents
        // surprising behavior.
        'import/first': `error`,

        // Although general guidance suggests that every export should have a
        // name to help with debugging, we have an enforced convention of always
        // naming the file the same thing as the default export. Naming the
        // export itself gets redundant, and it make a file easier to read if
        // there is a single anonymous default export defined.
        'import/no-anonymous-default-export': `off`,

        // Ensures that there is no resolvable path back to this module via its
        // dependencies.
        'import/no-cycle': [
          `error`,
          {
            maxDepth: undefined,
          },
        ],

        // Being explicit about dependencies will help avoid bugs.
        'import/no-extraneous-dependencies': `error`,

        // Mutation should be avoided in general, but in particular when
        // exporting mutable bindings. While this technique may be needed
        // for some special cases, in general, only constant references
        // should be exported.
        'import/no-mutable-exports': `error`,

        // Keeping imports organized can help developers find what they're
        // looking for more easily.
        'import/order': [
          `error`,
          {
            groups: [
              `unknown`,
              `builtin`,
              `external`,
              `internal`,
              `parent`,
              `sibling`,
              `index`,
            ],
            'newlines-between': `always`,
            alphabetize: {
              order: `asc`,
              caseInsensitive: true,
            },
          },
        ],

        // Just because a file has a single export does not mean that it makes
        // sense for that export to be a default.
        'import/prefer-default-export': `off`,

        // Prettier does its best to make lines at most 80 characters, but
        // it doesn't split comments so we still need this rule.
        'max-len': [
          `error`,
          {
            code: 80,
            // Prettier chooses not to wrap single-line default imports:
            // https://github.com/prettier/prettier/issues/576
            // Also, multi-line imports are not wrapped by Prettier, and this
            // is most common when doing import renaming so we ignore any line
            // that has " as " in it.
            ignorePattern: `^import .*|eslint-disable-next-line|^.* as .*,$`,
            // Strings that cause the line to go over 80 characters do not have
            // to be written across multiple lines using string concatenation.
            // Broken strings can be painful to work with and make code less
            // searchable.
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            // Splitting up URLs makes them hard to copy/paste and breaks
            // editors allowing you to click on URLs to open them in the
            // browser.
            ignoreUrls: true,
          },
        ],

        // Console statements should not accidentally find their way into
        // production, unless explicity acknowledged by putting an
        // eslint-disable comment.
        'no-console': `error`,

        // The following code should not be on production:
        //
        //   if (false) {
        //     doSomethingUnfinished();
        //   }
        //
        'no-constant-condition': `error`,

        // This is a stylistic preference, and enforcing it will help keep the
        // code base more consistent.
        'no-else-return': [`error`, { allowElseIf: false }],

        // Never use `eval()` on a string, it opens too many vulnerabilities.
        'no-eval': `error`,

        // Dealing with pure functions that return values is easier to reason
        // about than side effects.
        'no-iterator': `error`,

        // Never declare a function in a non-function block (if, while, etc).
        // Assign the function to a variable instead. Browsers will allow you
        // to do it, but they all interpret it differently.
        'no-loop-func': `error`,

        // Chaining the assignment of variables can lead to unexpected results
        // and be difficult to read.
        'no-multi-assign': `error`,

        // For readability, ternaries should not be nested and generally be
        // single line expressions.
        'no-nested-ternary': `error`,

        // Enforce consistency when creating objects.
        'no-new-object': `error`,

        // Never mutate parameters. Manipulating objects passed in as
        // parameters can cause unwanted variable side effects in the original
        // caller.
        'no-param-reassign': `error`,

        // Because the unary ++ and -- operators are subject to automatic
        // semicolon insertion, differences in whitespace can change semantics
        // of source code.
        'no-plusplus': `error`,

        // Disallow standard library utilities that are functionally broken but
        // remain for legacy reasons. See the AirBnb ESLint for more details:
        // https://github.com/airbnb/javascript#standard-library
        'no-restricted-globals': [`error`, `isNaN`, `isFinite`],

        // The following restricted syntax was lifted form the Airbnb ESLint
        // config. Their rationale: dealing with pure functions that return
        // values is easier to reason about than side effects.
        'no-restricted-syntax': [
          `error`,
          {
            selector: `ForInStatement`,
            message: `for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.`,
          },
          {
            selector: `ForOfStatement`,
            message: `iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.`,
          },
          {
            selector: `ForStatement`,
            message: `Don’t use iterators. Prefer JavaScript’s higher-order functions instead of loops. This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects.`,
          },
          {
            selector: `LabeledStatement`,
            message: `Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.`,
          },
          {
            selector: `WithStatement`,
            message: `'with' is disallowed in strict mode because it makes code impossible to predict and optimize.`,
          },
        ],

        // It is considered good practice to only throw the Error object itself
        // or an object using the Error object as base objects for user-defined
        // exceptions. The fundamental benefit of Error objects is that they
        // automatically keep track of where they were built and originated.
        'no-throw-literal': `error`,

        // For readability, avoid unneeded ternary statements.
        'no-unneeded-ternary': `error`,

        // This is a stylistic preference, and enforcing it will help keep the
        // code base more consistent.
        'no-useless-return': `error`,

        // Generally, TODO comments are not useful in keeping track of work that
        // we actually want to do, but they can sometimes be helpful to keep
        // track of work that cannot be done immediately (like if we're blocked
        // on a 3rd party tool that needs to fix a patch and we have a work
        // around). It can be distracting to actually warn on issues that can't
        // be addressed, so we permit TODO comments in the codebase. But
        // sometimes it's really helpful to add todo's while working on a
        // feature that you want to actually get to before you release it. This
        // rule reserves the "todo" term to flag something that you want to come
        // back to before you release. Culturally we will enforce in code review
        // that "TODO" doesn't enter the codebase unless actually helpful to
        // flag future work that is currently blocked.
        'no-warning-comments': [`error`, { terms: [`todo`] }],

        // This is very much a personal preference. It's nice when code has room
        // to breathe. Compact code can be sometimes be harder to read.
        'object-curly-spacing': [`error`, `always`],

        // Enforcing object shorthand helps ensure consistency that makes the
        // code base easier to read.
        'object-shorthand': [`error`, `always`],

        // Enforce consistent variable declaration style - a consistent code
        // base is a more readable code base.
        'one-var': [`error`, `never`],

        // This ensures that you can’t reassign your references, which can lead
        // to bugs and difficult to comprehend code.
        'prefer-const': `error`,

        // Enforce consistency when shallow copying objects.
        'prefer-object-spread': `error`,

        // `...` is explicit about which arguments you want pulled. Plus,
        // rest arguments are a real Array, and not merely Array-like like
        // `arguments`.
        'prefer-rest-params': `error`,

        // When programmatically building up strings, use template strings
        // instead of concatenation. Template strings give you a readable,
        // concise syntax with proper newlines and string interpolation
        // features.
        'prefer-template': `error`,

        // This rule helps us write better React hooks.
        'react-hooks/exhaustive-deps': `error`,

        // This rule helps us write better React hooks.
        'react-hooks/rules-of-hooks': `error`,

        // Helps enforce consistency in the code base.
        'react/hook-use-state': `error`,

        // Enforce using explicit boolean attribute values in JSX
        'react/jsx-boolean-value': `error`,

        // This rule is intended to increase the ability to scan the JSX markup.
        // It was chosen over the other options to avoid the floating ">"
        // characters that disrupt the visual nesting of the components.
        // Aligning the closing bracket after the props creates a very clear
        // left edge to the markup, making it easier to grok the nesting at a
        // glance. The downside is that the content of non-empty elements gets
        // muddled with the opening tag.
        'react/jsx-closing-bracket-location': [
          `error`,
          { selfClosing: `tag-aligned`, nonEmpty: `after-props` },
        ],

        // Enforce consistency around using curly braces in JSX.
        'react/jsx-curly-brace-presence': [
          `error`,
          { props: `never`, children: `never`, propElementValues: `always` },
        ],

        // There is no functional difference between using .js and .jsx, so
        // instead of having a mix of the two extensions it is easier to always
        // use .js.
        'react/jsx-filename-extension': [`error`, { extensions: [`.tsx`] }],

        // So this one is a little hard to justify, but we're doing it anyways.
        // While we strongly believe in using blank lines to separate logical
        // blocks of code, JSX is different because it directly translates into
        // something visual. As a developer, you mentally translate the code
        // into a visual representation of the code. Blank lines do two things
        // to hinder that mental translation:
        //
        // 1. They add something visual to the code that is ignored in the final
        //    display, adding some cognitive overhead when reading the code and
        //    visualizing the output in your head.
        // 2. They encourage more complexity in the JSX. It is already hard to
        //    look at JSX and see the visual output in your head. If you have
        //    large blocks with things like complex conditionals, long callback
        //    functions and inline styles, then it can be difficult to skim the
        //    JSX and understand what is going on visually.
        //
        // Per the second point, instead of adding blank lines between large
        // JSX blocks, it is recommended to find ways to make the JSX block
        // smaller. For example, complex conditionals can be abstracted into
        // variables, callback props can be lifted out of the JSX or put in
        // their own file, and inline styles can be moved to a CSS file.
        //
        // One of the best strategies of all is to simply push a bunch of JSX
        // (and the corresponding styles) into its own component. For example,
        // imagine a component that renders a form. The JSX section of the
        // component could get quite long, but you can avoid this by creating
        // small components so that the top level component's JSX is much
        // easier to read. Here's what that might look like:
        //
        // ```tsx
        // <MyForm onSubmit={handleSubmit}>
        //   <MyFormHeader />
        //   <MyFormContent>
        //     <NameField onChange={setName} value={name} />
        //     <EmailField onChange={setEmail} value={email} />
        //     <LocationAutocomplete onChange={setLocation} value={location} />
        //   </MyFormContent>
        //   <MyFormActions onCancel={handleCancel} />
        // </MyForm>
        // ```
        //
        // By making new components, it is much easier to read the JSX for the
        // form and understand the structure and behavior of the UI without
        // getting bogged down by a bunch of details that you might not care
        // about at this level. All of the text field overrides and custom
        // field styles are contained within the sub-components, so you can
        // focus on just what the parent component is doing.
        //
        // With this strategy, extra blank lines between JSX elements is no
        // longer necessary.
        //
        // The final point to make is that we can always relax this rule in the
        // future, but if we start without this rule enabled and decide that
        // we want it later then it is much more work because we would have to
        // fix a bunch of places where we did not follow the rule.
        'react/jsx-newline': [`error`, { prevent: true }],

        // Having a consistent order for props (especially when a component has
        // a lot of props) makes it a lot easier to scan the code to find the
        // prop you're looking for.
        'react/jsx-sort-props': [
          `error`,
          {
            ignoreCase: true,
            reservedFirst: true,
          },
        ],

        // This rule is configured to increase code readability.
        'react/jsx-wrap-multilines': [
          `error`,
          {
            declaration: `parens-new-line`,
            assignment: `parens-new-line`,
            return: `parens-new-line`,
            arrow: `parens-new-line`,
            condition: `parens-new-line`,
            logical: `ignore`,
            prop: `ignore`,
          },
        ],

        // The key is used by React to identify which items have changed, are
        // added, or are removed and should be stable.
        //
        // It's a bad idea to use the array index since it doesn't uniquely
        // identify your elements. In cases where the array is sorted or an
        // element is added to the beginning of the array, the index will be
        // changed even though the element representing that index may be the
        // same. This results in unnecessary renders.
        'react/no-array-index-key': `error`,

        // Dangerous properties in React are those whose behavior is known to
        // be a common source of application vulnerabilities. The properties
        // names clearly indicate they are dangerous and should be avoided
        // unless great care is taken.
        'react/no-danger': `error`,

        // Stateless functional components are simpler than class based
        // components and will benefit from future React performance
        // optimizations specific to these components.
        'react/prefer-stateless-function': `error`,

        // TypeScript will already throw an error if a prop does not have a
        // type, so we don't need this rule.
        'react/prop-types': `off`,

        // Helps ensure stylistic consistency for better code readability.
        'react/self-closing-comp': `error`,

        // Whitespace after the // or /* makes it easier to read text in
        // comments.
        'spaced-comment': [`error`, `always`],
      },
    },
  ],
};
