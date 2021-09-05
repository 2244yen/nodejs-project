# Generate secret key
secret key = node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

# https://github.com/OptimalBits/bull/blob/develop/PATTERNS.md#message-queue
# https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/bull/index.d.ts

# Command
# https://www.npmjs.com/package/run-rs
run-rs --keep
npm run watch

Fix version
Setup pre-commit
Setup editor config
