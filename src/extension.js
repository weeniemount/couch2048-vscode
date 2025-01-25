// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Register the command
	const disposable = vscode.commands.registerCommand('couch2048Tab.open', () => {
		// Create a new Webview Panel
		const panel = vscode.window.createWebviewPanel(
			'couch2048Tab', // Identifier for the Webview
			'Couch 2048', // Title of the tab
			vscode.ViewColumn.One, // Where to display the tab
			{
				enableScripts: true // Allow JavaScript execution in the Webview
			}
		);

		// Set HTML content for the Webview
		panel.webview.html = getWebviewContent(context, panel);
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(context, panel) {
	// Resolve the path to the external HTML file
	const htmlFilePath = path.join(context.extensionPath, 'src', 'game', 'index.html');
	let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

	// Update paths for Webview (e.g., scripts, styles) using the Webview API
	htmlContent = htmlContent.replace(
		/<script src="(.+?)"><\/script>/g,
		(match, src) =>
			`<script src="${panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'src', 'game', src))
			)}"></script>`
	);

	return htmlContent;
}

function deactivate() {}
module.exports = {
    activate
};