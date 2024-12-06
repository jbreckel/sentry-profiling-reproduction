import { App, Stack, StackProps, Tags } from 'aws-cdk-lib';

import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

const app = new App();

const SENTRY_DSN = '__YOUR_DSN__';

class ExampleStack extends Stack {

    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        new NodejsFunction(this, 'ExampleLambda', {
            functionName: `${id}-example-lambda`,
            entry: 'src/aws/lambda/example-handler.ts',
            runtime: Runtime.NODEJS_20_X,
            logRetention: RetentionDays.ONE_DAY,
            architecture: Architecture.ARM_64,
            bundling: {
                loader: {
                    '.node': 'file',
                },
                commandHooks: {
                    beforeBundling: () => [],
                    beforeInstall: () => [],
                    afterBundling: (_, outputDir) => [
                        `sentry-prune-profiler-binaries --target_platform=linux --target_arch=arm64 --target_node=20 --target_stdlib=glibc --target_dir_path=${outputDir}`,
                    ],
                },
            },
            environment: {
                SENTRY_ENV: 'dev',
                SENTRY_DSN: SENTRY_DSN,
            },
        });
    }
}

const stack = new ExampleStack(app, 'sentry-profiling-repro');

Tags.of(stack).add('SERVICE', 'error-reproduction');

app.synth();
