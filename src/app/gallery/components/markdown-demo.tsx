"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownDisplay } from "@/components/markdown";

const exampleMarkdown = `
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- List item 1
- List item 2
  - Nested item
  - Another nested item

1. Ordered item 1
2. Ordered item 2

\`\`\`typescript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

\`\`\`typescript
console.log("Hello, World!");
\`\`\`


\`\`\`go
// main.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

In Go, you can use the \`fmt\` package to print to the terminal.


[Link to Google](https://google.com)

> This is a blockquote

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;

export function MarkdownDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Markdown</h2>
        <p className="text-sm text-muted-foreground">
          A markdown display component with syntax highlighting and styling.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Markdown Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownDisplay content={exampleMarkdown} />
        </CardContent>
      </Card>
    </div>
  );
}
