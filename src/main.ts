import { DEFAULT_SETTINGS, JupyterSettings } from "src/Settings";
import { addIcon } from "obsidian";

// import { MathResult } from './Extensions/ResultMarkdownChild';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JupyterView, JUPYTER_VIEW } from "../Views/JupyterView";
import {
    App,
    finishRenderMath,
    loadMathJax,
    Modal,
    Plugin,
    WorkspaceLeaf,
} from "obsidian";
import { JupyterSettingsTab } from "src/SettingTab";


const sigma = `<path stroke="currentColor" fill="none" d="M78.6067 22.8905L78.6067 7.71171L17.8914 7.71171L48.2491 48.1886L17.8914 88.6654L78.6067 88.6654L78.6067 73.4866" opacity="1"  stroke-linecap="round" stroke-linejoin="round" stroke-width="6" />
`;

// Remember to rename these classes and interfaces!

let gSettings: JupyterSettings;

export function getJupyterSettings() { return gSettings; }
export default class JupyterPlugin extends Plugin {
    settings: JupyterSettings;
 
    async onload() {
        await this.loadSettings();

        this.registerView(JUPYTER_VIEW, (leaf) => new JupyterView(leaf));

        addIcon("sigma",sigma); 


    
         
          this.registerExtensions(["ipynb"], JUPYTER_VIEW);

       

        

        this.addSettingTab(new JupyterSettingsTab(this.app, this));
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(JUPYTER_VIEW);
    }

    async loadSettings() {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData()
        );
        gSettings = this.settings;
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }



}
