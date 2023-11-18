import JupyterPlugin from "src/main";
import { App, PluginSettingTab, Setting } from "obsidian";


export class JupyterSettingsTab extends PluginSettingTab {
	plugin: JupyterPlugin;

	constructor(app: App, plugin: JupyterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Jupyter Settings'});

        this.createToggle(containerEl, "Add Ribbon Icon",
            "Adds an icon to the ribbon to launch scan",
            "addRibbonIcon"
        );

        this.createToggle(containerEl, "Show Jupyter Sidebar",
        "Opens Jupyter sidebar at startup",
        "showAtStartUp"
    	);

       
	}

    private createToggle(containerEl: HTMLElement, name: string, desc: string, prop: string) {
		new Setting(containerEl)
			.setName(name)
			.setDesc(desc)
			.addToggle(bool => bool
				.setValue((this.plugin.settings as any)[prop] as boolean)
				.onChange(async (value) => {
					(this.plugin.settings as any)[prop] = value;
					await this.plugin.saveSettings();
					this.display();
				})
			);
	}
}
