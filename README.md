Reproduction for https://github.com/getsentry/sentry-javascript/issues/14561

lambda randomly fails to execute with the invoke error:

```json
{
    "errorType": "TypeError",
    "errorMessage": "PrivateCpuProfilerBindings.startProfiling is not a function",
    "stack": [
        "TypeError: PrivateCpuProfilerBindings.startProfiling is not a function",
        "    at Bindings.startProfiling (/var/task/index.js:40174:39)",
        "    at maybeProfileSpan (/var/task/index.js:40499:23)",
        "    at /var/task/index.js:40543:24",
        "    at /var/task/index.js:33851:39",
        "    at Array.forEach (<anonymous>)",
        "    at NodeClient.emit (/var/task/index.js:33851:17)",
        "    at /var/task/index.js:36947:37",
        "    at /var/task/index.js:36973:78",
        "    at _optionalChain$1 (/var/task/index.js:36947:15)",
        "    at onSpanStart (/var/task/index.js:36973:3)"
    ]
}
```
