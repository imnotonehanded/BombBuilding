interface Workspace extends Instance {
	canvas: Folder;
	slots: Folder;
	button: Part & {
		ClickDetector: ClickDetector;
	};
}
interface ReplicatedStorage extends Instance {
	canvas: Model;
}
