import { Workspace } from "@rbxts/services";
import { Service } from "@flamework/core";

function map_value(v: number, a: number, b: number, c: number, d: number): number {
	return c + ((v - a) * (d - c)) / (b - a);
}

export function CalcCanvasSize(player: Player): Vector2 {
	const back: Vector3 = new Vector3(0, -1, 0);
	const top: Vector3 = new Vector3(0, 0, -1);
	const right: Vector3 = new Vector3(-1, 0, 0);

	const cf = Workspace.canvas.FindFirstChild(`${player.Name}_canvas`);
	if (cf && cf.IsA("Model") && cf.PrimaryPart) {
		const cff: CFrame = cf.PrimaryPart.CFrame.mul(
			CFrame.fromMatrix(back.mul(cf.PrimaryPart.Size.div(2)).mul(-1), right, top, back),
		);
		const size: Vector2 = new Vector2(
			cf.PrimaryPart.Size.mul(right).Magnitude,
			cf.PrimaryPart.Size.mul(top).Magnitude,
		);

		return size;
	} else {
		return new Vector2(0, 0);
	}
}
export function CalcCanvasCFrame(player: Player): CFrame {
	const back: Vector3 = new Vector3(0, -1, 0);
	const top: Vector3 = new Vector3(0, 0, -1);
	const right: Vector3 = new Vector3(-1, 0, 0);

	const cf = Workspace.canvas.FindFirstChild(`${player.Name}_canvas`);
	if (cf && cf.IsA("Model") && cf.PrimaryPart) {
		const cff: CFrame = cf.PrimaryPart.CFrame.mul(
			CFrame.fromMatrix(back.mul(cf.PrimaryPart.Size.div(2)).mul(-1), right, top, back),
		);
		const size: Vector2 = new Vector2(
			cf.PrimaryPart.Size.mul(right).Magnitude,
			cf.PrimaryPart.Size.mul(top).Magnitude,
		);

		return cff;
	} else {
		return new CFrame(0, 0, 0);
	}
}
export function CalcPlacementCFrame(player: Player, partSize: Vector3, pos: Vector3, rot: number): CFrame {
	const cf = CalcCanvasCFrame(player);
	const size = CalcCanvasSize(player);
	let modelSize = CFrame.fromEulerAnglesYXZ(0, rot, 0).mul(partSize);
	modelSize = new Vector3(math.abs(modelSize.X), math.abs(modelSize.Y), math.abs(modelSize.Z));
	const lpos = cf.PointToObjectSpace(pos);
	const size2 = size.sub(new Vector2(modelSize.X, modelSize.Z)).div(2);

	let x = math.clamp(lpos.X, -size2.X, size2.X);
	let y = math.clamp(lpos.Y, -size2.Y, size2.Y);
	x = math.sign(x) * (math.abs(x) - (math.abs(x) % 4) + (size2.X % 4));
	y = math.sign(y) * (math.abs(y) - (math.abs(y) % 4) + (size2.Y % 4));

	return cf.mul(new CFrame(x, y, -modelSize.Y / 2).mul(CFrame.Angles(-math.pi / 2, rot, 0)));
}

export function CalcMatrixCord(player: Player, partSize: Vector3, pos: Vector3, rot: number): Vector2 {
	const cf = CalcCanvasCFrame(player);
	const size = CalcCanvasSize(player);
	let modelSize = CFrame.fromEulerAnglesYXZ(0, rot, 0).mul(partSize);
	modelSize = new Vector3(math.abs(modelSize.X), math.abs(modelSize.Y), math.abs(modelSize.Z));
	const lpos = cf.PointToObjectSpace(pos);
	const size2 = size.sub(new Vector2(modelSize.X, modelSize.Z)).div(2);

	let x = math.clamp(lpos.X, -size2.X, size2.X);
	let y = math.clamp(lpos.Y, -size2.Y, size2.Y);
	x = math.sign(x) * (math.abs(x) - (math.abs(x) % 4) + (size2.X % 4));
	y = math.sign(y) * (math.abs(y) - (math.abs(y) % 4) + (size2.Y % 4));

	return new Vector2(map_value(x, -18, 18, 1, 10), map_value(y, -18, 18, 1, 10));
}
