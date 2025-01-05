"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock, CodeBlockContent } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";

const examples = {
  typescript: `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return {
    id,
    name: "John Doe",
    email: "john@example.com",
  };
}`,
  python: `def fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Calculate first 5 Fibonacci numbers
for i in range(5):
    print(f"F({i}) = {fibonacci(i)}")`,
  go: `package main

import "fmt"

func main() {
    // Declare an array of strings
    fruits := []string{"apple", "banana", "orange"}
    
    // Iterate over the array
    for i, fruit := range fruits {
        fmt.Printf("%d: %s\\n", i, fruit)
    }
}`,
};

export default function CodeBlockPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Code Block
        </h1>
        <p className="text-lg text-muted-foreground">
          A code block component with syntax highlighting and line numbers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">TypeScript</h3>
            <CodeBlock>
              <CodeBlockContent
                content={examples.typescript}
                language="typescript"
                showLineNumbers
              />
            </CodeBlock>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Python</h3>
            <CodeBlock>
              <CodeBlockContent
                content={examples.python}
                language="python"
                showLineNumbers
              />
            </CodeBlock>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Go</h3>
            <CodeBlock>
              <div className="relative">
                <CodeBlockContent
                  content={examples.go}
                  language="go"
                  showLineNumbers
                />

                <CopyButton
                  className="absolute right-0 top-0"
                  value={examples.go}
                />
              </div>
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The code block component is composed of two parts: a wrapper
            <code className="rounded bg-muted px-1">CodeBlock</code> and an
            inner
            <code className="rounded bg-muted px-1">CodeBlockContent</code>.
          </p>

          <CodeBlock>
            <CodeBlockContent
              content={`<CodeBlock>
  <CodeBlockContent
    content="console.log('Hello, World!');"
    language="typescript"
    showLineNumbers
  />
</CodeBlock>`}
              language="tsx"
              showLineNumbers
            />
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}
