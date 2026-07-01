const fs = require('fs');
const babel = require('@babel/core');

const code = fs.readFileSync('../public/interstellar-game/script.js', 'utf8');

let loopId = 0;
const plugin = function({ types: t }) {
  return {
    visitor: {
      Function(path) {
        if (!t.isBlockStatement(path.node.body)) return;
        
        let name = "anonymous";
        if (path.node.id) name = path.node.id.name;
        
        const line = path.node.loc ? path.node.loc.start.line : "unknown";
        path.get('body').unshiftContainer('body', t.expressionStatement(
          t.callExpression(t.memberExpression(t.identifier('console'), t.identifier('log')), [t.stringLiteral("EXEC FUNC: " + name + " @ line " + line)])
        ));
      },
      "WhileStatement|ForStatement|DoWhileStatement"(path) {
        loopId++;
        const idName = "__lc_" + loopId;
        const line = path.node.loc ? path.node.loc.start.line : "unknown";
        
        path.insertBefore(
          t.variableDeclaration("let", [
            t.variableDeclarator(t.identifier(idName), t.numericLiteral(0))
          ])
        );

        if (!t.isBlockStatement(path.node.body)) {
          path.node.body = t.blockStatement([path.node.body]);
        }

        path.get('body').unshiftContainer('body', 
          t.ifStatement(
            t.binaryExpression(">", 
              t.updateExpression("++", t.identifier(idName)),
              t.numericLiteral(5000)
            ),
            t.blockStatement([
              t.expressionStatement(
                t.callExpression(t.memberExpression(t.identifier('console'), t.identifier('log')), [
                  t.stringLiteral("INFINITE LOOP CAUGHT @ line " + line)
                ])
              ),
              t.throwStatement(t.newExpression(t.identifier("Error"), [t.stringLiteral("Infinite loop")]))
            ])
          )
        );
      }
    }
  };
};

try {
  const output = babel.transformSync(code, {
    plugins: [plugin],
    sourceType: "module"
  });

  fs.writeFileSync('../public/interstellar-game/script-instrumented.js', output.code);

  let html = fs.readFileSync('../public/interstellar-game/index.html', 'utf8');
  html = html.replace(/<script type="module" src="script\.js\?.*"><\/script>/, '<script type="module" src="script-instrumented.js"></script>');
  fs.writeFileSync('../public/interstellar-game/index-instrumented.html', html);
  console.log("Instrumentation complete");
} catch (e) {
  console.error(e);
}
