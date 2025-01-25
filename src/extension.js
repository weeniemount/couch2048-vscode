// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
	// Register the command
	const disposable = vscode.commands.registerCommand('sampleTab.open', () => {
		// Create a new Webview Panel
		const panel = vscode.window.createWebviewPanel(
			'sampleTab', // Identifier for the Webview
			'Sample Tab', // Title of the tab
			vscode.ViewColumn.One, // Where to display the tab
			{
				enableScripts: true // Allow JavaScript execution in the Webview
			}
		);

		// Set HTML content for the Webview
		panel.webview.html = getWebviewContent();
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Sample Tab</title>
		</head>
		<body>
			<h1>Welcome to the Sample Tab!</h1>
			<p>This is a custom tab created in VS Code.</p>
			<button onclick="hello()">Click Me!</button>
			<script>
				function hello() {
					alert('Hello from your tab!');
				}
			</script>
		</body>
		</html>
	`;
}

export function deactivate() {}