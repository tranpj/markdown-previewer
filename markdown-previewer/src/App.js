import './App.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import React from 'react';

// Set marked options
marked.use({
  breaks: true
});

// Default test to initially populate editor with
const defaultText =
  `# Headings
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

# Text
Paragraph
Paragraph Paragraph
Paragraph Paragraph Paragraph
Paragraph Paragraph Paragraph Paragraph
Paragraph Paragraph Paragraph Paragraph Paragraph
Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph
Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph Paragraph

# Emphasis Text
**Bold** text **Bold** text **Bold** text **Bold** text **Bold** text
*Italic* text *Italic* text *Italic* text *Italic* text *Italic* text
***Bold and Italic*** text ***Bold and Italic*** text ***Bold and Italic*** text ***Bold and Italic*** text ***Bold and Italic*** text ***Bold and Italic*** text

# Ordered List
1. Item 1
2. Item 2
3. Item 3
4. Item 4
5. Item 5
6. Item 6
    1. Indented item 1
    2. Indented item 2
7. Item 7

# Unordered List
- Item 1
- Item 2
- Item 3
- Item 4
- Item 5
- Item 6
    - Indented item 1
    - Indented item 2
- Item 7

# Blockquote
> Block Quotes

# Inline Code
\`\`\`<div></div>\`\`\`

# Code Block
\`\`\`
function func(arg1, arg2) {
  ...
}
\`\`\`

# Table
Header 1 | Header 2 | Header 3
------------ | ------------- | -------------
Content 1 | Content 2 | Content 3
Content 4 | Content 5 | Content 6

# Link
[https://www.freecodecamp.org](https://www.freecodecamp.org)

# Image
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorInput: defaultText,
      //parse the markup provided by input. Input is sanitize then replace &gt; with actual < sign.
      markedOutput: marked.parse(DOMPurify.sanitize(defaultText).replace(/&gt;+/g, '>'))
    }
  }

  // function updates state values
  editorInputToMarkedOutput = (input) => {
    this.setState({
      editorInput: input,
      //parse the markup provided by input. Input is sanitize then replace &gt; with actual < sign.
      markedOutput: marked.parse(DOMPurify.sanitize(input).replace(/&gt;+/g, '>'))
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <div>
            <h1>Markdown Previewer</h1>
          </div>
        </header>
        <div className="row">
          <div className="col-lg">
            <label className="col-label">Editor</label>
            <textarea id="editor" value={this.state.editorInput} onChange={(e) => this.editorInputToMarkedOutput(e.target.value)} />
          </div>
          <div className="col-lg">
            <label className="col-label">Preview</label>
            <div id="preview" dangerouslySetInnerHTML={{ __html: marked(this.state.markedOutput) }} />
          </div>
        </div>
      </div>
    );
  };
}

export default App;
